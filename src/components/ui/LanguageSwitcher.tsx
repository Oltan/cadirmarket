"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = () => {
        const next = locale === 'tr' ? 'en' : 'tr';
        router.replace(pathname, { locale: next });
    };

    return (
        <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-700"
            aria-label="Switch language"
        >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale === 'tr' ? 'EN' : 'TR'}</span>
        </button>
    );
}
