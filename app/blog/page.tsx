import rssParser from 'rss-parser';
import Link from 'next/link';
import Image from 'next/image';


interface MediumFeedItem {
  creator?: string;
  title?: string;
  link?: string;
  pubDate?: string;
  'content:encoded'?: string;
  contentEncoded?: string; // alias for content:encoded
  'content:encodedSnippet'?: string;
  contentSnippet?: string;
  'dc:creator'?: string;
  categories?: string[];
  guid?: string;
  isoDate?: string;
  image?: string;
}
export const dynamic = 'force-dynamic';
function extractImageFromContent(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : undefined;
}

function extractTextFromContent(content: string, maxLength: number = 200): string {
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

async function getFeed(): Promise<MediumFeedItem[]> {
  const parser = new rssParser({
    customFields: {
      item: [['content:encoded', 'contentEncoded']],
    },
  });
  const feedUrl = "https://enkhy.medium.com/feed";
  const feed = await parser.parseURL(feedUrl);
  return (
    feed.items?.slice(0, 10).map((item: MediumFeedItem) => {
      const contentEncoded = item.contentEncoded as string || "";
      const image =
        extractImageFromContent(contentEncoded) || "https://placekeanu.com/500/300";
      const summary = item.contentSnippet || extractTextFromContent(contentEncoded, 100);

      return {
        title: item.title ?? "",
        link: item.link ?? "#",
        contentSnippet: summary,
        pubDate: item.pubDate ?? "",
        image,
      };
    }) || []
  );
}

export default async function Blog() {
  const feed = await getFeed();
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
        </header>

        <section className="text-center w-full">
          <ul>
            {feed.map((item: MediumFeedItem) => (
              <li key={item.link} className="text-left mb-4 flex items-start gap-2">
                {/* Very small picture */}
                <Image
                  src={item.image || "https://placekeanu.com/500/300"}
                  alt={item.title || ""}
                  width={200}
                  height={200}
                  className="rounded object-cover flex-shrink-0 mt-1"
                  unoptimized
                />
                <div className="flex-1">
                  <Link
                    href={`/blog/${item.link?.split('/').pop()}`}
                    className="hover:text-blue-600 transition-colors font-semibold"
                  >
                    {item.title || ""}
                  </Link>
                  <p className="text-left p-2 sm:p-3 mt-1">{item.contentSnippet || ""}</p>
                  {item.pubDate && (
                    <p className="text-left p-2 sm:p-3 text-sm opacity-70">{item.pubDate || ""}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="text-center p-4 sm:p-6 border-t-2 border-black mt-8 w-full max-w-[600px]">
        <p className="text-left">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </p>
      </footer>
    </div>
  );
}