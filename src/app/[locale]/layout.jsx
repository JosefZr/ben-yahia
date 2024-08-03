import { Nunito_Sans } from '@next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders'; // Adjust the path as necessary
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

// Font loader in module scope
const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} className="scroll-smooth relative" suppressHydrationWarning>
      <head>
        <title>Light Stomatology</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Bienvenue sur le site de Light Stomatology. Nous offrons des soins dentaires complets et de qualité pour toute la famille. Découvrez nos services, prenez rendez-vous en ligne, et restez informé des dernières actualités dentaires." />
      </head>
      <body className={`${nunitoSans.className} relative h-fit`} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
