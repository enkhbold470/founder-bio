import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { siteConfig } from "@/config/siteConfig";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const selectedFont = Noto_Serif({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@1nkfy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        <link rel="canonical" href={siteConfig.url} />
       {/* <script async src="htmx.js"></script>
 <script async src="https://unpkg.com/amazon@1.0.0"></script>
<script async src="https://unpkg.com/bootstrap@5.3.0"></script>
<script async src="https://unpkg.com/drupal@1.0.0"></script>
<script async src="https://unpkg.com/framer@1.0.0"></script>
<script async src="https://unpkg.com/googlecloud@1.0.0"></script>
<script async src="https://unpkg.com/gsap@3.12.5"></script>
<script async src="https://unpkg.com/htmx.org@2.0.4"></script>
<script async src="https://unpkg.com/jquery@3.7.1"></script>
<script async src="https://unpkg.com/paypal@1.0.0"></script>
<script async src="https://unpkg.com/shopify@1.0.0"></script>
<script async src="https://unpkg.com/stripe@1.0.0"></script>
<script async src="https://unpkg.com/svelte@4.2.7"></script>
<script async src="https://unpkg.com/vue-router@4"></script>
<script async src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script async src="https://unpkg.com/wix@1.0.0"></script>
<script async src="https://unpkg.com/woocommerce@1.0.0"></script>
<script async src="https://unpkg.com/wordpress-js@1.0.0"></script> */}

      </head>
      <body className={`${selectedFont.className} antialiased`}>
        <StructuredData type="ProfilePage" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
