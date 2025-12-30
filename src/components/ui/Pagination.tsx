import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
    category?: string;
    searchQuery?: string;
}

export default function Pagination({ currentPage, totalPages, basePath, category, searchQuery }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageUrl = (page: number) => {
        const params = new URLSearchParams();

        if (searchQuery) {
            params.set('q', searchQuery);
        }
        if (category) {
            params.set('category', category);
        }
        params.set('page', page.toString());

        return `${basePath}?${params.toString()}`;
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page
        if (startPage > 1) {
            pages.push(
                <Link
                    key={1}
                    href={getPageUrl(1)}
                    className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                >
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis-start" className="px-2 text-zinc-500">
                        ...
                    </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link
                    key={i}
                    href={getPageUrl(i)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        i === currentPage
                            ? "bg-green-600 text-white shadow-lg"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                >
                    {i}
                </Link>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis-end" className="px-2 text-zinc-500">
                        ...
                    </span>
                );
            }
            pages.push(
                <Link
                    key={totalPages}
                    href={getPageUrl(totalPages)}
                    className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                >
                    {totalPages}
                </Link>
            );
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all font-medium"
                >
                    ← Önceki
                </Link>
            ) : (
                <span className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed font-medium">
                    ← Önceki
                </span>
            )}

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all font-medium"
                >
                    Sonraki →
                </Link>
            ) : (
                <span className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed font-medium">
                    Sonraki →
                </span>
            )}
        </div>
    );
}
