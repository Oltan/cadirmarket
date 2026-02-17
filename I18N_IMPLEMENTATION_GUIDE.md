# i18n Implementation Guide - Remaining Steps

**Current Status:** ✅ Foundation complete (next-intl installed, routing configured, translations created)

**Branch:** `feature/languageSupport`

---

## What's Already Done ✅

1. ✅ Installed `next-intl` package
2. ✅ Created i18n configuration (`src/i18n/routing.ts`, `src/i18n/request.ts`)
3. ✅ Created middleware for locale detection (`src/middleware.ts`)
4. ✅ Updated `next.config.ts` with next-intl plugin
5. ✅ Created translation files:
   - `messages/tr.json` - Turkish translations
   - `messages/en.json` - English translations

---

## Remaining Work 🚧

### Step 1: Restructure App Directory with [locale] Routing

**Goal:** Move all pages into a `[locale]` dynamic segment folder.

**Current structure:**
```
src/app/
├── layout.tsx
├── page.tsx
├── products/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── privacy/page.tsx
└── ...
```

**Target structure:**
```
src/app/
├── [locale]/
│   ├── layout.tsx       (moved from app/layout.tsx)
│   ├── page.tsx         (moved from app/page.tsx)
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── privacy/page.tsx
├── layout.tsx           (NEW - minimal root layout)
├── robots.ts            (stays here)
└── sitemap.ts           (stays here)
```

#### 1.1. Create Root Layout

**File:** `src/app/layout.tsx`

```tsx
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

This minimal root layout is required. The actual layout will be in `[locale]/layout.tsx`.

#### 1.2. Create Locale Layout

**File:** `src/app/[locale]/layout.tsx`

Move the current `src/app/layout.tsx` here and update it:

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ÇadırMarket - Çadır ve Branda Çözümleri",
  description: "30 yılı aşkın tecrübemizle, endüstriyel koruma sistemlerinde profesyonel çözümler sunuyoruz.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

#### 1.3. Move All Pages

Move these files from `src/app/` to `src/app/[locale]/`:

1. **Home page:** `page.tsx` → `[locale]/page.tsx`
2. **Products:** `products/page.tsx` → `[locale]/products/page.tsx`
3. **Product detail:** `products/[slug]/page.tsx` → `[locale]/products/[slug]/page.tsx`
4. **About:** `about/page.tsx` → `[locale]/about/page.tsx`
5. **Contact:** `contact/page.tsx` → `[locale]/contact/page.tsx`
6. **Privacy:** `privacy/page.tsx` → `[locale]/privacy/page.tsx`
7. **Search:** `search/page.tsx` → `[locale]/search/page.tsx`

**Keep these files in root `src/app/`:**
- `robots.ts`
- `sitemap.ts`
- `studio/[[...index]]/page.tsx` (Sanity Studio doesn't need translation)
- `globals.css` (move to `[locale]/` later or keep in root)

---

### Step 2: Update All Pages to Use Translations

#### 2.1. Update Navigation Links

**File:** `src/components/layout/Navbar.tsx`

Replace `next/link` with `next-intl` Link:

```tsx
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('nav');

  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/products">{t('products')}</Link>
      <Link href="/about">{t('about')}</Link>
      <Link href="/contact">{t('contact')}</Link>
    </nav>
  );
}
```

**Important:** Update ALL instances of:
- `import Link from 'next/link'` → `import { Link } from '@/i18n/routing'`
- `import { useRouter } from 'next/navigation'` → `import { useRouter } from '@/i18n/routing'`

#### 2.2. Update Server Components

For server components (all pages), use `useTranslations`:

**Example:** `src/app/[locale]/page.tsx`

```tsx
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('hero.title'),
    description: t('hero.subtitle'),
  };
}

export default function Home() {
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

#### 2.3. Update Client Components

For client components, add `"use client"` and use `useTranslations`:

**Example:** Update Contact form

```tsx
"use client";
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      {/* ... */}
    </div>
  );
}
```

---

### Step 3: Create Language Switcher Component

**File:** `src/components/ui/LanguageSwitcher.tsx`

```tsx
"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative">
      <button
        onClick={() => switchLocale(locale === 'tr' ? 'en' : 'tr')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>
    </div>
  );
}
```

**Add to Navbar:**

```tsx
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Navbar() {
  return (
    <nav>
      {/* ... existing nav items */}
      <LanguageSwitcher />
    </nav>
  );
}
```

---

### Step 4: Update Sanity Schemas for Localized Content

#### 4.1. Install Sanity Document Internationalization Plugin

```bash
npm install @sanity/document-internationalization
```

#### 4.2. Update Product Schema

**File:** `src/sanity/schemaTypes/product.ts`

Add localized fields:

```typescript
import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Urun',
  type: 'document',
  fields: [
    // ... existing fields (code, sku, price, stock, etc. - these are not localized)

    defineField({
      name: 'title',
      title: 'Urun Adi',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),

    defineField({
      name: 'description',
      title: 'Aciklama',
      type: 'object',
      fields: [
        { name: 'tr', title: 'Türkçe', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
      ],
    }),

    // ... rest of fields
  ],
});
```

#### 4.3. Update Category Schema

Similarly update `src/sanity/schemaTypes/category.ts`:

```typescript
defineField({
  name: 'title',
  title: 'Kategori Adi',
  type: 'object',
  fields: [
    { name: 'tr', title: 'Türkçe', type: 'string' },
    { name: 'en', title: 'English', type: 'string' },
  ],
}),
```

---

### Step 5: Update GROQ Queries for Localized Content

**File:** `src/sanity/lib/queries.ts`

Update queries to accept locale parameter:

```typescript
import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product"]{
  _id,
  "name": coalesce(title[$locale], title.tr),
  code,
  slug,
  price,
  stock,
  "description": coalesce(description[$locale], description.tr),
  material,
  coating,
  packaging,
  "imageUrl": coalesce(gallery[0].asset->url, images[0].asset->url, mainImage.asset->url),
  "category": coalesce(category->title[$locale], category->title.tr)
}`);

