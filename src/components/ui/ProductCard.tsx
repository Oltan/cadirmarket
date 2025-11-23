import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
    return (
        <Link href={`/products/${id}`} className="group">
            <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-lg hover:border-green-500/50">
                <div className="relative h-64 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                        {category}
                    </div>
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-zinc-900 dark:text-white">
                            ₺{price.toLocaleString('tr-TR')}
                        </span>
                        <span className="text-sm text-green-600 font-medium group-hover:underline">
                            İncele &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
