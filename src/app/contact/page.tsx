"use client";

import { Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<null | { success: boolean; message: string }>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setResult(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Add Web3Forms Access Key
        formData.append("access_key", "262d23e7-373b-4986-8073-b9c2a20bae0b");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult({ success: true, message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız." });
                form.reset();
            } else {
                setResult({ success: false, message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya WhatsApp üzerinden bize ulaşın." });
            }
        } catch (error) {
            setResult({ success: false, message: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin." });
        } finally {
            setIsSubmitting(false);
        }
    }

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
                                    Ostim, Ayyıldız Sanayi Sitesi, 1125/1 Sk. No: 24<br />
                                    06374 Yenimahalle/Ankara
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-lg">Telefon</h3>
                                <p className="text-xs text-zinc-400 mt-1">Dükkan</p>
                                <a href="tel:03123855814" className="text-zinc-600 dark:text-zinc-400 hover:text-green-600 transition-colors">
                                    0312 385 58 14
                                </a>
                                <p className="text-xs text-zinc-400 mt-2">Murat Demirel</p>
                                <a href="tel:05322183061" className="text-zinc-600 dark:text-zinc-400 hover:text-green-600 transition-colors">
                                    0532 218 30 61
                                </a>
                                <br />
                                <a
                                    href="https://wa.me/905322183061"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-green-600 hover:text-green-700 transition-colors"
                                >
                                    WhatsApp ile iletişime geç
                                </a>
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

                        {result && (
                            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${result.success ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'}`}>
                                {result.success ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                                <p>{result.message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Spam Koruması (Honeypot) */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Adınız Soyadınız</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="Adınız"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">E-posta Adresiniz</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">Mesajınız</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                    placeholder="Mesajınızı buraya yazın..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    'Gönder'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Harita */}
                <div className="mt-12 w-full h-[400px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.6778429272013!2d32.758618500000004!3d39.970954899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3497de7cb0f5d%3A0xdb8b0d7ae41676c8!2zw4dhZMSxciBNYXJrZXQ!5e0!3m2!1str!2str!4v1766315574435!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
