// PropertyCard.tsx
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import * as React from 'react';


interface PropertyCardProps {
  href: string;
  title: string;
  imageSrc: StaticImageData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ href, title, imageSrc }) => {
  return (
    <Link href={href}>
      <div className="bg-gray-200 p-4 aspect-ratio-4/3 rounded-xl">
        <div className="relative h-full rounded-xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            priority={true}
            width={500}
            height={500}
          />
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
