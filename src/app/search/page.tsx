import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_SEARCH_QUERY, PRODUCTS_SEARCH_COUNT_QUERY } from "@/sanity/lib/queries";
import ProductCard from "@/components/ui/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { Search } from "lucide-react";
import type { Metadata } from "next";

interface Product {
  _id: string;
  name: string;
  title?: string;
  price?: number | null;
  imageUrl: string;
  category: string;
}

const PRODUCTS_PER_PAGE = 12;

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchTerm = params.q || "";

  return {
    title: searchTerm ? `"${searchTerm}" Arama Sonuçları - Çadır Market` : "Ürün Ara - Çadır Market",
    description: searchTerm
      ? `"${searchTerm}" için arama sonuçları. Geniş ürün yelpazemizde aradığınızı bulun.`
      : "Ürünlerimiz arasında arama yapın.",
  };
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchTerm = params.q || "";
  const currentPage = parseInt(params.page || "1", 10);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;

  if (!searchTerm) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
        <h2 className="text-2xl font-bold mb-2 dark:text-white">Ürün Arayın</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Arama yapmak için yukarıdaki arama çubuğunu kullanın
        </p>
      </div>
    );
  }

  const [products, totalProducts] = await Promise.all([
    client.fetch(PRODUCTS_SEARCH_QUERY, {
      searchTerm,
      start,
      end
    }),
    client.fetch(PRODUCTS_SEARCH_COUNT_QUERY, { searchTerm }),
  ]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          Arama Sonuçları: &quot;{searchTerm}&quot;
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {totalProducts} ürün bulundu
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product: Product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name || product.title || ''}
                price={product.price}
                image={product.imageUrl || '/placeholder-product.jpg'}
                category={product.category}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl={`/search?q=${encodeURIComponent(searchTerm)}`}
            />
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <Search className="w-16 h-16 mx-auto mb-4 text-zinc-400" />
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Sonuç Bulunamadı</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            &quot;{searchTerm}&quot; için hiçbir ürün bulunamadı
          </p>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            Farklı anahtar kelimeler kullanarak tekrar deneyin
          </p>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Aranıyor...</p>
        </div>
      }>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export const revalidate = 10;
