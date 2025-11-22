import Link from 'next/link';
import Image from 'next/image';
import { fetchMediumFeed } from '@/utils/mediumFeed';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

const PLACEHOLDER_IMAGE = 'https://placekeanu.com/500/300';
const SNIPPET_LENGTH = 72;

function truncate(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export default async function Blog() {
  const feed = await fetchMediumFeed();
  return (
    <div className="min-h-screen overflow-hidden flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <main className="flex flex-col items-center justify-center max-w-[600px] w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-2 sm:mb-3 w-full">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="hover:underline text-blue-800 font-semibold">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="truncate max-w-[160px] text-gray-700 opacity-80">Blog</li>
          </ol>
        </nav>

        <header className="text-center mb-4 sm:mb-6 w-full">
          <h1 className="name">Blog</h1>
          Read it on <Link href="https://medium.com/@enkhy?utm_source=enk.icu" target="_blank" rel="noopener noreferrer">Medium</Link>
        </header>

        <section className="text-center w-full">
          {feed.length === 0 ? (
            <p className="text-left p-2 sm:p-3 text-sm opacity-70">
              Unable to load Medium posts right now. Please try again later.
            </p>
          ) : (
            <ul>
              {feed.map((item) => {
                const slug = item.link.split('/').filter(Boolean).pop() ?? '';
                const snippet = truncate(item.contentSnippet, SNIPPET_LENGTH);
                return (
                  <li key={item.link} className="text-left mb-4 flex items-start gap-2">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:text-blue-600 transition-colors font-semibold"
                    >
                      <Image
                        src={item.image || PLACEHOLDER_IMAGE}
                        alt={item.title || ""}
                        width={200}
                        height={200}
                        className="rounded object-cover flex-shrink-0 mt-1 w-[200px] h-[200px]"
                        unoptimized
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        href={`/blog/${slug}`}
                        className="hover:text-blue-600 transition-colors font-semibold"
                      >
                        {item.title || ""}
                      </Link>
                      <p className="text-left p-2 sm:p-3 mt-1">{snippet}</p>
                      {item.pubDate && (
                        <p className="text-left p-2 sm:p-3 text-sm opacity-70">
                          {new Date(item.pubDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <footer className="text-center p-4 sm:p-6 border-t-2 border-black mt-8 w-full max-w-[600px]">
        <div className="flex flex-col gap-3 w-full items-center text-center">
          <Link
            href="https://medium.com/@enkhy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded border border-black px-6 py-3 text-base font-semibold hover:bg-black hover:text-white transition-colors"
          >
            Read more on Medium →
          </Link>
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
