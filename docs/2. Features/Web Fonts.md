# Guide > Features > Web Fonts

Web Fonts can be quickly loaded from Google Fonts or Typekit using the
`useWebFonts` helper.

The best place to do this is within `app.vue`:

```vue
<script setup lang="ts">
import { useHead } from '#app';
import { useWebFonts } from '~/app/composables/useWebFonts';

const { resourceHints, stylesheets } = useWebFonts([
  // Add links to typekit or google fonts here, or remove this composable if you don't need them
  'https://use.typekit.net/grx7jcv.css',
  'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap',
]);

useHead({
  title: 'Hex | Product and Growth Studio',
  link: [
    ...resourceHints,
    ...stylesheets,
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
  htmlAttrs: { lang: 'en' },
});
</script>
```

## Resource Hints

Resource Hints are provided for faster pre-connection and pre-loading of the font files.

These are configured automatically by `useWebFonts`, and can be retrieved from the `resourceHints` array
returned from the composable. Put this with your other resource hints in the `link` array, so that they're together
and read sooner.

For more information on resource hints, please see: https://nitropack.io/blog/post/resource-hints-performance-optimization

## Stylesheets

The actual stylesheets for the fonts can be retrieved from the `stylesheets` array returned from the composable. Put this
with your other stylesheets in the `link` array, making sure they come after the resource hints.
