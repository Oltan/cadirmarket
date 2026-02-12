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
import type { Metadata } from "next";

export const revalidate = 10; // Revalidate every 10 seconds

const PRODUCTS_PER_PAGE = 12;

interface Product {
    _id: string;
    name: string;
    slug?: {
        current: string;
    };
    price?: number | null;
    imageUrl?: string;
    category?: string;
}

interface ProductsPageProps {
    searchParams: Promise<{ category?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1");
    const category = params.category;

    let title = "Tüm Ürünler";
    let description = "Çadır Market'te geniş ürün yelpazemizi keşfedin. Kaliteli ve uygun fiyatlı ürünler.";

    if (category) {
        title = `${category} Kategorisi Ürünleri`;
        description = `${category} kategorisindeki ürünlerimize göz atın.`;
    }

    if (currentPage > 1) {
        title += ` - Sayfa ${currentPage}`;
        description += ` Sayfa ${currentPage}.`;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cadirmarket.com";
    const canonicalUrl = category
        ? `${baseUrl}/products?category=${category}${currentPage > 1 ? `&page=${currentPage}` : ""}`
        : `${baseUrl}/products${currentPage > 1 ? `?page=${currentPage}` : ""}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "website",
        },
        robots: {
            index: currentPage === 1, // Only index first page
            follow: true,
        },
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const selectedCategory = params.category;
    const currentPage = Math.max(1, parseInt(params.page || "1"));

    let products = [];
    let categories = [];
    let totalProducts = 0;

    try {
        categories = await client.fetch(CATEGORIES_QUERY);

        // Calculate pagination
        const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        if (selectedCategory) {
            // Fetch products and total count for category
            [products, totalProducts] = await Promise.all([
                client.fetch(PRODUCTS_BY_CATEGORY_PAGINATED_QUERY, {
                    categorySlug: selectedCategory,
                    start,
                    end
                }),
                client.fetch(PRODUCTS_BY_CATEGORY_COUNT_QUERY, { categorySlug: selectedCategory })
            ]);
        } else {
            // Fetch all products and total count
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
            <h1 className="text-4xl font-bold mb-8">Tüm Ürünler</h1>

            {/* Category Filter */}
            <CategoryFilter categories={categories} selectedCategory={selectedCategory} />

            {/* Products Count Info */}
            {totalProducts > 0 && (
                <div className="mb-6 text-zinc-600 dark:text-zinc-400">
                    {totalProducts} ürün bulundu
                    {totalPages > 1 && ` - Sayfa ${currentPage} / ${totalPages}`}
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <ProductCard
                            key={product._id}
                            id={product.slug?.current || product._id}
                            name={product.name}
                            price={product.price}
                            image={product.imageUrl || "/images/2025-09-16.png"}
                            category={product.category || "Genel"}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                        <p className="text-zinc-500 mb-4">
                            {selectedCategory ? "Bu kategoride ürün bulunamadı." : "Henüz ürün eklenmemiş."}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/products"
                category={selectedCategory}
            />
        </div>
    );
}

