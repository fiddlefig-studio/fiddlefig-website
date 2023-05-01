import { components } from './config/nuxt/components';
import { postcss } from './config/nuxt/postcss';
import { runtimeConfig } from './config/nuxt/runtimeConfig';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  runtimeConfig,

  // See: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vercel.client.ts',
      mode: 'client',
    },
    '~/plugins/logger/index.ts',
  ],

  components,
  imports: {
    dirs: ['app/composables/*.{ts,js}'],
  },

  postcss,
});
