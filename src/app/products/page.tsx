import ProductCard from "@/components/ui/ProductCard";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY, CATEGORIES_QUERY, PRODUCTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export const revalidate = 10; // Revalidate every 10 seconds

interface ProductsPageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const selectedCategory = params.category;

    let products = [];
    let categories = [];

    try {
        categories = await client.fetch(CATEGORIES_QUERY);

        if (selectedCategory) {
            products = await client.fetch(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug: selectedCategory });
        } else {
            products = await client.fetch(PRODUCTS_QUERY);
        }
    } catch (error) {
        console.error("Sanity bağlantı hatası:", error);
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Tüm Ürünler</h1>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
                <Link
                    href="/products"
                    className={`px-5 py-2.5 rounded-full font-medium transition-all ${!selectedCategory
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                >
                    Tümü
                </Link>
                {categories.map((cat: any) => (
                    <Link
                        key={cat._id}
                        href={`/products?category=${cat.slug?.current}`}
                        className={`px-5 py-2.5 rounded-full font-medium transition-all ${selectedCategory === cat.slug?.current
                            ? "bg-green-600 text-white shadow-lg"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            }`}
                    >
                        {cat.title}
                    </Link>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <ProductCard
                            key={product._id}
                            id={product.slug?.current}
                            name={product.name}
                            price={product.price}
                            image={product.imageUrl || "/images/2025-09-16.jpg"}
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
        </div>
    );
}

