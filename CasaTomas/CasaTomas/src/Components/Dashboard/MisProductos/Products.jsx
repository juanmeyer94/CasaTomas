import React, { useState, useEffect } from 'react';
import "./Products.styless.css"
import AdminCards from './AdminCards';
import { useSelector } from "react-redux"
import FullCardData from "../ChargeProducts/DataItemsCards/FullCardData";
import { getItemById } from '../../../redux/actions';

const Products = () => {
  const data = useSelector(state => state.items);

  const [filtered, setFiltered] = useState({ section: '', subsection: '' });
  const [filterActive, setFilterActive] = useState(false)
  const [activeData, setActiveData] = useState(data);
  const [fullCardData, setFullCardData] = useState(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullCardOpen, setIsFullCardOpen] = useState(false);

  const openFullCard = async (id) => {
    try {
      const response = await getItemById(id);
      setFullCardData(response.data);
      setIsFullCardOpen(true);
      console.log(`Abriendo información para la card con ID: ${id}`);
    } catch (error) {
      console.error('Error al obtener la información de la tarjeta completa:', error);
    }
  };

  const closeFullCard = () => {
    setIsFullCardOpen(false);
  };



  const handleChange = (value) => {
    setFiltered(prevState => ({ ...prevState, section: value }));
    setFilterActive(true);
    setActiveData(prevActiveData => (filterActive ? filteredData : prevActiveData));
  };


  const filteredData = data.filter(item => {
    const matchesSection = !filtered.section || item.section.toLowerCase() === filtered.section.toLowerCase();
    const matchesSubsection = !filtered.subsection || item.subsection.toLowerCase() === filtered.subsection.toLowerCase();

    return matchesSection && matchesSubsection;
  });

  const currentItems = filterActive
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    setFiltered({ section: '', subsection: '' });
    setFilterActive(false);
    setCurrentPage(1);
  };



  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className='w-auto h-auto min-h-screen  bg-black py-4'>
      <div className="container-products w-full">
        <div className="upper-products font-extrabold">NUESTROS PRODUCTOS</div>
        <div className="lower-products font-extrabold bg-black">NUESTROS PRODUCTOS</div>
        <div className="inside-products font-extrabold">CASA TOMAS</div>
      </div>
      {/* */}
      <div className='flex flex-col items-center justify-center my-8 mx-4 sm:flex-row '>


        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 p-2 bg-white rounded-xl shadow-lg">
          <div className="flex bg-gray-100 p-4 w-full sm:w-72 space-x-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input className="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." />
          </div>


          <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
            <span>All categorie</span>

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="bg-indigo-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
            <span>Search</span>
          </div>
        </div>



        <div className='mx-4 mt-4 sm:mx-20'>
          <a href="#_" className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50 mx-4"
            name="section"
            value="Maquina"
            onClick={() => handleChange("Maquina")}>
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">Máquinas</span>
          </a>
          <a href="#_" className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50 mx-4"
            name="section"
            value="Merceria"
            onClick={() => handleChange("Merceria")}
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">Mercería</span>
          </a>
          {filterActive ? <a href="#_" className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50 mx-4"
            name="section"
            value="Merceria"
            onClick={handleResetFilters}
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">Reiniciar filtros</span>
          </a> : null}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-5 xs:ml-12 lg:ml-72'>

        {currentItems.map((item, index) => (
          <AdminCards
            key={item.id ? item.id : item._id}
            id={item.id ? item.id : item._id}
            photo={item.data.items[0].photo}
            price={item.data.items[0].price}
            name={item.data.items[0].name}
            marca={item.data.items[0].marca}
            description={item.data.items[0].description}
            specsTecs={item.data.items[0].specsTecs}
            summary={item.data.items[0].summary}
            openFullCard={() => openFullCard(item.id ? item.id : item._id)}
          />
        ))}

      </div>
      <div className="flex items-center justify-center mt-4">

        {Array.from({ length: Math.ceil((filterActive ? filteredData.length : data.length) / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-2 border ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} rounded-full`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div >
        {isFullCardOpen && <FullCardData closeFullCard={closeFullCard} FullCardData={fullCardData} />}
      </div>

    </div>
  );
};

export default Products;