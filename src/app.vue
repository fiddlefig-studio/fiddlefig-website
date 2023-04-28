<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { resourceHints, stylesheets } = useWebFonts([
  'https://use.typekit.net/grx7jcv.css',
  'https://fonts.googleapis.com/css2?family=Domine:wght@400;700&display=swap',
]);

useHead({
  title: 'Fiddlefig Studio | Web Design + Development Studio | Refuse to Blend In',
  link: [
    ...resourceHints,
    ...stylesheets,
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
  htmlAttrs: { lang: 'en' },
});
</script>
