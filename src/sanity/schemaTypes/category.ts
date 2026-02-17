import { defineField, defineType } from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Kategori',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Kategori Adi (Türkçe)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titleEn',
            title: 'Category Name (English)',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'description',
            title: 'Aciklama',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Kategori Gorseli',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'order',
            title: 'Siralama',
            type: 'number',
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                defineField({ name: 'metaTitle', title: 'Meta Baslik', type: 'string' }),
                defineField({ name: 'metaDescription', title: 'Meta Aciklama', type: 'text' }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})
