export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>

                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                        Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Giriş</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            ÇadırMarket olarak, müşterilerimizin gizliliğine önem veriyoruz. Bu gizlilik politikası,
                            kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Toplanan Bilgiler</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda aşağıdaki bilgileri toplayabiliriz:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>İsim ve iletişim bilgileri</li>
                            <li>E-posta adresi</li>
                            <li>Telefon numarası</li>
                            <li>Teslimat adresi</li>
                            <li>Ödeme bilgileri</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Bilgilerin Kullanımı</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Topladığımız bilgileri aşağıdaki amaçlarla kullanıyoruz:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Siparişlerinizi işlemek ve teslimat yapmak</li>
                            <li>Müşteri hizmetleri sağlamak</li>
                            <li>Ürün ve hizmetlerimizi geliştirmek</li>
                            <li>İletişim kurmak ve bilgilendirmek</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Bilgi Güvenliği</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Kişisel bilgilerinizin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemleri alıyoruz.
                            Verileriniz şifreleme ve güvenli sunucularda saklanmaktadır.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Üçüncü Taraflarla Paylaşım</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Kişisel bilgilerinizi, yasal gereklilikler dışında üçüncü taraflarla paylaşmıyoruz.
                            Hizmet sağlayıcılarımız (kargo şirketleri, ödeme işlemcileri) sadece işlemlerinizi
                            gerçekleştirmek için gerekli bilgilere erişebilir.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Çerezler</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
                            Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Haklarınız</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            KVKK kapsamında aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-400 space-y-2">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>Kişisel verilerinize erişim talep etme</li>
                            <li>Kişisel verilerinizin düzeltilmesini isteme</li>
                            <li>Kişisel verilerinizin silinmesini talep etme</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. İletişim</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                        </p>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                            <p className="text-zinc-600 dark:text-zinc-400">
                                <strong>Adres:</strong> Ostim, Ayyıldız Sanayi Sitesi, 1125/1 Sk. No: 24 06374 Yenimahalle/Ankara<br />
                                <strong>Telefon:</strong> 0532 218 30 61<br />
                                <strong>E-posta:</strong> info@cadirmarket.org
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Değişiklikler</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
                            olduğunda sizi bilgilendireceğiz.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
