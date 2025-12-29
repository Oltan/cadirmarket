// schemas/product.ts
// Ürün Şeması - SEO Optimizasyonlu

import { defineType, defineField } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Ürün',
  type: 'document',
  fields: [
    // Temel Bilgiler
    defineField({
      name: 'code',
      title: 'Ürün Kodu',
      type: 'string',
      description: 'Benzersiz ürün kodu (örn: 010240100)',
    }),
    defineField({
      name: 'title',
      title: 'Ürün Adı',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          // Ürün kodu varsa onu da ekle
          const code = doc.code ? `${doc.code}-` : ''
          return `${code}${doc.title}`
        },
        maxLength: 120,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/ş/g, 's')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/ı/g, 'i')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Ürün Açıklaması',
      type: 'text',
      rows: 4,
      description: 'Detaylı ürün açıklaması (SEO için önemli)',
    }),

    // Kategori
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),

    // Teknik Özellikler
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'Ürün modeli (örn: ALULINER, STEELCOMLINER)',
    }),
    defineField({
      name: 'material',
      title: 'Malzeme',
      type: 'string',
      description: 'Hammadde bilgisi',
    }),
    defineField({
      name: 'coating',
      title: 'Kaplama',
      type: 'string',
      description: 'Yüzey işlemi/kaplama',
    }),
    defineField({
      name: 'quantity',
      title: 'Miktar/Birim',
      type: 'string',
      description: 'Paket miktarı veya birim',
    }),

    // Ölçüler
    defineField({
      name: 'dimensions',
      title: 'Ölçüler',
      type: 'object',
      fields: [
        defineField({ name: 'a', title: 'A (mm)', type: 'string' }),
        defineField({ name: 'b', title: 'B (mm)', type: 'string' }),
        defineField({ name: 'd', title: 'D/Ød (mm)', type: 'string' }),
        defineField({ name: 'l', title: 'L (mm)', type: 'string' }),
        defineField({ name: 'h', title: 'h (mm)', type: 'string' }),
        defineField({ name: 's', title: 's (mm)', type: 'string' }),
      ],
    }),

    // Görseller
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Görsel için alternatif metin - Ürün adı ve özelliklerini içermeli',
        }),
        defineField({
          name: 'caption',
          title: 'Başlık',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Ürün Galerisi',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    // Ek Bilgiler
    defineField({
      name: 'packaging',
      title: 'Paketleme Bilgisi',
      type: 'string',
      description: 'Paket başına adet/birim',
    }),
    defineField({
      name: 'specifications',
      title: 'Teknik Özellikler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'key', title: 'Özellik', type: 'string' }),
            defineField({ name: 'value', title: 'Değer', type: 'string' }),
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
          },
        },
      ],
    }),

    // SEO Alanları
    defineField({
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Başlık',
          type: 'string',
          description: 'Arama sonuçlarında görünecek başlık (50-60 karakter ideal). Boş bırakılırsa ürün adı kullanılır.',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Açıklama',
          type: 'text',
          rows: 2,
          description: 'Arama sonuçlarında görünecek açıklama (150-160 karakter ideal)',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Anahtar Kelimeler',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
          description: 'Ürünle ilgili arama terimleri',
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Varsa canonical URL (genelde boş bırakılır)',
        }),
      ],
    }),

    // Schema.org Structured Data için ek alanlar
    defineField({
      name: 'brand',
      title: 'Marka',
      type: 'string',
      initialValue: 'Gema Politek',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Stok kodu - genelde ürün koduyla aynı',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      code: 'code',
      category: 'category.title',
      media: 'mainImage',
    },
    prepare({ title, code, category, media }) {
      return {
        title: code ? `${code} - ${title}` : title,
        subtitle: category,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ürün Koduna Göre',
      name: 'codeAsc',
      by: [{ field: 'code', direction: 'asc' }],
    },
    {
      title: 'Kategoriye Göre',
      name: 'categoryAsc',
      by: [{ field: 'category.title', direction: 'asc' }],
    },
  ],
})
