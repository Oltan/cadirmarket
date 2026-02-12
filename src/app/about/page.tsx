import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Hakkımızda</h1>

                <div className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="/images/2025-09-16.png"
                        alt="Kamp ateşi ve çadır"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <p>
                        Merhaba! Biz <strong>ÇadırMarket</strong> olarak, hem endüstriyel hem de bireysel ihtiyaçlar için en dayanıklı çadır, branda çeşitleri sunuyoruz.
                        Her türlü hava koşuluna dayanıklı, uzun ömürlü ve kaliteli ürünlerimizle, üstün performans sağlıyoruz.
                    </p>

                    <p>
                        Firmamız, geniş ürün yelpazesiyle hizmet vermektedir.
                        Branda çeşitlerinden şeffaf kaplama sistemlerine, çadır kurulumlarından kapsül aksesuarlarına kadar her ihtiyaca uygun ürünler sunuyoruz.
                        Ürün gamımızla, sektörün bulunabilecek en yüksek kalitedeki ürünlerini sizlere ulaştırıyoruz.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">Misyonumuz</h2>
                    <p>
                        Bütün ihtiyaçlarınıza uygun piyasadaki en iyi ürünleri <strong>en düşük fiyatla</strong> sizlere ulaştırmak.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">Neden Biz?</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>1. Sınıf branda ve malzemeler</li>
                        <li>Uzun ömürlü ve garantili ürünler</li>
                        <li>Satış sonrası destek ve yedek parça (kapsül, halka vb.)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
