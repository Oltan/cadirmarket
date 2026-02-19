import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_SEARCH_QUERY, PRODUCTS_SEARCH_COUNT_QUERY } from "@/sanity/lib/queries";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { Search } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";

interface Product {
    _id: string;
    name: string;
    title?: string;
    slug?: { current: string };
    price?: number | null;
    imageUrl: string;
    category: string;
}

const PRODUCTS_PER_PAGE = 12;

interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ params, searchParams }: SearchPageProps): Promise<Metadata> {
    const { locale } = await params;
    const sp = await searchParams;
    const searchTerm = sp.q || "";
    const isEn = locale === 'en';

    return {
        title: searchTerm
            ? `"${searchTerm}" ${isEn ? 'Search Results' : 'Arama Sonuçları'} - Çadır Market`
            : isEn ? "Search Products - Çadır Market" : "Ürün Ara - Çadır Market",
        description: searchTerm
            ? isEn ? `Search results for "${searchTerm}".` : `"${searchTerm}" için arama sonuçları.`
            : isEn ? "Search our products." : "Ürünlerimiz arasında arama yapın.",
    };
}

async function SearchResults({ params, searchParams }: SearchPageProps) {
    const { locale } = await params;
    const sp = await searchParams;
    const t = await getTranslations({ locale, namespace: 'products' });
    const searchTerm = sp.q || "";
    const currentPage = parseInt(sp.page || "1", 10);
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const isEn = locale === 'en';

    if (!searchTerm) {
        return (
            <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                <h2 className="text-2xl font-bold mb-2 dark:text-white">
                    {isEn ? 'Search Products' : 'Ürün Arayın'}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    {isEn ? 'Use the search bar above' : 'Arama yapmak için yukarıdaki arama çubuğunu kullanın'}
                </p>
            </div>
        );
    }

    const [products, totalProducts] = await Promise.all([
        client.fetch(PRODUCTS_SEARCH_QUERY, { searchTerm, start, end, locale }),
        client.fetch(PRODUCTS_SEARCH_COUNT_QUERY, { searchTerm }),
    ]);

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 dark:text-white">
                    {isEn ? 'Search Results: ' : 'Arama Sonuçları: '}&quot;{searchTerm}&quot;
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    {t('found', { count: totalProducts })}
                </p>
            </div>

            {products.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {products.map((product: Product) => (
                            <ProductCard
                                key={product._id}
                                id={product.slug?.current || product._id}
                                name={product.name || product.title || ''}
                                price={product.price}
                                image={product.imageUrl || '/images/2025-09-16.png'}
                                category={product.category}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/search" searchQuery={searchTerm} />
                    )}
                </>
            ) : (
                <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <Search className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
                    <h2 className="text-2xl font-bold mb-2 dark:text-white">
                        {isEn ? 'No Results Found' : 'Sonuç Bulunamadı'}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {isEn ? `No products found for "${searchTerm}"` : `"${searchTerm}" için hiçbir ürün bulunamadı`}
                    </p>
                </div>
            )}
        </div>
    );
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
    const { locale } = await params;
    const isEn = locale === 'en';

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                        {isEn ? 'Searching...' : 'Aranıyor...'}
                    </p>
                </div>
            }>
                <SearchResults params={params} searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

export const revalidate = 10;
