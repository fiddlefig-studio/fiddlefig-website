import type { H3Event } from 'h3';
import { createError, defineEventHandler, readBody } from 'h3';
import { validateContactPayload } from '~/helpers/contact';

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const validation = validateContactPayload(body ?? {});
  const config = useRuntimeConfig();

  if (validation.values.website) {
    return { ok: true };
  }

  if (!validation.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: {
        message: 'Please check the highlighted fields and try again.',
        fieldErrors: validation.errors,
      },
    });
  }

  const resendApiKey = config.resendApiKey;
  const contactFromEmail = config.contactFromEmail;
  const contactToEmail = config.contactToEmail;

  if (!resendApiKey || !contactFromEmail || !contactToEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service not configured',
      data: {
        message: 'The contact form is not configured yet. Please try again later.',
      },
    });
  }

  const rateLimitMax = Number(config.contactRateLimitMax || 5);
  const rateLimitWindow = Number(config.contactRateLimitWindow || 900);
  const requesterIp = getRequesterIp(event);

  const recaptchaSecretKey = config.recaptchaSecretKey;
  if (recaptchaSecretKey) {
    const rawBody = (body ?? {}) as { recaptchaToken?: unknown };
    const recaptchaToken
      = typeof rawBody.recaptchaToken === 'string' ? rawBody.recaptchaToken.trim() : '';

    if (!recaptchaToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Verification required',
        data: {
          message: 'Please refresh the page and try again.',
        },
      });
    }

    const minScore
      = typeof config.recaptchaMinScore === 'number' && Number.isFinite(config.recaptchaMinScore)
        ? config.recaptchaMinScore
        : 0.5;

    const recaptchaPassed = await verifyRecaptcha({
      secret: recaptchaSecretKey,
      token: recaptchaToken,
      remoteIp: requesterIp,
      minScore,
      expectedAction: 'contact',
    });

    if (!recaptchaPassed) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Verification failed',
        data: {
          message: 'We could not verify this request. Please try again.',
        },
      });
    }
  }

  if (!withinRateLimit(requesterIp, rateLimitMax, rateLimitWindow)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many messages',
      data: {
        message: 'You have sent a few messages already. Please wait a little and try again.',
      },
    });
  }

  const to = splitEmails(contactToEmail);
  const bcc = splitEmails(config.contactBccEmail);

  const subject = formatSubject(validation.values.name, validation.values.projectType);
  const html = buildHtmlEmail(validation.values);
  const text = buildTextEmail(validation.values);

  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: {
        from: contactFromEmail,
        to,
        bcc: bcc.length ? bcc : undefined,
        reply_to: validation.values.email,
        subject,
        html,
        text,
      },
    });

    return { ok: true };
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to send email',
      data: {
        message: 'Your message could not be sent right now. Please try again in a moment.',
      },
    });
  }
});

function withinRateLimit(ip: string, maxRequests: number, windowInSeconds: number) {
  const now = Date.now();
  const existingEntry = rateLimitStore.get(ip);

  if (!existingEntry || existingEntry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + windowInSeconds * 1000,
    });
    pruneRateLimitStore(now);
    return true;
  }

  if (existingEntry.count >= maxRequests) {
    return false;
  }

  existingEntry.count += 1;
  rateLimitStore.set(ip, existingEntry);
  return true;
}

function pruneRateLimitStore(now: number) {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function splitEmails(value?: string) {
  if (!value) {
    return [];
  }

  return value.split(',').map(email => email.trim()).filter(Boolean);
}

function formatSubject(name: string, projectType: string) {
  if (projectType) {
    return `New contact form enquiry: ${name} (${projectType})`;
  }

  return `New contact form enquiry: ${name}`;
}

function buildHtmlEmail(values: ReturnType<typeof validateContactPayload>['values']) {
  const projectType = values.projectType || 'Not provided';
  const budget = values.budget || 'Not provided';
  const company = values.company || 'Not provided';

  return `
    <div style="font-family: Georgia, serif; color: #2B2B2B; line-height: 1.6;">
      <h1 style="font-family: 'Cooper Black', Georgia, serif; color: #4B418A;">New Fiddlefig enquiry</h1>
      <p>A new contact form enquiry has been submitted through the website.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr>
            <td style="padding: 10px 0; font-weight: 700; width: 180px;">Name</td>
            <td style="padding: 10px 0;">${escapeHtml(values.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 700;">Email</td>
            <td style="padding: 10px 0;">${escapeHtml(values.email)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 700;">Company or brand</td>
            <td style="padding: 10px 0;">${escapeHtml(company)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 700;">Project type</td>
            <td style="padding: 10px 0;">${escapeHtml(projectType)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 700;">Budget</td>
            <td style="padding: 10px 0;">${escapeHtml(budget)}</td>
          </tr>
        </tbody>
      </table>
      <h2 style="font-family: 'Cooper Black', Georgia, serif; color: #4B418A; margin-top: 32px;">Project details</h2>
      <p style="white-space: pre-wrap;">${escapeHtml(values.message)}</p>
    </div>
  `.trim();
}

function buildTextEmail(values: ReturnType<typeof validateContactPayload>['values']) {
  return [
    'New Fiddlefig enquiry',
    '',
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company or brand: ${values.company || 'Not provided'}`,
    `Project type: ${values.projectType || 'Not provided'}`,
    `Budget: ${values.budget || 'Not provided'}`,
    '',
    'Project details:',
    values.message,
  ].join('\n');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getRequesterIp(event: H3Event) {
  const forwardedFor = event.node.req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return event.node.req.socket.remoteAddress || 'unknown';
}

type RecaptchaVerifyResponse = {
  success: boolean
  challenge_ts?: string
  hostname?: string
  score?: number
  action?: string
  'error-codes'?: string[]
};

async function verifyRecaptcha(params: {
  secret: string
  token: string
  remoteIp: string
  minScore: number
  expectedAction: string
}): Promise<boolean> {
  const body = new URLSearchParams({
    secret: params.secret,
    response: params.token,
  });

  if (params.remoteIp !== 'unknown') {
    body.set('remoteip', params.remoteIp);
  }

  try {
    const result = await $fetch<RecaptchaVerifyResponse>('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!result.success || result.action !== params.expectedAction) {
      return false;
    }

    if (typeof result.score !== 'number' || result.score < params.minScore) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
