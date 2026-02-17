import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Urun',
    type: 'document',
    fields: [
        defineField({
            name: 'code',
            title: 'Urun Kodu',
            type: 'string',
        }),
        defineField({
            name: 'title',
            title: 'Urun Adi (Türkçe)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleEn',
            title: 'Product Name (English)',
            type: 'string',
        }),
        defineField({
            name: 'name',
            title: 'Name (eski)',
            type: 'string',
            hidden: true,
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 120,
            },
        }),
        defineField({
            name: 'description',
            title: 'Aciklama (Türkçe)',
            type: 'text',
        }),
        defineField({
            name: 'descriptionEn',
            title: 'Description (English)',
            type: 'text',
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'material',
            title: 'Malzeme',
            type: 'string',
        }),
        defineField({
            name: 'coating',
            title: 'Kaplama',
            type: 'string',
        }),
        defineField({
            name: 'packaging',
            title: 'Paketleme',
            type: 'string',
        }),
        defineField({
            name: 'quantity',
            title: 'Miktar',
            type: 'string',
        }),
        defineField({
            name: 'dimensions',
            title: 'Olculer',
            type: 'object',
            fields: [
                defineField({ name: 'a', title: 'A (mm)', type: 'string' }),
                defineField({ name: 'b', title: 'B (mm)', type: 'string' }),
                defineField({ name: 'd', title: 'D (mm)', type: 'string' }),
                defineField({ name: 'l', title: 'L (mm)', type: 'string' }),
                defineField({ name: 'h', title: 'h (mm)', type: 'string' }),
                defineField({ name: 's', title: 's (mm)', type: 'string' }),
            ],
        }),
        defineField({
            name: 'mainImage',
            title: 'Ana Gorsel',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'images',
            title: 'Gorseller (eski)',
            type: 'array',
            of: [{ type: 'image' }],
            hidden: true,
        }),
        defineField({
            name: 'gallery',
            title: 'Galeri',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'price',
            title: 'Fiyat',
            type: 'number',
        }),
        defineField({
            name: 'stock',
            title: 'Stok',
            type: 'number',
        }),
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
        }),
        defineField({
            name: 'model',
            title: 'Model',
            type: 'string',
        }),
        defineField({
            name: 'isActive',
            title: 'Aktif',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', title: 'Meta Baslik', type: 'string' }),
                defineField({ name: 'metaDescription', title: 'Meta Aciklama', type: 'text' }),
                defineField({
                    name: 'keywords',
                    title: 'Anahtar Kelimeler',
                    type: 'array',
                    of: [{ type: 'string' }],
                }),
            ],
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
})
