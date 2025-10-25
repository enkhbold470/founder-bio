import type { Metadata } from "next";
import { siteConfig, recentUpdates } from "@/config/siteConfig";
import { renderBioWithLinks } from "@/utils/renderBio";
import Link from "next/link";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    firstName: "Inky",
    lastName: "Ganbold",
    username: "1nkfy",
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@1nkfy",
    site: "@1nkfy",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 ">
      <main className="flex flex-col items-center justify-center max-w-[400px]">
        {/* Intro Section */}
        <header className="text-center mb-4 sm:mb-6">
          <h1 className="name">{siteConfig.name}</h1>
          <p className="text-left p-2 sm:p-3 text-spacing-4">
            {renderBioWithLinks(siteConfig.bio.text, siteConfig.bio.links)}
          </p>
        </header>

        {/* Contact Section */}
        <section className="text-center mb-4 sm:mb-6 w-full">
          <h2 className="title">Contact</h2>
           <div className="flex justify-between px-4">
            {siteConfig.contactDisplay.map((contactItem, index) => (
              <p
                key={`${contactItem.type}-${index}`}
                className="text-left p-2 sm:p-3"
              >
                <Link
                  href={contactItem.url}
                  aria-label={`${siteConfig.name} ${contactItem.label}`}
                  target={contactItem.external ? "_blank" : undefined}
                  rel={contactItem.external ? "noopener noreferrer" : undefined}
                >
                  {contactItem.value}
                </Link>
              </p>
            ))}
          </div>
        </section>


        <section className="text-center w-full mb-4 sm:mb-6">
          <h2 className="title">Updates</h2>

          <ul>
            {recentUpdates.map((update) => (
              <li key={update.date} className="text-left">
                <span className="font-bold">{update.date}</span>{": "}
                <Link
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  {update.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center p-4 sm:p-6 border-t-2 border-black">
        <p className="text-left ">© 2025 {siteConfig.name}</p>

        <p className="text-left">
          <Link
            href="https://enkhy.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            >
            Blog
          </Link>
        </p>

        <p className="text-left">
          <Link
            href="https://bio.enk.icu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Previous Web
          </Link>
        </p>
      </footer>
    </div>
  );
}
