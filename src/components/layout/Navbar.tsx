import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Çadır<span className="text-green-600">Market</span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
                    <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">Ürünler</Link>
                    <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">Hakkımızda</Link>
                    <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">İletişim</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="md:hidden p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
