# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CadırMarket is a bilingual (Turkish/English) e-commerce catalog for industrial tents and tarpaulins. It uses Next.js 16 App Router with Sanity CMS as the content backend. This is a product showcase site — no cart or checkout, customers contact via WhatsApp or phone.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
npm run start     # Start production server
```

No test framework is configured.

## Architecture

### Tech Stack
- **Next.js 16** (App Router, Server Components, ISR with 10s revalidation)
- **React 19**, **TypeScript 5**, **Tailwind CSS 4**
- **Sanity CMS** for content (GROQ queries, studio at `/studio`)
- **next-intl 4** for internationalization

### Routing & i18n

All pages live under `src/app/[locale]/`. The locale prefix is always shown in URLs (`/tr/products`, `/en/products`). Turkish (`tr`) is the default locale.

- **Routing config**: `src/i18n/routing.ts` — exports locale-aware `Link`, `redirect`, `usePathname`, `useRouter`
- **Messages**: `messages/tr.json` and `messages/en.json` with namespaced keys (`nav`, `home`, `products`, `product`, `contact`, `about`, `footer`, `common`)
- **Server-side translations**: `getTranslations({ locale, namespace })`
- **Client-side translations**: `useTranslations(namespace)` hook
- **Middleware**: `src/middleware.ts` handles locale detection

### Data Layer (Sanity)

- **Client**: `src/sanity/lib/client.ts`
- **GROQ Queries**: `src/sanity/lib/queries.ts` — all queries accept a `$locale` param and use `coalesce(select($locale == "en" => titleEn, title), ...)` for bilingual field resolution
- **Schemas**: `src/sanity/schemaTypes/` — `product` (title, titleEn, slug, price, stock, gallery, specs) and `category` (title, titleEn, slug)
- **Env vars required**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`

### Component Structure

- `src/components/layout/` — Navbar (with search, mobile menu), Footer (with dynamic categories)
- `src/components/home/` — Hero section
- `src/components/ui/` — Reusable: ProductCard, ProductGallery (lightbox with keyboard/touch nav), CategoryFilter, Pagination, LanguageSwitcher

Components are Server Components by default; only interactive ones use `"use client"` (Navbar search, CategoryFilter, LanguageSwitcher, ProductGallery).

### Key Patterns

- **Pagination**: 12 products per page (`PRODUCTS_PER_PAGE`), controlled via `?page=N&category=slug` URL params
- **Search**: Full-text GROQ search across title, description, code, SKU, brand, material at `/[locale]/search?q=term`
- **Image fallback**: `/images/2025-09-16.png` used when products lack images
- **Path alias**: `@/*` maps to `src/*`
- **SEO**: Dynamic sitemap (`src/app/sitemap.ts`), robots.txt (`src/app/robots.ts`), per-page metadata generation

### Adding a New Locale

1. Add locale code to `src/i18n/routing.ts` `locales` array
2. Create `messages/<locale>.json` with all translation keys
3. Update middleware matcher in `src/middleware.ts`
