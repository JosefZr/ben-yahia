import { Nunito_Sans } from "@next/font/google";

import "../[locale]/globals.css";
import ClientProviders from "./ClientLbProviders";

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });


export default async function RootLayout({ children }) {
  return (
    <html lang='en' className="scroll-smooth relative" suppressHydrationWarning>
      <head>
        <title>ЛБ</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Bienvenue sur le site de Light Stomatology. Nous offrons des soins dentaires complets et de qualité pour toute la famille. Découvrez nos services, prenez rendez-vous en ligne, et restez informé des dernières actualités dentaires." />
      </head>
      <body className={`${nunitoSans.className} relative h-fit`} suppressHydrationWarning={true}>
      
        <ClientProviders>
        {children}

        </ClientProviders>
      </body>
    </html>
  );
}
