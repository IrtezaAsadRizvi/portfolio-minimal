import { getContent } from "@/lib/i18n";

const writing = getContent("en").writing;

export const dynamic = "force-static";

const SITE_URL = "https://irtezaasadrizvi.github.io";
const AUTHOR = "Irteza Asad Rizvi";
const FEED_TITLE = "Irteza Asad Rizvi — Writing";
const FEED_DESCRIPTION =
  "Technical deep-dives on Node.js internals, AI and LLM engineering, adversarial machine learning, DevOps, and web security.";

const MONTHS: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

function parsePostDate(label: string): Date {
  const [mon, year] = label.trim().toUpperCase().split(/\s+/);
  const month = MONTHS[mon] ?? 0;
  const y = Number.parseInt(year, 10) || new Date().getFullYear();
  return new Date(Date.UTC(y, month, 1, 12, 0, 0));
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = [...writing.posts]
    .map((post) => ({ ...post, _date: parsePostDate(post.date) }))
    .sort((a, b) => b._date.getTime() - a._date.getTime());

  const buildDate = items[0]?._date ?? new Date();

  const rssItems = items
    .map((post) => {
      const pubDate = post._date.toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.href)}</link>
      <guid isPermaLink="true">${escapeXml(post.href)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
      <dc:creator>${escapeXml(AUTHOR)}</dc:creator>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/writing</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(AUTHOR)}</copyright>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
    <managingEditor>noreply@irtezaasadrizvi.github.io (${escapeXml(AUTHOR)})</managingEditor>
    <webMaster>noreply@irtezaasadrizvi.github.io (${escapeXml(AUTHOR)})</webMaster>
    <generator>Next.js</generator>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${SITE_URL}/writing</link>
    </image>
${rssItems}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
