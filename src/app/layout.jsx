import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";// Adjust the path as necessary

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth relative" suppressHydrationWarning>
      <body className={`${inter.className} relative h-fit`} suppressHydrationWarning={true}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
