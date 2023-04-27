import type { Link } from '@unhead/schema';

/**
 * Call this in app.vue to register fonts, including the resource hints.
 */
export function useWebFonts(links: string | Array<string>) {
  const allLinks = (typeof links === 'string') ? [links] : links;

  const resourceHints: Array<Link<{} | undefined>> = [];
  const stylesheets: Array<Link<{} | undefined>> = [];

  const typekitLinks = allLinks.filter(link => link.includes('typekit'));
  const googleLinks = allLinks.filter(link => link.includes('google'));

  if (typekitLinks.length > 0) {
    resourceHints.push({ rel: 'preconnect', href: 'https://use.typekit.net', crossorigin: 'anonymous' });
    resourceHints.push({ rel: 'preconnect', href: 'https://p.typekit.net', crossorigin: 'anonymous' });

    typekitLinks.forEach((link) => {
      resourceHints.push({ rel: 'preload', href: link, as: 'style' });
      stylesheets.push({ rel: 'stylesheet', href: link });
    });
  }

  if (googleLinks.length > 0) {
    resourceHints.push({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    resourceHints.push({ rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' });

    googleLinks.forEach((link) => {
      resourceHints.push({ rel: 'preload', href: link, as: 'style' });
      stylesheets.push({ rel: 'stylesheet', href: link });
    });
  }

  return {
    resourceHints,
    stylesheets,
  };
}
