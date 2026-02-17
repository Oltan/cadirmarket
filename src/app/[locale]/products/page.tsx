import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import CategoryFilter from "@/components/ui/CategoryFilter";
import { client } from "@/sanity/lib/client";
import {
    PRODUCTS_PAGINATED_QUERY,
    PRODUCTS_BY_CATEGORY_PAGINATED_QUERY,
    PRODUCTS_COUNT_QUERY,
    PRODUCTS_BY_CATEGORY_COUNT_QUERY,
    CATEGORIES_QUERY
} from "@/sanity/lib/queries";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";

export const revalidate = 10;

const PRODUCTS_PER_PAGE = 12;

interface Product {
    _id: string;
    name: string;
    slug?: { current: string };
    price?: number | null;
    imageUrl?: string;
    category?: string;
}

interface ProductsPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ category?: string; page?: string }>;
}

export async function generateMetadata({ params, searchParams }: ProductsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const sp = await searchParams;
    const currentPage = parseInt(sp.page || "1");
    const category = sp.category;

    let title = locale === 'en' ? "All Products" : "Tüm Ürünler";
    let description = locale === 'en'
        ? "Browse our wide product range at Çadır Market."
        : "Çadır Market'te geniş ürün yelpazemizi keşfedin.";

    if (currentPage > 1) title += locale === 'en' ? ` - Page ${currentPage}` : ` - Sayfa ${currentPage}`;

    return { title, description };
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
    const { locale } = await params;
    const sp = await searchParams;
    const t = await getTranslations({ locale, namespace: 'products' });
    const selectedCategory = sp.category;
    const currentPage = Math.max(1, parseInt(sp.page || "1"));

    let products: Product[] = [];
    let categories = [];
    let totalProducts = 0;

    try {
        categories = await client.fetch(CATEGORIES_QUERY);
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        if (selectedCategory) {
            [products, totalProducts] = await Promise.all([
                client.fetch(PRODUCTS_BY_CATEGORY_PAGINATED_QUERY, { categorySlug: selectedCategory, start, end }),
                client.fetch(PRODUCTS_BY_CATEGORY_COUNT_QUERY, { categorySlug: selectedCategory })
            ]);
        } else {
            [products, totalProducts] = await Promise.all([
                client.fetch(PRODUCTS_PAGINATED_QUERY, { start, end }),
                client.fetch(PRODUCTS_COUNT_QUERY)
            ]);
        }
    } catch (error) {
        console.error("Sanity bağlantı hatası:", error);
    }

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

            <CategoryFilter categories={categories} selectedCategory={selectedCategory} />

            {totalProducts > 0 && (
                <div className="mb-6 text-zinc-600 dark:text-zinc-400">
                    {t('found', { count: totalProducts })}
                    {totalPages > 1 && ` - ${t('page', { current: currentPage, total: totalPages })}`}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product.slug?.current || product._id}
                            name={product.name}
                            price={product.price}
                            image={product.imageUrl || "/images/2025-09-16.png"}
                            category={product.category || 'Genel'}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                        <p className="text-zinc-500 mb-4">
                            {selectedCategory ? t('noCategoryProducts') : t('noProducts')}
                        </p>
                    </div>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/products"
                category={selectedCategory}
            />
        </div>
    );
}
