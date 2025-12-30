'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Category {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory?: string;
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
    const router = useRouter();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        router.push(category ? `/products?category=${category}` : '/products');
    };

    return (
        <div className="mb-10">
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">Kategoriler</h2>

            {/* Mobile Dropdown */}
            <div className="md:hidden">
                <select
                    value={selectedCategory || ""}
                    onChange={handleCategoryChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                    <option value="">Tüm Kategoriler</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.slug?.current}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop Pills */}
            <div className="hidden md:flex flex-wrap gap-2">
                <Link
                    href="/products"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!selectedCategory
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        }`}
                >
                    Tümü
                </Link>
                {categories.map((cat) => (
                    <Link
                        key={cat._id}
                        href={`/products?category=${cat.slug?.current}`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all truncate max-w-xs ${selectedCategory === cat.slug?.current
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            }`}
                        title={cat.title}
                    >
                        {cat.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
