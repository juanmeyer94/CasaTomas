import React, { useState, useEffect } from 'react';

const OfferCarousel = ({ items, renderItem, itemsPerPageLarge = 5, itemsPerPageSmall = 1 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
  const totalItems = items.length;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const itemsPerPage = isSmallScreen ? itemsPerPageSmall : itemsPerPageLarge;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const visibleItems = items.slice(startIdx, endIdx);

  return (
    <div>
      <div className="relative overflow-hidden  ">
        <div className={`flex justify-center transition-transform duration-300 ease-in-out ${isSmallScreen ? 'w-full' : 'w-full'}`}>
          {visibleItems.map((item, index) => (
            <div key={index} className={`flex-shrink-0 space-y-3 w-full ${isSmallScreen ? 'md:w-full' : 'md:w-1/5 lg:w-1/6'} ${index < itemsPerPage - 1 && !isSmallScreen ? 'mr-4' : ''}`}>
              {renderItem(item)}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button onClick={handlePrev} className="text-black px-1 dark:text-white text-2xl focus:outline-none">
            ❮
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button onClick={handleNext} className="text-black px-1 dark:text-white text-2xl focus:outline-none">
            ❯
          </button>
        </div>
      </div>
      <div className="text-center mt-4 mb-4">
        <span className="text-gray-500">{currentPage + 1} / {totalPages}</span>
      </div>
    </div>
  );
};

export default OfferCarousel;
