import Hero from "@/components/home/Hero";
import ProductCard from "@/components/ui/ProductCard";
import { client } from "@/sanity/lib/client";
import { FEATURED_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const revalidate = 10;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  let products = [];
  try {
    products = await client.fetch(FEATURED_PRODUCTS_QUERY, { locale });
  } catch (error) {
    console.error("Sanity bağlantı hatası:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">{t('featured')}</h2>
            <Link href="/products" className="text-green-600 font-medium hover:underline">
              Tümünü Gör &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  id={product.slug?.current}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl || "/images/2025-09-16.png"}
                  category={product.category || "Genel"}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                <p className="text-zinc-500 mb-4">Henüz ürün eklenmemiş.</p>
                <a href="/studio" target="_blank" className="text-green-600 font-medium hover:underline">
                  Yönetim Paneline Git ve Ürün Ekle &rarr;
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

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
