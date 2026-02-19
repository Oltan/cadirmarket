import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'privacy' });

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                        {t('lastUpdated')} {new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR')}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{t('introTitle')}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            {t('introText')}
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{t('dataTitle')}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            {t('dataText')}
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>{t('dataName')}</li>
                            <li>{t('dataEmail')}</li>
                            <li>{t('dataPhone')}</li>
                            <li>{t('dataAddress')}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{t('contactTitle')}</h2>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <p className="text-zinc-600 dark:text-zinc-400">
                                <strong>{t('addressLabel')}:</strong> Ostim, Ayyıldız Sanayi Sitesi, 1125/1 Sk. No: 24 06374 Yenimahalle/Ankara<br />
                                <strong>{t('phoneLabel')}:</strong> 0532 218 30 61<br />
                                <strong>{t('emailLabel')}:</strong> info@cadirmarket.com
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
