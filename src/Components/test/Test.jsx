import React, { useState, useEffect } from 'react';
import { carousel0, carousel1, carousel2 } from '../../assets/index';


const Test = () => {
  const images = [carousel0, carousel1, carousel2];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar a la siguiente imagen cada 3000 ms (3 segundos)
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div >
     
    

    </div>
  );
};

export default Test;

