import { client } from "@/sanity/lib/client";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
                        src={product.images?.[0] || "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop"}
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
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                            ₺{product.price?.toLocaleString('tr-TR')}
                        </p>
                    </div>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>{product.description}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="font-medium">
                                {product.stock > 0 ? `Stokta Var (${product.stock} adet)` : 'Stokta Yok'}
                            </span>
                        </div>

                        <a
                            href={`https://wa.me/905555555555?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum.`}
                            target="_blank"
                            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-4 rounded-xl transition-colors"
                        >
                            WhatsApp ile Bilgi Al
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
