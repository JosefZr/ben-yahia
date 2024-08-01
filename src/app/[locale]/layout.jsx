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
