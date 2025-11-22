import Parser from 'rss-parser';

export type MediumFeedEntry = {
  title: string;
  link: string;
  contentEncoded: string;
  contentSnippet: string;
  pubDate?: string;
  image?: string;
};

interface MediumFeedItem extends Parser.Item {
  isoDate?: string;
  image?: string;
  content?: string;
  contentEncoded?: string;
  'content:encoded'?: string;
  'content:encodedSnippet'?: string;
}

const MEDIUM_FEED_URL = 'https://medium.com/feed/@enkhy';
const FETCH_HEADERS = {
  Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7',
  'User-Agent': 'FounderBioBot/1.0 (+https://founder.bio)',
};

const TAG_REGEX = /<[^>]*>/g;
const WHITESPACE_REGEX = /\s+/g;

export async function fetchMediumFeed(): Promise<MediumFeedEntry[]> {
  try {
    const parser = new Parser<unknown, MediumFeedItem>({
      customFields: {
        item: [['content:encoded', 'contentEncoded']],
      },
    });

    const response = await fetch(MEDIUM_FEED_URL, {
      cache: 'no-store',
      headers: FETCH_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`Medium RSS feed request failed (${response.status})`);
    }

    const xml = await response.text();
    const feed = await parser.parseString(xml);
    const items = feed.items ?? [];

    return items.map(normalizeItem);
  } catch (error) {
    console.error('Unable to load Medium RSS feed:', error);
    return [];
  }
}

function normalizeItem(item: MediumFeedItem): MediumFeedEntry {
  const contentEncoded =
    (item.contentEncoded ??
      item['content:encoded'] ??
      item.content ??
      '') as string;
  const snippetSource =
    item.contentSnippet ?? item['content:encodedSnippet'] ?? contentEncoded;

  return {
    title: item.title ?? '',
    link: item.link ?? item.guid ?? '#',
    contentEncoded,
    contentSnippet: extractTextFromHtml(snippetSource),
    pubDate: item.pubDate ?? item.isoDate,
    image:
      item.image ??
      extractImageFromHtml(contentEncoded) ??
      item.enclosure?.url,
  };
}

function extractTextFromHtml(content: string): string {
  if (!content) return '';
  const text = content.replace(TAG_REGEX, ' ').replace(WHITESPACE_REGEX, ' ').trim();
  if (text.length <= 260) return text;
  return `${text.slice(0, 260).trim()}...`;
}

function extractImageFromHtml(content: string): string | undefined {
  if (!content) return undefined;
  const match = content.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : undefined;
}
