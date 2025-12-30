'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

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
                    <button
                        onClick={toggleSearch}
                        className="p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 hover:bg-zinc-100 rounded-full dark:hover:bg-zinc-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t dark:border-zinc-800 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <Link
                            href="/"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Anasayfa
                        </Link>
                        <Link
                            href="/products"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Ürünler
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors py-2"
                            onClick={closeMobileMenu}
                        >
                            İletişim
                        </Link>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            {isSearchOpen && (
                <div className="border-t dark:border-zinc-800 bg-white dark:bg-black">
                    <div className="container mx-auto px-4 py-4">
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </nav>
    );
}
