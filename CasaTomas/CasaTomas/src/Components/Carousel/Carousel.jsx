import React, { useState, useEffect } from 'react';
import {carousel0, carousel1, carousel2} from "../../assets/index"


const Carousel = () => {
    const images = [carousel0, carousel1, carousel2];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 overflow-hidden">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-[450px] object-fill" />
          </div>
        ))}
      </div>
      <div className="absolute flex justify-between items-center w-full top-1/2 transform -translate-y-1/2">
        <button onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length)} className="btn btn-circle">❮</button>
        <button onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)} className="btn btn-circle">❯</button>
      </div>
    </div>
  );
}

export default Carousel;