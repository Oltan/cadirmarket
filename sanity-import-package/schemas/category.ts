// schemas/category.ts
// Ürün Kategorileri Şeması - SEO Optimizasyonlu

import { defineType, defineField } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategori Adı',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
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
      title: 'Kategori Açıklaması',
      type: 'text',
      rows: 3,
      description: 'Kategori hakkında kısa açıklama (SEO için önemli)',
    }),
    defineField({
      name: 'image',
      title: 'Kategori Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Görsel için alternatif metin - SEO ve erişilebilirlik için önemli',
        }),
      ],
    }),
    defineField({
      name: 'parentCategory',
      title: 'Üst Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Alt kategori ise üst kategoriyi seçin',
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Kategorilerin listelenme sırası',
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
          description: 'Arama sonuçlarında görünecek başlık (50-60 karakter ideal)',
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
