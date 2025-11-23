import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Hakkımızda</h1>

                <div className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="https://images.unsplash.com/photo-1496545672447-f699b503d270?q=80&w=2071&auto=format&fit=crop"
                        alt="Kamp ateşi ve çadır"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <p>
                        Merhaba! Biz <strong>ÇadırMarket</strong> olarak, doğa tutkunlarını en kaliteli kamp ekipmanlarıyla buluşturmak için yola çıktık.
                        Şehrin gürültüsünden uzaklaşıp doğanın kucağına atılmak isteyen herkesin güvenilir yol arkadaşı olmayı hedefliyoruz.
                    </p>

                    <p>
                        2025 yılında kurulan firmamız, sadece bir ürün kataloğu sunmakla kalmıyor, aynı zamanda kampçılık kültürünü yaygınlaştırmayı amaçlıyor.
                        Sitemizde gördüğünüz tüm ürünler, zorlu doğa koşullarında test edilmiş ve onaylanmış markalardan seçilmektedir.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">Misyonumuz</h2>
                    <p>
                        Doğayı seven, koruyan ve keşfeden bir topluluk oluşturmak. Her bütçeye uygun, dayanıklı ve konforlu ekipmanları sizlere sunarak
                        kamp deneyiminizi unutulmaz kılmak.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">Neden Biz?</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Doğa dostu ürün seçimi</li>
                        <li>Uzman ekibimizden tavsiyeler</li>
                        <li>Şeffaf ürün tanıtımları</li>
                        <li>Müşteri memnuniyeti odaklı yaklaşım</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
