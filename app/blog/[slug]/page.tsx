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

/**
 * Extracts the first <img src="..."> from the given HTML content
 */
function extractImageFromContent(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : undefined;
}

/**
 * Returns plain text, with a max character length
 */
function extractTextFromContent(content: string, maxLength: number = 200): string {
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * For a normal YouTube URL or embed, extract the video ID.
 */
function extractYouTubeVideoId(url: string): string | null {
  // Accepts normal youtu.be, youtube.com/watch?v=... and youtube.com/embed/...
  try {
    const u = new URL(url);
    if (
      u.hostname === 'youtu.be'
    ) {
      return u.pathname.slice(1); // /VIDEOID
    }
    if (
      u.hostname === 'www.youtube.com' ||
      u.hostname === 'youtube.com' ||
      u.hostname === 'm.youtube.com'
    ) {
      if (u.pathname === '/watch' && u.searchParams.has('v')) {
        return u.searchParams.get('v');
      }
      if (u.pathname.startsWith('/embed/')) {
        return u.pathname.split('/')[2];
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Replace raw YouTube links and <a href="...youtube...">...</a>
 * in htmlContent with proper responsive embeds.
 */
function replaceYoutubeLinksWithEmbed(htmlContent: string): string {
  // Match <a ...>https://www.youtube.com/watch?v=....</a> and bare YouTube links
  // as well as https://youtu.be/...
  // Replace with embed iframe.
  let output = htmlContent;

  // Regexp to match anchor tags with hrefs to youtube videos
  const anchorTagRegex =
    /<a [^>]*href="([^"]+(youtube\.com|youtu\.be)[^"]+)"[^>]*>.*?<\/a>/gi;
  output = output.replace(anchorTagRegex, (match, href) => {
    const videoId = extractYouTubeVideoId(href);
    if (videoId) {
      return (
        `<div style="position:relative;padding-bottom:56.25%;height:0;margin-bottom:1.2em;">` +
        `<iframe src="https://www.youtube.com/embed/${videoId}" ` +
        `allowfullscreen ` +
        `frameborder="0" ` +
        `style="position:absolute;top:0;left:0;width:100%;height:100%;" ` +
        `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>` +
        `</div>`
      );
    }
    return match;
  });

  // Regexp to match bare links (just the URL) on its own line (as in Markdown/Medium HTML)
  const bareUrlRegex =
    /(?:^|>)(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\s<]+)(?:$|<)/gim;
  output = output.replace(bareUrlRegex, (match, p1) => {
    const videoId = extractYouTubeVideoId(p1);
    if (videoId) {
      return (
        `<div style="position:relative;padding-bottom:56.25%;height:0;margin-bottom:1.2em;">` +
        `<iframe src="https://www.youtube.com/embed/${videoId}" ` +
        `allowfullscreen ` +
        `frameborder="0" ` +
        `style="position:absolute;top:0;left:0;width:100%;height:100%;" ` +
        `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>` +
        `</div>`
      );
    }
    return match;
  });

  return output;
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
      <div className="min-h-screen overflow-hidden flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <main className="flex flex-col items-center justify-center max-w-[400px] w-full">
          <h1 className="name text-center mb-4 sm:mb-6">404</h1>
          <p className="text-center p-2 sm:p-3">Post not found</p>
          <p className="text-center p-2 sm:p-3">
            <Link
              href="/blog"
              className="hover:text-blue-600 transition-colors"
            >
              ← Back to Blog
            </Link>
          </p>
        </main>
      </div>
    );
  }

  // Fix YouTube embedded links in the Medium RSS HTML before rendering
  const renderedContent = post.contentEncoded
    ? replaceYoutubeLinksWithEmbed(post.contentEncoded)
    : post.contentSnippet ?? "";

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
            <li>
              <Link href="/blog" className="hover:underline text-blue-800 font-semibold">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="truncate max-w-[160px] text-gray-700 opacity-80">{post.title}</li>
          </ol>
        </nav>
        <header className="mb-4 sm:mb-6 w-full">
          <h1 className="name">{post.title}</h1>
          {post.pubDate && (
            <p className="text-left p-2 sm:p-3 text-sm opacity-70">{new Date(post.pubDate).toLocaleDateString()}</p>
          )}
          
        </header>
        <section className="w-full">
          <div
            className="prose max-w-none mb-6"
            style={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: renderedContent,
            }}
          />
        </section>
      </main>
      <footer className="text-center p-4 sm:p-6 border-t-2 border-black mt-8 w-full max-w-[600px]">
        <p className="text-left">
          <Link
            href="/blog"
            className="hover:text-blue-600 transition-colors"
          >
            ← Back to Blog
          </Link>
        </p>
        <p className="text-left">
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            View on Medium
          </Link>
        </p>
      </footer>
    </div>
  );
}
