import { useState, useEffect,  } from 'react';
import Logo from '../../assets/LOGO.png';
import ToggleThemeV2 from '../DarkMode/ToggleThemeV2';
import {carritologo, whatsapplogo} from "../../assets/index"
import {useSelector, useDispatch} from "react-redux"
import Cart from "../Cart/Cart"

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const cart = useSelector((state) => state.cart)

  
    const handleOpenModal = () => {
      setIsModalOpen(true);
      console.log(cart)
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    useEffect(() => {
      const handleScroll = () => {
        
        const scrollY = window.scrollY;
        const showButtonThreshold = 50; 
  
        setShowFloatingButton(scrollY > showButtonThreshold);
      };
      
  
 
      window.addEventListener('scroll', handleScroll);
  
   
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div>
      <nav className="bg-blue-50 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto  p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8 lg:h-12 lg:w-20" alt="Casa Tomas Logo" />
            <span className="font-serif self-center text-2xl font-bold whitespace-nowrap text-blue-900 dark:text-white">
              CASA TOMAS
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse xl:ml-[300px]">
            <a
              href="tel:03492422683"
              className="text-sm text-gray-500 dark:text-white hover:underline"
            >
              (03492) 422683
            </a>
            <a href="/login" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
              Login
            </a>
           
           <div className='xs:pl-[100px]'> <ToggleThemeV2 /></div>
          </div>
        </div>
      </nav>
      <nav className="bg-sky-200 dark:bg-gray-700">
        <div className="max-w-screen-xl px-2 py-2 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-bold mt-0 space-x-8 rtl:space-x-reverse text-md ">
              <li>
                <a href="/" className="text-sky-700 dark:text-white hover:underline text-sm 2xl:text-xl " aria-current="page">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/aboutus" className="text-sky-700 dark:text-white hover:underline text-sm 2xl:text-xl">
                  Empresa
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sky-700 dark:text-white hover:underline text-sm 2xl:text-xl">
                  Contacto
                </a>
              </li>
              
              {!showFloatingButton && (
                    <div className="ml-auto -mt-1 -mb-3 z-40">
                    <button onClick={handleOpenModal} className="cursor-pointer xl:ml-[900px] bg-red-300 text-white p-1 rounded-full shadow-md ">
                      <img
                        src={carritologo}
                        alt="Carrito de compras"
                        className="h-7 w-7 2xl:h-10 2xl:w-10"
                      />
                    </button>
                  </div>
              )}
            </ul>
             
      {showFloatingButton && (
        <button
          onClick={handleOpenModal}
          className="fixed xl:bottom-16 xl:right-12 bottom-4 right-4 bg-red-300 text-white p-4 rounded-full shadow-md  z-40"
        >
          <img
            src={carritologo}
            alt="Carrito de compras"
            className="h-6 w-6 2xl:h-8 2xl:w-8"
          />
        </button>
      )}

{showFloatingButton && (
  <a
    href="https://wa.me/+5493492279892"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed xl:bottom-24 xl:right-12 bottom-12 right-4 bg-[#25d366] text-white p-2 rounded-full shadow-md z-40 my-10"
  >
    <img
      src={whatsapplogo}
      alt="WhatsApp"
      className="h-10 w-10 2xl:h-12 2xl:w-12"
    />
  </a>
)}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4">
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4">
           <Cart cart={cart} handleCloseModal={handleCloseModal}/>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
