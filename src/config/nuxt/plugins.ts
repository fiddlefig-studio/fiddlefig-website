// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

export const plugins = [
  {
    src: '~/plugins/vercel.client.ts',
    mode: 'client',
  },
  '~/plugins/logger/index.ts',
];
