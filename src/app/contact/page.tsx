import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center">İletişim</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* İletişim Bilgileri */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-semibold mb-6">Bize Ulaşın</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                            Sorularınız, önerileriniz veya işbirlikleri için bizimle iletişime geçmekten çekinmeyin.
                            Ekibimiz en kısa sürede size dönüş yapacaktır.
                        </p>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">Adres</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Doğa Mahallesi, Kampçılar Caddesi No: 12<br />
                                    Kadıköy / İstanbul
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">Telefon</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    +90 (212) 123 45 67
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">E-posta</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    info@cadirmarket.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* İletişim Formu */}
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-semibold mb-6">Mesaj Gönder</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Adınız Soyadınız</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="Adınız"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">E-posta Adresiniz</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Mesajınız</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="Mesajınızı buraya yazın..."
                                ></textarea>
                            </div>
                            <button
                                type="button"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
