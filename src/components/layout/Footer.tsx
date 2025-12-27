import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Phone } from "lucide-react";

interface Category {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
}

export default async function Footer() {
    const categories = await client.fetch<Category[]>(CATEGORIES_QUERY, {}, { next: { revalidate: 10 } });

    return (
        <footer className="border-t bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">ÇadırMarket</h3>
                        <p className="text-sm text-zinc-500">
                            Branda, çadır ve koruma sistemlerinde profesyonel çözümler.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Kategoriler</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            {categories.map((category) => (
                                <li key={category._id}>
                                    <Link
                                        href={`/products?category=${category.slug.current}`}
                                        className="hover:text-green-600 transition-colors"
                                    >
                                        {category.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Kurumsal</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li>
                                <Link href="/about" className="hover:text-green-600 transition-colors">
                                    Hakkımızda
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
                    <div>
                        <h4 className="font-semibold mb-4">İletişim</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li>
                                <a
                                    href="tel:05322183061"
                                    className="hover:text-green-600 transition-colors flex items-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    0532 218 30 61
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/905322183061"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-600 transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                            <li className="pt-2">
                                <p className="text-xs">
                                    Ostim, Ayyıldız Sanayi Sitesi, 1125/1 Sk. No: 24 06374 Yenimahalle/Ankara
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
                    &copy; {new Date().getFullYear()} ÇadırMarket. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
}
