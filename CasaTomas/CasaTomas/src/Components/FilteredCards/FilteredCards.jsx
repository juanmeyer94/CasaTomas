import React, { useState } from "react";
import Card from "../Card/Card";

const FilteredCards = ({ filteredData }) => {
  const cardsPerPageLarge = 15;
  const cardsPerPageSmall = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage =
    window.innerWidth >= 768 ? cardsPerPageLarge : cardsPerPageSmall;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-3 gap-4 px-4 py-4">
        {currentCards.map((item, index) => (
          <Card
            key={item.id}
            photo={item.data.items[0].photo}
            price={item.data.items[0].price}
            name={item.data.items[0].name}
            description={item.data.items[0].description}
            specsTecs={item.data.items[0].specsTecs}
            className={`col-start-${(index % 5) + 1} row-start-${Math.floor(
              index / 5
            ) + 1}`}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 mb-6">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index + 1}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === index + 1
                    ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                currentPage < totalPages &&
                handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilteredCards;

