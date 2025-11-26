import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
}

export function ServiceCard({
  title,
  category,
  image,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative h-[320px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide opacity-90">
            {category}
          </p>
          <h3 className="text-xl font-bold">{title}</h3>

          {/* Button */}
          <button className="mt-4 w-full rounded-full bg-white/20 backdrop-blur-sm py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/30 group-hover:bg-white/30">
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
