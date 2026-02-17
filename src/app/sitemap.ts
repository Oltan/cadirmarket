import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { PRODUCTS_QUERY } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

const locales = ['tr', 'en']
const baseUrl = 'https://cadirmarket.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await client.fetch(PRODUCTS_QUERY, { locale: 'tr' })

    const staticPages = [
        { path: '', priority: 1, changeFrequency: 'daily' as const },
        { path: '/products', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
        { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    ]

    const staticUrls = staticPages.flatMap(({ path, priority, changeFrequency }) =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency,
            priority,
        }))
    )

    const productUrls = products.flatMap((product: any) =>
        locales.map(locale => ({
            url: `${baseUrl}/${locale}/products/${product.slug.current}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    )

    return [...staticUrls, ...productUrls]
}
