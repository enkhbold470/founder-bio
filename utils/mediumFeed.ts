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

type Rss2JsonItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  content?: string;
  description?: string;
  thumbnail?: string;
  enclosure?: {
    link?: string;
    type?: string;
  };
};

type Rss2JsonResponse = {
  status: 'ok' | 'error';
  items?: Rss2JsonItem[];
  message?: string;
};

const MEDIUM_FEED_URL = 'https://medium.com/feed/@enkhy';
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_FEED_URL)}`;
const FETCH_HEADERS = {
  Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7',
  'User-Agent': 'FounderBioBot/1.0 (+https://founder.bio)',
};

const TAG_REGEX = /<[^>]*>/g;
const WHITESPACE_REGEX = /\s+/g;
const CLOUDFLARE_MARKERS = ['__cf_chl_', 'cf-mitigated', 'Just a moment'];

export async function fetchMediumFeed(): Promise<MediumFeedEntry[]> {
  try {
    const directItems = await fetchDirectFeed();
    return directItems.map(normalizeItem);
  } catch (error) {
    console.error('Primary Medium RSS fetch failed, attempting rss2json fallback.', error);
    try {
      return await fetchFallbackFeed();
    } catch (fallbackError) {
      console.error('rss2json fallback failed', fallbackError);
      return [];
    }
  }
}

async function fetchDirectFeed(): Promise<MediumFeedItem[]> {
  const parser = new Parser<unknown, MediumFeedItem>({
    customFields: {
      item: [['content:encoded', 'contentEncoded']],
    },
  });

  const response = await fetch(MEDIUM_FEED_URL, {
    cache: 'no-store',
    headers: FETCH_HEADERS,
  });
  const xml = await response.text();

  if (!response.ok) {
    throw new Error(`Medium feed request failed (${response.status})`);
  }
  if (looksLikeCloudflareChallenge(xml)) {
    throw new Error('Medium feed is being protected by Cloudflare.');
  }

  const feed = await parser.parseString(xml);
  return feed.items ?? [];
}

async function fetchFallbackFeed(): Promise<MediumFeedEntry[]> {
  const response = await fetch(RSS2JSON_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`rss2json request failed (${response.status})`);
  }

  const payload = (await response.json()) as Rss2JsonResponse;
  if (payload.status !== 'ok' || !payload.items) {
    throw new Error(payload.message || 'rss2json returned an invalid payload.');
  }

  return payload.items.map((item) =>
    normalizeItem({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentEncoded: item.content ?? item.description ?? '',
      contentSnippet: item.description ?? '',
      image: item.thumbnail ?? item.enclosure?.link,
      enclosure: item.enclosure?.link
        ? {
            url: item.enclosure.link,
            type: item.enclosure.type,
          }
        : undefined,
    })
  );
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

function looksLikeCloudflareChallenge(payload: string): boolean {
  const lower = payload.toLowerCase();
  return CLOUDFLARE_MARKERS.some((marker) => lower.includes(marker));
}
