import type { Metadata } from "next";
import { Noto_Serif} from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from '@/config/siteConfig';
import "./globals.css";

const selectedFont = Noto_Serif({
  weight:  [ '100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: `Portfolio of ${siteConfig.name}`,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${selectedFont.className}`}>
        {children}
        <Analytics />
        {/* Add Google Analytics or other analytics here later */}
                {/* Add Google Analytics or other analytics here later */}

      </body>
    </html>
  );
}
