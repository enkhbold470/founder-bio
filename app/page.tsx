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
      <main className="flex flex-col items-center justify-center max-w-[400px] gap-4">
        {/* Intro Section */}
        <header className="flex flex-col gap-4">
          <h1 className="name">Hi, I&apos;m {siteConfig.name}</h1>
          <div className="flex gap-6">
            {siteConfig.contactDisplay.map((contactItem, index) => (
              <p
                key={`${contactItem.type}-${index}`}
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
          <p className="text-left text-spacing-4">
            {renderBioWithLinks(siteConfig.bio.text, siteConfig.bio.links)}
          </p>
        </header>

      

        <section className="text-center w-full">
          <h2 className="title">Updates</h2>
          <ul className="list-disc list-inside space-y-2 text-left mx-2 my-2">
            {recentUpdates.map((update) => (
              <li key={update.date} className="pl-1">
                <span className="font-semibold">{update.date}</span>
                {": "}
                <Link
                  href={update.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-600 underline"
                >
                  {update.title}
                </Link>
              </li>
            ))}
          </ul>
         
        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center p-4 sm:p-6  bottom-0">

        <p className="text-left">
          <Link
            href="/blog"
          >
            Blog
          </Link>
        </p>
      </footer>
    </div>
  );
}
