// middlewares/intlMiddleware.js
import createMiddleware from 'next-intl/middleware';

export const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
});
