import Image from 'next/image';
import manualImages from '@/content/manuals/images';

type ManualImageProps = {
  name: string;
  property: string;
  className?: string;
};

export default function ManualImage({ name, property, className }: ManualImageProps) {
  const image = manualImages[property]?.[name];

  if (!image) {
    console.warn(`ManualImage: no image found for property="${property}" name="${name}"`);
    return null;
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      className={className || 'w-full max-w-screen-sm'}
      width={500}
      height={500}
    />
  );
}
