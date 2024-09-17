import Image from "next/image";
import image from "@/app/landingpic.jpg";
import React from 'react'


const Hero = () => {
  return (
    <section className="max-w-screen-xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center lg:pl-4 text-center lg:text-left lg:items-start">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
                Feel at home in the PNW
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
                Find a stylish and comfortable short-term rental for your next Seattle adventure
            </p>
        </div>
        <div className="lg:w-full">
            <Image src={image}
                alt="Welcome to your home away from home"
                className="w-full"
                priority={true}
                width={500}
                height={500}
            />
        </div>
    </section>
  );
};

export default Hero;
