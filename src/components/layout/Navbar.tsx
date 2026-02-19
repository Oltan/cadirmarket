'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Menu, Search, X } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Navbar() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const t = useTranslations('nav');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}` as any);
            setIsSearchOpen(false);
            setSearchTerm('');
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Cadır<span className="text-green-600">Market</span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">{t('home')}</Link>
                    <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">{t('products')}</Link>
                    <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">{t('about')}</Link>
                    <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">{t('contact')}</Link>
                </div>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <button onClick={toggleSearch} className="p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800 transition-colors" aria-label="Search">
                        <Search className="w-5 h-5" />
                    </button>
                    <button onClick={toggleMobileMenu} className="md:hidden p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle menu">
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden border-t dark:border-zinc-800 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <Link href="/" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2" onClick={closeMobileMenu}>{t('home')}</Link>
                        <Link href="/products" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2" onClick={closeMobileMenu}>{t('products')}</Link>
                        <Link href="/about" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2" onClick={closeMobileMenu}>{t('about')}</Link>
                        <Link href="/contact" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2" onClick={closeMobileMenu}>{t('contact')}</Link>
                    </div>
                </div>
            )}

            {isSearchOpen && (
                <div className="border-t dark:border-zinc-800 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 py-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('searchPlaceholder')} className="w-full px-4 py-2 pr-10 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600" autoFocus />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors" aria-label="Search">
                                <Search className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
}
