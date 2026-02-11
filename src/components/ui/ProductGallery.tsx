"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const fallback = "/images/2025-09-16.jpg";
    const displayImages = images.length > 0 ? images : [fallback];

    const goToPrev = useCallback(() => {
        setSelectedIndex((prev) =>
            prev === 0 ? displayImages.length - 1 : prev - 1
        );
    }, [displayImages.length]);

    const goToNext = useCallback(() => {
        setSelectedIndex((prev) =>
            prev === displayImages.length - 1 ? 0 : prev + 1
        );
    }, [displayImages.length]);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goToPrev();
            if (e.key === "ArrowRight") goToNext();
        }

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

    // Touch/swipe handlers for lightbox
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToNext();
            else goToPrev();
        }
        touchStartX.current = null;
    };

    return (
        <div>
            {/* Main Image */}
            <div
                className="relative h-[400px] md:h-[600px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
            >
                <Image
                    src={displayImages[selectedIndex]}
                    alt={name}
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {displayImages.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                index === selectedIndex
                                    ? "border-green-600 ring-2 ring-green-600/30"
                                    : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                            }`}
                        >
                            <Image
                                src={src}
                                alt={`${name} - ${index + 1}`}
                                fill
                                className="object-contain"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
                        aria-label="Kapat"
                    >
                        <X size={32} />
                    </button>

                    {/* Image counter */}
                    {displayImages.length > 1 && (
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                            {selectedIndex + 1} / {displayImages.length}
                        </div>
                    )}

                    {/* Prev button */}
                    {displayImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrev();
                            }}
                            className="absolute left-2 md:left-6 z-10 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label="Önceki görsel"
                        >
                            <ChevronLeft size={40} />
                        </button>
                    )}

                    {/* Main lightbox image */}
                    <div
                        className="relative w-full h-full max-w-[90vw] max-h-[85vh] m-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={displayImages[selectedIndex]}
                            alt={`${name} - ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                        />
                    </div>

                    {/* Next button */}
                    {displayImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-2 md:right-6 z-10 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label="Sonraki görsel"
                        >
                            <ChevronRight size={40} />
                        </button>
                    )}

                    {/* Thumbnail strip in lightbox */}
                    {displayImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 pb-1">
                            {displayImages.map((src, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedIndex(index);
                                    }}
                                    className={`relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                                        index === selectedIndex
                                            ? "border-white ring-1 ring-white/40 opacity-100"
                                            : "border-transparent opacity-50 hover:opacity-80"
                                    }`}
                                >
                                    <Image
                                        src={src}
                                        alt={`${name} - ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
