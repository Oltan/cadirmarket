export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isEn = locale === 'en';

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}</h1>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                        {isEn ? 'Last updated: ' : 'Son güncelleme: '}
                        {new Date().toLocaleDateString(isEn ? 'en-US' : 'tr-TR')}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{isEn ? '1. Introduction' : '1. Giriş'}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            {isEn
                                ? 'As ÇadırMarket, we value our customers\' privacy. This privacy policy explains how your personal data is collected, used and protected.'
                                : 'ÇadırMarket olarak, müşterilerimizin gizliliğine önem veriyoruz. Bu gizlilik politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.'
                            }
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{isEn ? '2. Data We Collect' : '2. Toplanan Bilgiler'}</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            {isEn ? 'We may collect the following information:' : 'Web sitemizi ziyaret ettiğinizde aşağıdaki bilgileri toplayabiliriz:'}
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>{isEn ? 'Name and contact information' : 'İsim ve iletişim bilgileri'}</li>
                            <li>{isEn ? 'Email address' : 'E-posta adresi'}</li>
                            <li>{isEn ? 'Phone number' : 'Telefon numarası'}</li>
                            <li>{isEn ? 'Delivery address' : 'Teslimat adresi'}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{isEn ? '3. Contact' : '3. İletişim'}</h2>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <p className="text-zinc-600 dark:text-zinc-400">
                                <strong>{isEn ? 'Address' : 'Adres'}:</strong> Ostim, Ayyıldız Sanayi Sitesi, 1125/1 Sk. No: 24 06374 Yenimahalle/Ankara<br />
                                <strong>{isEn ? 'Phone' : 'Telefon'}:</strong> 0532 218 30 61<br />
                                <strong>E-posta:</strong> info@cadirmarket.com
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
