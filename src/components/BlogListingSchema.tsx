import { getContent, type Locale } from "@/lib/i18n";

const SITE_URL = "https://irtezaasadrizvi.github.io";
const AUTHOR = "Irteza Asad Rizvi";

const MONTHS: Record<string, number> = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  MÄR: 2, MAI: 4, OKT: 9, DEZ: 11,
  ENE: 0, ABR: 3, AGO: 7, DIC: 11,
  AVR: 3, JUIN: 5, JUIL: 6, AOÛ: 7, FÉV: 1, DÉC: 11,
};

function parsePostDate(label: string): string {
  const trimmed = label.trim();
  const cjk = trimmed.match(/^(\d{4})年(\d{1,2})月$/);
  if (cjk) {
    const y = Number.parseInt(cjk[1], 10);
    const m = Number.parseInt(cjk[2], 10) - 1;
    return new Date(Date.UTC(y, m, 1)).toISOString();
  }
  const [mon, year] = trimmed.toUpperCase().split(/\s+/);
  const month = MONTHS[mon] ?? 0;
  const y = Number.parseInt(year, 10) || new Date().getFullYear();
  return new Date(Date.UTC(y, month, 1)).toISOString();
}

export default function BlogListingSchema({ locale }: { locale: Locale }) {
  const writing = getContent(locale).writing;
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Writing — Irteza Asad Rizvi",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: writing.posts.length,
    itemListElement: writing.posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: post.href,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: post.href,
        datePublished: parsePostDate(post.date),
        articleSection: post.category,
        author: {
          "@type": "Person",
          name: AUTHOR,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: AUTHOR,
          url: SITE_URL,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}
