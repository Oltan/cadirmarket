"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
    images: string[];
    name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const fallback = "/images/2025-09-16.jpg";
    const displayImages = images.length > 0 ? images : [fallback];

    return (
        <div>
            <div className="relative h-[400px] md:h-[600px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden">
                <Image
                    src={displayImages[selectedIndex]}
                    alt={name}
                    fill
                    className="object-contain"
                    priority
                />
            </div>

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
        </div>
    );
}
