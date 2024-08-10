import './globals.css';
import ClientProviders from './ClientProviders'; // Adjust the path as necessary
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { nunitoSans } from '@/utils/font';

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale} className="scroll-smooth relative" suppressHydrationWarning>
      <head>
        <title>Light Stomatology</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Bienvenue sur le site de Light Stomatology. Nous offrons des soins dentaires complets et de qualité pour toute la famille. Découvrez nos services, prenez rendez-vous en ligne, et restez informé des dernières actualités dentaires." />
        
        {/* Preload important resources */}
        <link rel="preload" href="/logo/White Black Simple Illustration Dental Clinic Logo.webp" as="image" />

        <link 
          rel="preload" 
          href="/logo/White Black Simple Illustration Dental Clinic Logo.webp" 
          as="image" 
        />
        <link rel="preload" href="/path-to-font/NunitoSans.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>

        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        {/* Load fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap" 
          rel="stylesheet" 
        />

        {/* Load critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root ,
#root,
#docs-root {
  --blue: #1e90ff;
  --white: #ffffff;
  --light-green:#19592A;
  --bold-green:#214030;
  --light-purple:#703D84;
  --bold-purple:#522276;
  --word-purple:#8800CA;
  --success:#17c964

}
/* bitton */
.button {
  --width: 120px;
  --height: 35px;
  --tooltip-height: 35px;
  --tooltip-width: 90px;
  --gap-between-tooltip-to-button: 18px;
  --button-color: #222;
  --tooltip-color: #fff;
  width: var(--width);
  height: var(--height);
  background: var(--button-color);
  position: relative;
  text-align: center;
  border-radius: 1.4em;
  font-family: "Arial";
  transition: background 0.3s;
  cursor: pointer;

}

.button::before {
  position: absolute;
  content: attr(data-tooltip);
  width: var(--tooltip-width);
  height: var(--tooltip-height);
  background-color: #555;
  font-size: 0.9rem;
  color: #fff;
  border-radius: .25em;
  line-height: var(--tooltip-height);
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
  left: calc(50% - var(--tooltip-width) / 2);
}

.button::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #555;
  left: calc(50% - 10px);
  bottom: calc(100% + var(--gap-between-tooltip-to-button) - 10px);
}

.button::after,.button::before {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-wrapper,.text,.icon {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  color: #fff;
}

.text {
  top: 0
}

.text,.icon {
  transition: top 0.5s;
}

.icon {
  color: #fff;
  top: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon svg {
  width: 24px;
  height: 24px;
}

.button:hover {
  background: #222;
}

.button:hover .text {
  top: -100%;
}

.button:hover .icon {
  top: 0;
}

.button:hover:before,.button:hover:after {
  opacity: 1;
  visibility: visible;
}

.button:hover:after {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
}

.button:hover:before {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
}

            `,
          }}
        />
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
