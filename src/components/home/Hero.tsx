import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Arkaplan Görseli */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/2025-09-16.png"
                    alt="Kamp yapan insanlar"
                    fill
                    className="object-cover brightness-50"
                    priority
                />
            </div>

            {/* İçerik */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Her Mevsim Güvendesiniz
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Dayanıklı brandalar, profesyonel çadır sistemleri ve kapsül aksesuarlar ile çözümler sunuyoruz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
                    >
                        Ürünleri İncele
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                    >
                        Bize Ulaşın
                    </Link>
                </div>
            </div>
        </section>
    );
}
