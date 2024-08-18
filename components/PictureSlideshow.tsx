// TODO it looks like the extreme right side of pictures shows overlap of the next image in the carousel, fix that

import React from 'react';
import Slider from 'react-slick';
import Image, { StaticImageData } from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PictureSlideShowProps {
  images: StaticImageData[];
}

const PictureSlideshow: React.FC<PictureSlideShowProps> = ({ images }) => 
    {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          {/* <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" /> */}
          < Image
            src={image}
            alt={`Slide ${index + 1}`} 
            className="w-full h-auto" 
            />
        </div>
      ))}
    </Slider>
  );
};

export default PictureSlideshow;
