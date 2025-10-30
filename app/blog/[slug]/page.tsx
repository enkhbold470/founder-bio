import rssParser from 'rss-parser';
import Image from 'next/image';
import Link from 'next/link';

type FeedItem = {
  title: string;
  link: string;
  contentEncoded?: string;
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
    feed.items?.map((item: any) => {
      const contentEncoded = item.contentEncoded as string || "";
      const image = extractImageFromContent(contentEncoded);
      return {
        title: item.title ?? "",
        link: item.link ?? "#",
        contentEncoded,
        contentSnippet: item.contentSnippet || extractTextFromContent(contentEncoded, 200),
        pubDate: item.pubDate ?? "",
        image,
      };
    }) || []
  );
}

type BlogPostParams = { slug: string };

export default async function BlogPostPage({ params }: { params: BlogPostParams }) {
  const { slug } = await params;

  const feed = await getFeed();
  const post = feed.find(item => {
    try {
      const urlObj = new URL(item.link);
      const parts = urlObj.pathname.split("/");
      const last = parts.filter(Boolean).pop() || "";
      return last === slug;
    } catch (e) {
      return false;
    }
  });

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <main className="flex flex-col max-w-[400px]">
          <h1 className="name text-center">404</h1>
          <p className="text-center p-2 sm:p-3">Post not found</p>
          <p className="text-center p-2 sm:p-3">
            <Link href="/blog">← Back to Blog</Link>
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
      <article className="max-w-[600px] w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-2 sm:mb-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="hover:underline text-blue-800 font-semibold">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:underline text-blue-800 font-semibold">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="truncate max-w-[160px] text-gray-700 opacity-80">{post.title}</li>
          </ol>
        </nav>
        <header className="mb-4 sm:mb-6">
          <h1 className="name">{post.title}</h1>
          {post.pubDate && (
            <p className="text-left p-2 sm:p-3 text-sm opacity-70">
              {new Date(post.pubDate).toLocaleDateString()}
            </p>
          )}
          {post.image && (
            <div className="w-full my-4">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={340}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </header>
        
        <div
          className="prose max-w-none mb-6"
          style={{ wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{
            __html: post.contentEncoded ?? post.contentSnippet ?? "",
          }}
        />
        
        <footer className="text-center p-4 sm:p-6 border-t-2 border-black mt-8">
          <p className="text-left">
            <Link href="/blog">← Back to Blog</Link>
          </p>
          <p className="text-left">
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Medium
            </Link>
          </p>
        </footer>
      </article>
    </div>
  );
}
