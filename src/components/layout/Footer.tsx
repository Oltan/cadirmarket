import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { MAIN_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Phone, MapPin } from "lucide-react";

interface Category {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    productCount: number;
}

export default async function Footer() {
    let categories: Category[] = [];

    try {
        categories = await client.fetch<Category[]>(MAIN_CATEGORIES_QUERY, {}, { next: { revalidate: 60 } });
    } catch (error) {
        console.error("Kategori yükleme hatası:", error);
    }

    return (
        <footer className="border-t bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            {/* Ana Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Hakkımızda */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">ÇadırMarket</h3>
                        <p className="text-sm text-zinc-500">
                            Branda, çadır ve endüstriyel koruma sistemlerinde 30 yılı aşkın tecrübemizle profesyonel çözümler sunuyoruz.
                        </p>
                    </div>

                    {/* Popüler Kategoriler */}
                    <div>
                        <h4 className="font-semibold mb-4">Popüler Kategoriler</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            {categories.slice(0, 6).map((category) => (
                                <li key={category._id}>
                                    <Link
                                        href={`/products?category=${category.slug.current}`}
                                        className="hover:text-green-600 transition-colors flex items-center justify-between"
                                    >
                                        <span>{category.title}</span>
                                        <span className="text-xs text-zinc-400">({category.productCount})</span>
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-2">
                                <Link
                                    href="/products"
                                    className="text-green-600 font-medium hover:underline"
                                >
                                    Tüm Kategoriler →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kurumsal */}
                    <div>
                        <h4 className="font-semibold mb-4">Kurumsal</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li>
                                <Link href="/about" className="hover:text-green-600 transition-colors">
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:text-green-600 transition-colors">
                                    Ürünlerimiz
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-green-600 transition-colors">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-green-600 transition-colors">
                                    Gizlilik Politikası
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div>
                        <h4 className="font-semibold mb-4">İletişim</h4>
                        <ul className="space-y-3 text-sm text-zinc-500">
                            <li>
                                <a
                                    href="tel:03123855814"
                                    className="hover:text-green-600 transition-colors flex items-center gap-2"
                                >
                                    <Phone className="w-4 h-4 flex-shrink-0" />
                                    <span>0312 385 58 14 <span className="text-xs text-zinc-400">(Dükkan)</span></span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:05322183061"
                                    className="hover:text-green-600 transition-colors flex items-center gap-2"
                                >
                                    <Phone className="w-4 h-4 flex-shrink-0" />
                                    <span>0532 218 30 61 <span className="text-xs text-zinc-400">(Murat Demirel)</span></span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/905322183061"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-600 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    <span>WhatsApp ile İletişim</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <address className="not-italic text-xs leading-relaxed">
                                    Ostim, Ayyıldız Sanayi Sitesi,<br />
                                    1125/1 Sk. No: 24<br />
                                    06374 Yenimahalle/Ankara
                                </address>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SEO için Kategori Linkleri (açılır/kapanır) */}
            <div className="border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-6">
                    <details className="group">
                        <summary className="text-xs text-zinc-400 cursor-pointer hover:text-zinc-600 list-none flex items-center gap-1">
                            <span>Tüm Ürün Kategorileri</span>
                            <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400" aria-label="Tüm kategoriler">
                            {categories.map((category, index) => (
                                <span key={category._id}>
                                    <Link
                                        href={`/products?category=${category.slug.current}`}
                                        className="hover:text-green-600 transition-colors"
                                    >
                                        {category.title}
                                    </Link>
                                    {index < categories.length - 1 && <span className="ml-4">•</span>}
                                </span>
                            ))}
                        </nav>
                    </details>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} ÇadırMarket. Tüm hakları saklıdır.</p>
                    <p>Gema Politek Yetkili Distribütörü</p>
                </div>
            </div>
        </footer>
    );
}
