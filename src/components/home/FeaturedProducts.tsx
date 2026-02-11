"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

interface Product {
    _id: string;
    name: string;
    title: string;
    slug: { current: string };
    price: number | null;
    imageUrl: string;
    category: string;
    categorySlug: string;
}

interface FeaturedProductsProps {
    categories: Category[];
    products: Product[];
}

const PRODUCTS_PER_PAGE = 8;

export default function FeaturedProducts({ categories, products }: FeaturedProductsProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Filter categories that actually have products
    const categoriesWithProducts = categories.filter((cat) =>
        products.some((p) => p.categorySlug === cat.slug?.current)
    );

    const filteredProducts = activeCategory
        ? products.filter((p) => p.categorySlug === activeCategory)
        : products;

    const displayProducts = filteredProducts.slice(0, PRODUCTS_PER_PAGE);

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">Ürünlerimiz</h2>
                    <a
                        href="/products"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Tümünü Gör &rarr;
                    </a>
                </div>

                {/* Category tabs */}
                {categoriesWithProducts.length > 0 && (
                    <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                activeCategory === null
                                    ? "bg-green-600 text-white shadow-md"
                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            }`}
                        >
                            Tümü
                        </button>
                        {categoriesWithProducts.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() =>
                                    setActiveCategory(cat.slug?.current || null)
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                    activeCategory === cat.slug?.current
                                        ? "bg-green-600 text-white shadow-md"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product.slug?.current}
                                name={product.name}
                                price={product.price}
                                image={
                                    product.imageUrl || "/images/2025-09-16.jpg"
                                }
                                category={product.category || "Genel"}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                            <p className="text-zinc-500">
                                Bu kategoride henüz ürün bulunmuyor.
                            </p>
                        </div>
                    )}
                </div>

                {/* Show "view all in category" link when filtered */}
                {activeCategory && filteredProducts.length > PRODUCTS_PER_PAGE && (
                    <div className="text-center mt-8">
                        <a
                            href={`/products?category=${activeCategory}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            Bu kategorideki tüm ürünleri gör ({filteredProducts.length})
                            <span>&rarr;</span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
