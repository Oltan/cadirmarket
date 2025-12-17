export default function Footer() {
    return (
        <footer className="border-t bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">ÇadırMarket</h3>
                        <p className="text-sm text-zinc-500">
                            Branda, çadır ve koruma sistemlerinde profesyonel çözümler.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Kategoriler</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li>Çadırlar</li>
                            <li>Branda Çeşitleri</li>
                            <li>Kapsül & Aksesuar</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Kurumsal</h4>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li>Hakkımızda</li>
                            <li>İletişim</li>
                            <li>Gizlilik Politikası</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
                    &copy; {new Date().getFullYear()} ÇadırMarket. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
}
