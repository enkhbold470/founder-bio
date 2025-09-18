import type { Metadata } from "next";
import { Noto_Serif_Georgian } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { siteConfig } from '@/config/siteConfig';
import "./globals.css";

const notoSerifGeorgian = Noto_Serif_Georgian({
  weight:  ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.bio}`,
  description: `Portfolio of ${siteConfig.name}, a founder building innovative solutions`,
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
      <body className={` ${notoSerifGeorgian.className}`}>
        {children}
        <Analytics />
        {/* Add Google Analytics or other analytics here later */}
      </body>
    </html>
  );
}
