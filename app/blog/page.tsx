import rssParser from 'rss-parser';
import Link from 'next/link';
import Image from 'next/image';

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  pubDate?: string;
  image?: string;
};

function extractImageFromContent(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : undefined;
}

function extractTextFromContent(content: string, maxLength: number = 200): string {
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

async function getFeed(): Promise<FeedItem[]> {
  const parser = new rssParser({
    customFields: {
      item: [['content:encoded', 'contentEncoded']],
    },
  });
  const feedUrl = "https://enkhy.medium.com/feed";
  const feed = await parser.parseURL(feedUrl);
  return (
    feed.items?.slice(0, 10).map((item: any) => {
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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
      <main className="flex flex-col max-w-[600px] w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-2 sm:mb-3">
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

        <header className="mb-4 sm:mb-6">
          <h1 className="name">Blog</h1>
          {/* Keeping back to home as well, if needed */}
        </header>

        <section className="w-full">
          <ul>
            {feed.map((item) => (
              <li key={item.link} className="text-left mb-4">
                <Link
                  href={`/blog/${item.link.split('/').pop()}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </Link>
                <p className="mt-1">{item.contentSnippet}</p>
                {item.pubDate && (
                  <p className="text-sm opacity-70">{item.pubDate}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}