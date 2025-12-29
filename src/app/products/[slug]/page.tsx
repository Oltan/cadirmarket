import { client } from "@/sanity/lib/client";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const product = await client.fetch(PRODUCT_QUERY, { slug });

    if (!product) {
        return {
            title: "Ürün Bulunamadı | Çadır Market",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: product.name,
        description: product.description?.slice(0, 160) || `${product.name} ve diğer çadır/branda ürünleri için Çadır Market'i ziyaret edin.`,
        openGraph: {
            title: product.name,
            description: product.description?.slice(0, 160),
            images: [
                product.images?.[0] || "/images/2025-09-16.jpg",
                ...previousImages,
            ],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await client.fetch(PRODUCT_QUERY, { slug });

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <Link href="/products" className="text-zinc-500 hover:text-black dark:hover:text-white mb-8 inline-block">
                &larr; Ürünlere Dön
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Görsel Alanı */}
                <div className="relative h-[400px] md:h-[600px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden">
                    <Image
                        src={product.images?.[0] || "/images/2025-09-16.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Detay Alanı */}
                <div>
                    <div className="mb-6">
                        <span className="text-green-600 font-medium">{product.category || "Genel"}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
                        {product.code && (
                            <p className="text-sm text-zinc-500 mb-2">Ürün Kodu: {product.code}</p>
                        )}
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                            {product.price ? `₺${product.price.toLocaleString('tr-TR')}` : 'Fiyat Sorunuz'}
                        </p>
                    </div>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>{product.description}</p>
                    </div>

                    {/* Teknik Özellikler */}
                    {(product.material || product.coating || product.packaging) && (
                        <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <h3 className="font-semibold mb-3">Teknik Özellikler</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {product.material && (
                                    <div><span className="text-zinc-500">Malzeme:</span> {product.material}</div>
                                )}
                                {product.coating && (
                                    <div><span className="text-zinc-500">Kaplama:</span> {product.coating}</div>
                                )}
                                {product.packaging && (
                                    <div><span className="text-zinc-500">Paket:</span> {product.packaging}</div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {product.stock !== undefined && product.stock !== null && (
                            <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="font-medium">
                                    {product.stock > 0 ? `Stokta Var (${product.stock} adet)` : 'Stokta Yok'}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <a
                                href={`https://wa.me/905322183061?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum.`}
                                target="_blank"
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors"
                            >
                                <span>WhatsApp</span>
                            </a>
                            <a
                                href="tel:05322183061"
                                className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black font-bold py-4 rounded-xl transition-colors"
                            >
                                <span>0532 218 30 61</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
