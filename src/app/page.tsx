import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { client } from "@/sanity/lib/client";
import { HOME_PRODUCTS_WITH_CATEGORIES_QUERY } from "@/sanity/lib/queries";

export const revalidate = 10; // Revalidate every 10 seconds

export default async function Home() {
  let categories: any[] = [];
  let products: any[] = [];

  try {
    const data = await client.fetch(HOME_PRODUCTS_WITH_CATEGORIES_QUERY);
    categories = data?.categories || [];
    products = data?.products || [];
  } catch (error) {
    console.error("Sanity bağlantı hatası:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <FeaturedProducts categories={categories} products={products} />

      <section className="bg-zinc-100 dark:bg-zinc-900 py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Neden ÇadırMarket?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Yüksek Dayanıklılık</h3>
              <p className="text-zinc-500">Endüstriyel standartlarda, her türlü hava koşuluna dayanıklı malzeme.</p>
            </div>
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Hızlı & Güvenli Kargo</h3>
              <p className="text-zinc-500">Siparişleriniz özenle paketlenir ve en kısa sürede adresinize ulaştırılır.</p>
            </div>
            <div className="p-6 bg-white dark:bg-black rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📏</div>
              <h3 className="text-xl font-semibold mb-2">Özel Çözümler</h3>
              <p className="text-zinc-500">İhtiyacınıza özel ölçülerde branda ve çadır sistemleri.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