// Similar updates for all other queries
```

**Update client fetch calls:**

```typescript
const products = await client.fetch(PRODUCTS_QUERY, { locale });
```

---

### Step 6: Update Page Components to Pass Locale

**Example:** `src/app/[locale]/products/page.tsx`

```tsx
export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { category, page } = await searchParams;

  // Fetch with locale
  const products = await client.fetch(PRODUCTS_QUERY, { locale });

  // ...
}
```

---

### Step 7: Update Footer with Translations

**File:** `src/components/layout/Footer.tsx`

```tsx
import { useTranslations } from 'next-intl';

export default async function Footer() {
  const t = useTranslations('footer');

  return (
    <footer>
      <h3>{t('about')}</h3>
      <p>{t('aboutText')}</p>
      {/* ... */}
    </footer>
  );
}
```

---

### Step 8: Update Sitemap for Localized URLs

**File:** `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cadirmarket.com';

  // Generate URLs for each locale
  const locales = routing.locales;

  const staticPages = ['', '/products', '/about', '/contact', '/privacy'];

  const urls = staticPages.flatMap(page =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  return urls;
}
```

---

## Testing Checklist ✅

After completing all steps, test:

1. ✅ Navigate to `/tr` - should show Turkish site
2. ✅ Navigate to `/en` - should show English site
3. ✅ Language switcher works on all pages
4. ✅ All navigation links work with locale prefix
5. ✅ Products show translated content
6. ✅ Categories show translated content
7. ✅ Metadata (titles, descriptions) are translated
8. ✅ Sitemap includes all localized URLs
9. ✅ `/` redirects to `/tr` (default locale)
10. ✅ Build succeeds: `npm run build`

---

## Deployment Notes

### Environment Variables

Add to `.env.local` and Vercel:

```env
NEXT_PUBLIC_BASE_URL=https://cadirmarket.com
```

### Vercel Configuration

No special configuration needed - next-intl works out of the box with Vercel.

---

## Common Issues & Solutions

### Issue 1: "locale" is not a valid parameter

**Solution:** Make sure all page components accept `params: Promise<{ locale: string }>` and await it.

### Issue 2: Links don't have locale prefix

**Solution:** Replace all `import Link from 'next/link'` with `import { Link } from '@/i18n/routing'`.

### Issue 3: Translations not loading

**Solution:** Check that `messages/${locale}.json` files exist and are properly formatted.

### Issue 4: Middleware not working

**Solution:** Ensure `src/middleware.ts` has correct matcher config:
```typescript
export const config = {
  matcher: ['/', '/(tr|en)/:path*']
};
```

---

## File Changes Summary

### New Files
- `src/app/layout.tsx` (minimal root)
- `src/app/[locale]/layout.tsx` (main layout)
- `src/components/ui/LanguageSwitcher.tsx`

### Moved Files
- All pages from `src/app/` → `src/app/[locale]/`

### Modified Files
- All components using `Link` or `useRouter`
- All page components (add locale param)
- `src/sanity/schemaTypes/product.ts` (localized fields)
- `src/sanity/schemaTypes/category.ts` (localized fields)
- `src/sanity/lib/queries.ts` (add locale param)
- `src/app/sitemap.ts` (localized URLs)

---

## Estimated Time

- Step 1-3 (Restructure + UI): ~2-3 hours
- Step 4-5 (Sanity schemas + queries): ~1-2 hours
- Step 6-8 (Update pages + testing): ~2-3 hours

**Total:** ~5-8 hours

---

## Next Session Checklist

Start with:
1. Create `src/app/layout.tsx` (minimal root)
2. Move current layout to `src/app/[locale]/layout.tsx`
3. Move one page (e.g., home) to test the structure
4. Verify routing works before moving all pages

---

**Good luck! 🚀**
