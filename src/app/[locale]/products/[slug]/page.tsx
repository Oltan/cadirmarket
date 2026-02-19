import { client } from "@/sanity/lib/client";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import ProductGallery from "@/components/ui/ProductGallery";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string; locale: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug, locale } = await params;
    const product = await client.fetch(PRODUCT_QUERY, { slug, locale });

    if (!product) return { title: locale === 'en' ? "Product Not Found | Çadır Market" : "Ürün Bulunamadı | Çadır Market" };

    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: product.name,
        description: product.description?.slice(0, 160),
        openGraph: {
            title: product.name,
            description: product.description?.slice(0, 160),
            images: [product.images?.[0] || "/images/2025-09-16.png", ...previousImages],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const [product, t] = await Promise.all([
        client.fetch(PRODUCT_QUERY, { slug, locale }),
        getTranslations({ locale, namespace: 'product' })
    ]);

    if (!product) notFound();

    return (
        <div className="container mx-auto px-4 py-16">
            <Link href="/products" className="text-zinc-500 hover:text-black dark:hover:text-white mb-8 inline-block">
                &larr; {t('backToProducts')}
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ProductGallery images={product.images || []} name={product.name} />

                <div>
                    <div className="mb-6">
                        <span className="text-green-600 font-medium">{product.category || t('general')}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
                        {product.code && (
                            <p className="text-sm text-zinc-500 mb-2">{t('code')}: {product.code}</p>
                        )}
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                            {product.price ? `₺${product.price.toLocaleString('tr-TR')}` : t('askPrice')}
                        </p>
                    </div>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>{product.description}</p>
                    </div>

                    {(product.material || product.coating || product.packaging) && (
                        <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold mb-3">{t('specs')}</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {product.material && <div><span className="text-zinc-500">{t('material')}:</span> {product.material}</div>}
                                {product.coating && <div><span className="text-zinc-500">{t('coating')}:</span> {product.coating}</div>}
                                {product.packaging && <div><span className="text-zinc-500">{t('packaging')}:</span> {product.packaging}</div>}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {product.stock !== undefined && product.stock !== null && (
                            <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="font-medium">
                                    {product.stock > 0 ? t('inStock', { count: product.stock }) : t('outOfStock')}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <a
                                href={`https://wa.me/905322183061?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum.`}
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors"
                            >
                                <span>{t('whatsapp')}</span>
                            </a>
                            <a
                                href="tel:05322183061"
                                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black font-bold py-4 rounded-xl transition-colors"
                            >
                                <span>0532 218 30 61</span>
                                <span className="text-xs opacity-70">(Murat Demirel)</span>
                            </a>
                            <a
                                href="tel:03123855814"
                                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black font-bold py-4 rounded-xl transition-colors sm:col-span-2"
                            >
                                <span>0312 385 58 14</span>
                                <span className="text-xs opacity-70">({t('shop')})</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
