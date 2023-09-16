import React, { useState,useEffect } from 'react';
import { slides } from '../data/data';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Carousel = () => {
  const [currIndex, setCurrIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currIndex - 1 + slides.length) % slides.length;
    setCurrIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currIndex + 1) % slides.length;
    setCurrIndex(newIndex);
  };
  useEffect(() => {
    const autoplayInterval = setInterval(nextSlide, 5000); 

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [currIndex]);


  return (
    <div className='max-w-[1440px] h-[780px] w-full m-auto py-16 px-4 relative top-10 z-1'>
      {slides[currIndex].type === 'image' ? (
        <div
          style={{ backgroundImage: `url(${slides[currIndex].src})` }}
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        ></div>
      ) : (
        <video className='w-full h-full rounded-2xl' autoPlay loop muted>
          <source src={slides[currIndex].src} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )}

      <div className='absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>
      <div className='absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight size={30} onClick={nextSlide} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrIndex(slideIndex)}
            className={`text-2xl cursor-pointer ${
              currIndex === slideIndex ? 'text-blue-500' : ''
            }`}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
