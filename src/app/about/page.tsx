import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Hakkımızda</h1>

                <div className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="/images/2025-09-16.jpg"
                        alt="Kamp ateşi ve çadır"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <p>
                        Merhaba! Biz <strong>ÇadırMarket</strong> olarak, hem endüstriyel hem de bireysel ihtiyaçlar için en dayanıklı çadır, branda ve kaplama sistemlerini sunuyoruz.
                        Her türlü hava koşuluna dayanıklı, uzun ömürlü ve kaliteli çözümlerimizle mekanlarınızı koruma altına alıyoruz.
                    </p>

                    <p>
                        2025 yılında kurulan firmamız, geniş ürün yelpazesiyle hizmet vermektedir.
                        Branda çeşitlerinden şeffaf kaplama sistemlerine, çadır kurulumlarından kapsül aksesuarlarına kadar her ihtiyaca profesyonel çözümler üretiyoruz.
                        Ürünlerimiz, sektörün en kaliteli malzemeleri kullanılarak, uzman ekibimizin titiz kontrollerinden geçmektedir.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">Misyonumuz</h2>
                    <p>
                        Güvenli ve korunaklı alanlar yaratmak. İş yerlerinden bahçelere, araç korumasından etkinlik alanlarına kadar her yer için en uygun
                        kaplama ve çadır çözümlerini sunarak hayatınızı kolaylaştırmak ve değerlerinizi korumak.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">Neden Biz?</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>1. Sınıf branda ve malzeme kalitesi</li>
                        <li>Özel ölçü ve proje bazlı üretim</li>
                        <li>Uzun ömürlü ve garantili ürünler</li>
                        <li>Satış sonrası destek ve yedek parça (kapsül, halka vb.)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
