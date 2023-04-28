// See /docs/2. Features/Logging.md

import { defineNuxtPlugin } from '#app';

import { logger } from '~/app/utilities/logger';

export default defineNuxtPlugin(async (nuxtApp) => {
  logger.level = nuxtApp.$config.public.logLevel ?? (process.env.NODE_ENV === 'production' ? 1 : 3);

  nuxtApp.vueApp.config.errorHandler = (error, context) => {
    logger.error(error);
    logger.debug(context);
  };
});
