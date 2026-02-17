import Image from "next/image";
import { getTranslations } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>

                <div className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="/images/2025-09-16.png"
                        alt="Kamp ateşi ve çadır"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <p>{t('story.text')}</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-black dark:text-white">{t('whyUs')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                            <h3 className="text-lg font-semibold mb-2">{t('experience')}</h3>
                            <p className="text-sm text-zinc-500">{t('experienceDesc')}</p>
                        </div>
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                            <h3 className="text-lg font-semibold mb-2">{t('quality')}</h3>
                            <p className="text-sm text-zinc-500">{t('qualityDesc')}</p>
                        </div>
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                            <h3 className="text-lg font-semibold mb-2">{t('service')}</h3>
                            <p className="text-sm text-zinc-500">{t('serviceDesc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
