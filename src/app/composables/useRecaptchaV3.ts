function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('recaptcha unavailable'));
  }

  if (window.grecaptcha?.ready) {
    return Promise.resolve();
  }

  const existingSrc = document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]');
  if (existingSrc) {
    return new Promise((resolve, reject) => {
      existingSrc.addEventListener('load', () => resolve(), { once: true });
      existingSrc.addEventListener('error', () => reject(new Error('recaptcha load failed')), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('recaptcha load failed'));
    document.head.appendChild(script);
  });
}

/** reCAPTCHA v3 token for action `contact` (must match server-side checks). */
export function useRecaptchaV3() {
  const runtimeConfig = useRuntimeConfig();

  async function executeContactAction(): Promise<string | null> {
    const siteKeyRaw = runtimeConfig.public.recaptchaSiteKey;
    const siteKey = typeof siteKeyRaw === 'string' ? siteKeyRaw.trim() : '';

    if (!siteKey) {
      return null;
    }

    try {
      await loadRecaptchaScript(siteKey);
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) {
        return null;
      }

      return await new Promise((resolve) => {
        grecaptcha.ready(() => {
          void grecaptcha
            .execute(siteKey, { action: 'contact' })
            .then(token => resolve(token?.trim() || null))
            .catch(() => resolve(null));
        });
      });
    } catch {
      return null;
    }
  }

  return { executeContactAction };
}
