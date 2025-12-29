# Gema Politek - Sanity Import Rehberi

Bu rehber, PDF kataloğundan oluşturduğumuz CSV dosyasını Sanity CMS'e aktarmanızı, görselleri eklemenizi ve SEO optimizasyonu yapmanızı sağlar.

## 📋 İçindekiler

1. [Ön Hazırlık](#1-ön-hazırlık)
2. [Sanity Şemaları](#2-sanity-şemaları)
3. [Import İşlemi](#3-import-işlemi)
4. [Görsel Ekleme](#4-görsel-ekleme)
5. [SEO Optimizasyonu](#5-seo-optimizasyonu)
6. [Frontend Entegrasyonu](#6-frontend-entegrasyonu)

---

## 1. Ön Hazırlık

### Gereksinimler

```bash
# Node.js (v18+)
node --version

# Sanity CLI
npm install -g @sanity/cli

# Proje bağımlılıkları
npm install
```

### Sanity Token Alma

1. [manage.sanity.io](https://manage.sanity.io) adresine gidin
2. Projenizi seçin → **API** → **Tokens**
3. **Add API Token** → **Editor** yetkisi seçin
4. Token'ı `scripts/import-products.ts` dosyasına ekleyin

---

## 2. Sanity Şemaları

### Şemaları Projenize Ekleyin

`schemas/` klasöründeki dosyaları Sanity projenizin `schemas/` klasörüne kopyalayın:

```bash
# Sanity proje klasörünüze gidin
cd your-sanity-project

# Şemaları kopyalayın
cp -r /path/to/sanity-import/schemas/* ./schemas/
```

### Schema Index'i Güncelleyin

```typescript
// schemas/index.ts
import { categoryType } from './category'
import { productType } from './product'

export const schemaTypes = [
  categoryType,
  productType,
  // ... diğer şemalarınız
]
```

### Şema Özellikleri

#### Kategori Şeması (`category.ts`)
- ✅ SEO alanları (meta title, description, keywords)
- ✅ Türkçe karakter destekli slug
- ✅ Hiyerarşik kategori desteği (üst/alt kategori)
- ✅ Görsel ve alt text

#### Ürün Şeması (`product.ts`)
- ✅ Tam SEO desteği
- ✅ Teknik özellikler (ölçüler, malzeme, kaplama)
- ✅ Çoklu görsel galerisi
- ✅ Schema.org için brand/sku alanları
- ✅ Canonical URL desteği

---

## 3. Import İşlemi

### Yöntem 1: TypeScript Script (Önerilen)

```bash
# Konfigürasyonu düzenle
# scripts/import-products.ts içinde:
# - YOUR_PROJECT_ID
# - YOUR_SANITY_TOKEN

# Import'u çalıştır
npm run import
```

### Yöntem 2: NDJSON ile Sanity CLI

```bash
# NDJSON oluştur
npm run generate:ndjson

# Sanity CLI ile import et
npm run sanity:import

# veya
sanity dataset import data/products.ndjson production --replace
```

### Import Sonrası Kontrol

```groq
// Sanity Vision'da çalıştırın

// Tüm kategorileri listele
*[_type == "category"] | order(order asc) {
  title,
  slug,
  "productCount": count(*[_type == "product" && references(^._id)])
}

// Tüm ürünleri listele
*[_type == "product"] | order(code asc) {
  code,
  title,
  "category": category->title
}
```

---

## 4. Görsel Ekleme

### Görsel Dosya Yapısı

```
images/
├── 010240100.jpg          # Ürün koduna göre
├── 010240100.png
├── 24-no-kapsul-pul.jpg   # Slug'a göre
├── categories/
│   ├── kapsul.jpg
│   ├── kanca.jpg
│   └── ...
└── ...
```

### Toplu Görsel Upload

Script, görselleri şu sırayla arar:
1. `{ürün_kodu}.jpg`
2. `{ürün_kodu}.png`
3. `{slug}.jpg`
4. `{slug}.png`

### Manuel Görsel Ekleme (Sanity Studio)

1. Sanity Studio'yu açın
2. İlgili ürünü bulun
3. **Ana Görsel** alanına sürükle-bırak
4. **Alt Text** alanını doldurun (SEO için kritik!)

### Görsel Optimizasyonu İpuçları

```
✅ WebP formatı kullanın (daha küçük boyut)
✅ Maksimum 1200px genişlik
✅ Dosya boyutu < 200KB
✅ Anlamlı dosya adları (010240100-24-no-kapsul.jpg)
✅ Her görsele alt text ekleyin
```

---

## 5. SEO Optimizasyonu

### Otomatik SEO Alanları

Import scripti şu SEO alanlarını otomatik doldurur:

| Alan | Otomatik Değer |
|------|----------------|
| Meta Title | `{Ürün Kodu} {Ürün Adı} \| Gema Politek` |
| Meta Description | Ürün özellikleri özeti (max 160 karakter) |
| Keywords | Ürün adı, kategori, malzeme, kaplama |
| Slug | Türkçe karakterler dönüştürülmüş URL |

### SEO Kontrol Listesi

```
□ Her ürünün benzersiz slug'ı var mı?
□ Meta title 60 karakterin altında mı?
□ Meta description 155-160 karakter arasında mı?
□ Tüm görsellerin alt text'i var mı?
□ Canonical URL'ler doğru mu?
□ Kategori hiyerarşisi mantıklı mı?
```

### Schema.org Structured Data

Frontend'de kullanmak için örnek:

```tsx
// components/ProductSchema.tsx
import { Product, WithContext } from 'schema-dml'

export function ProductSchema({ product }) {
  const schema: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.seo?.metaDescription || product.description,
    sku: product.sku || product.code,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Gema Politek',
    },
    image: product.mainImage?.asset?.url,
    category: product.category?.title,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Sitemap Oluşturma

```tsx
// app/sitemap.ts (Next.js örneği)
import { client } from '@/lib/sanity'

export default async function sitemap() {
  const products = await client.fetch(`
    *[_type == "product" && isActive == true] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  const categories = await client.fetch(`
    *[_type == "category"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  return [
    // Ana sayfa
    { url: 'https://yoursite.com', lastModified: new Date() },
    
    // Kategoriler
    ...categories.map((cat) => ({
      url: `https://yoursite.com/kategori/${cat.slug}`,
      lastModified: new Date(cat._updatedAt),
    })),
    
    // Ürünler
    ...products.map((product) => ({
      url: `https://yoursite.com/urun/${product.slug}`,
      lastModified: new Date(product._updatedAt),
      priority: 0.8,
    })),
  ]
}
```

---

## 6. Frontend Entegrasyonu

### GROQ Sorguları

```groq
// Kategori listesi
export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    "image": image.asset->url,
    "imageAlt": image.alt,
    seo
  }
`

// Kategori detay + ürünleri
export const categoryWithProductsQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    seo,
    "products": *[_type == "product" && references(^._id)] | order(code asc) {
      _id,
      code,
      title,
      slug,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      material,
      coating
    }
  }
`

// Ürün detay
export const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    code,
    title,
    slug,
    description,
    model,
    material,
    coating,
    quantity,
    packaging,
    dimensions,
    brand,
    sku,
    "mainImage": mainImage {
      "url": asset->url,
      alt,
      caption
    },
    "gallery": gallery[] {
      "url": asset->url,
      alt
    },
    "category": category-> {
      _id,
      title,
      slug
    },
    seo,
    specifications
  }
`

// Arama
export const searchQuery = groq`
  *[_type == "product" && (
    title match $query + "*" ||
    code match $query + "*" ||
    material match $query + "*"
  )] | order(code asc) [0...20] {
    _id,
    code,
    title,
    slug,
    "image": mainImage.asset->url,
    "category": category->title
  }
`
```

### Next.js Metadata Örneği

```tsx
// app/urun/[slug]/page.tsx
import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { productQuery } from '@/lib/queries'

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await client.fetch(productQuery, { slug: params.slug })

  return {
    title: product.seo?.metaTitle || `${product.code} ${product.title}`,
    description: product.seo?.metaDescription || product.description,
    keywords: product.seo?.keywords?.join(', '),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.mainImage?.url ? [product.mainImage.url] : [],
      type: 'website',
    },
    alternates: {
      canonical: product.seo?.canonicalUrl || `/urun/${product.slug.current}`,
    },
  }
}
```

---

## 🚀 Hızlı Başlangıç

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Konfigürasyonu düzenle
# scripts/import-products.ts içinde token ve project ID

# 3. Şemaları Sanity projesine kopyala
cp schemas/*.ts your-sanity-project/schemas/

# 4. Import et
npm run import

# 5. Sanity Studio'da kontrol et
cd your-sanity-project && sanity dev
```

---

## ❓ Sık Sorulan Sorular

### Import çok yavaş çalışıyor
- Rate limiting için `await` kullanılıyor
- Büyük datasetlerde batch işlem eklenebilir

### Görseller yüklenmiyor
- `images/` klasörünün doğru yerde olduğundan emin olun
- Dosya adlarının ürün kodlarıyla eşleştiğini kontrol edin

### Türkçe karakterler bozuk görünüyor
- CSV dosyasının UTF-8 encoding olduğundan emin olun
- `slugify()` fonksiyonu Türkçe karakterleri dönüştürür

### Duplicate ürünler oluşuyor
- `createOrReplace` kullanılıyor, aynı ID'li ürünler güncellenir
- ID'ler slug'dan üretiliyor, unique olmalı

---

## 📞 Destek

Sorunlarınız için:
1. Sanity Documentation: https://www.sanity.io/docs
2. Sanity Slack: https://slack.sanity.io
