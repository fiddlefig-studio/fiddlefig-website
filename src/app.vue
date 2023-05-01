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

useSeoMeta({
  title: 'Fiddlefig Studio | Web Design + Development Studio | Refuse to Blend In',
  ogTitle: 'Fiddlefig Studio | Web Design + Development Studio | Refuse to Blend In',
  description: 'We specialise in beautiful and original websites for brands who want to stand out. See what 16 years of experience can do for you.',
  ogDescription: 'We specialise in beautiful and original websites for brands who want to stand out. See what 16 years of experience can do for you.',
});
</script>
