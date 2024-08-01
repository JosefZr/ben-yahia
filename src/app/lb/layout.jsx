import { Nunito_Sans } from "@next/font/google";

import "../[locale]/globals.css";
import ClientProviders from "./ClientLbProviders";

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });


export default async function RootLayout({ children }) {
  return (
    <html lang='en' className="scroll-smooth relative" suppressHydrationWarning>
      <body className={`${nunitoSans.className} relative h-fit`} suppressHydrationWarning={true}>

        <ClientProviders>
        {children}

        </ClientProviders>
      </body>
    </html>
  );
}
