// PropertyCard.tsx
import { PropertyCardProps } from '../types/userTypes';
import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';

const PropertyCard: React.FC<PropertyCardProps> = ({ href, title, imageSrc, description, primaryBadgeHidden, secondaryBadgesHidden}) => {
  return (
    <Link href={href}>
        <div className="card card-compact bg-base-100 w-100 shadow-xl" data-theme="mybrand">
            <figure>
                <Image
                    src={imageSrc}
                    alt={title}
                    className='w-full h-full object-cover aspect-[4/3]'
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title lg:text-2xl">
                    {title}
                    <div className={`badge badge-primary ${primaryBadgeHidden ? 'hidden' : ''}`}>4 guests</div>
                </h2>
                <p className='lg:text-lg'>{description}</p>
                <p></p>
                <div className="card-actions justify-start">
                    <div className={`badge bg-base-200 ${secondaryBadgesHidden ? 'hidden' : ''}`}>2 bedrooms</div>
                    <div className={`badge bg-base-200 ${secondaryBadgesHidden ? 'hidden' : ''}`}>1 king bed</div>
                    <div className={`badge bg-base-200 ${secondaryBadgesHidden ? 'hidden' : ''}`}>2 twin beds</div>
                    <div className={`badge bg-base-200 ${secondaryBadgesHidden ? 'hidden' : ''}`}>1 bathroom</div>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default PropertyCard;
