import ProductCard from "@/components/ui/ProductCard";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 10; // Revalidate every 10 seconds

export default async function ProductsPage() {
    const products = await client.fetch(PRODUCTS_QUERY);

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Tüm Ürünler</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.map((product: any) => (
                        <ProductCard
                            key={product._id}
                            id={product.slug?.current}
                            name={product.name}
                            price={product.price}
                            image={product.imageUrl || "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop"}
                            category={product.category || "Genel"}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                        <p className="text-zinc-500 mb-4">Henüz ürün eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
