import React, { useState, useEffect } from "react";
import { slides } from "../data/data";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";


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
    <div className="max-w-screen-xl mx-auto py-16 px-4 md:pt-10 flex flex-col md:flex-row relative top-20">

      <div className="w-full  flex flex-col items-center relative">
        {slides[currIndex].type === "image" ? (
          <div
            style={{ backgroundImage: `url(${slides[currIndex].src})`, backgroundSize: 'cover', width: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',overflow:"hidden" }}
            className="w-full h-96 md:h-80 lg:h-96 xl:h-[780px] rounded-lg bg-center bg-cover duration-500 mb-6 md:mb-0"
          >


          </div>
        ) : (
          <video className="w-full h-96 md:h-80 lg:h-96 xl:h-[780px] rounded-2xl mb-6 md:mb-0" autoPlay loop muted>
            <source src={slides[currIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="absolute top-1/2 -translate-x-0 transform -translate-y-1/2 left-5 md:left-10 text-white cursor-pointer">
          <BsChevronCompactLeft size={30} onClick={prevSlide} />
        </div>
        <div className="absolute top-1/2 -translate-x-0 transform -translate-y-1/2 right-5 md:right-10 text-white cursor-pointer">
          <BsChevronCompactRight size={30} onClick={nextSlide} />
        </div>
        <div className="flex justify-center mt-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => setCurrIndex(slideIndex)}
              className={`text-2xl cursor-pointer mx-1 ${currIndex === slideIndex ? "text-blue-500" : "text-gray-500"}`}
            >
              •
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
