import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { filterFilteredItems } from '../../redux/actions';

const SideBar = ({ showOffers, trueOffers, falseOffers, handleFilter }) => {
  const dispatch = useDispatch();
  const [executed, setExecuted] = useState(false);
  const [lastState, setLastState] = useState({ id: "", alt: "" });
  const work = useSelector((state) => state.filteredItems);

  const handleFilters = useCallback((id, alt) => {
    handleFilter({ section: id, subsection: alt });
    falseOffers();
    setExecuted(true);
    setLastState({ id, alt });
    console.log("dio click", id, alt, work);
  }, [handleFilter, falseOffers, work]);

  const handleClick = useCallback(() => {
    falseOffers();
  }, [falseOffers]);

  // double filter
  const clickDoubleFilter = (types) => {
    if (!executed) {
      dispatch(filterFilteredItems({ types }));
      console.log("dio click en", types);
      console.log(work);
    } else if (executed) {
      const { id, alt } = lastState;
      handleFilters(id, alt);
      dispatch(filterFilteredItems({ types }));
    }
  };


  return (
    <div className="w-5/12 2xl:w-56 xl:w-44 lg:flex-shrink-0 mb-3 md:flex-shrink-0 bg-blue-100 text-sky-600 dark:bg-gray-700 dark:text-white p-4 ">
      <div className="mb-4">
        <h2 className="text-xl text-center font-bold mb-2 md:text-2xl md:mb-1 xs:text-2xl border-t border-b border-solid border-sky-500">Máquinas de coser</h2>



        <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
          <h2 id="accordion-flush-heading-1">
            <button type="button" className="flex text-left px-3 rounded-md items-center justify-between w-full py-2 font-medium 2xl:text-xl text-md rtl:text-right text-gray-500 border-b border-solid border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="false" aria-controls="accordion-flush-body-1" onClick={() => handleFilters("Maquina", "Industrial")}>
              <span>Maquinas Industriales</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
            <div className="py-5 border-b text-center border-gray-200 dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Rectas")}>Rectas</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Overlock")}>Overlock</button>
                </li>
                {/* agregar otro acordion con los 3 tripos de overlord */}
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Collaretas")}>Collaretas</button>
                </li>

                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Recta y zig zag")}>Recta y zig zag</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Doble arrastre")}>Doble arrastre</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Triple arrastre")}>Triple arrastre</button>
                </li>
              </ul>
            </div>
          </div>
          <h2 id="accordion-flush-heading-2">
            <button type="button" className="flex text-left items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2" onClick={() => handleFilters("Maquina", "Familiar")}>
              <span>Maquinas Familiares</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-2" className="hidden" aria-labelledby="accordion-flush-heading-2">
            <div className="py-5 border-b text-center border-gray-200 dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Maquina de coser")}>Máquina de coser</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Collareta")}>Collareta</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Overlock")}>Overlock</button>
                </li>
                {/* agregar otro acordion con los 3 tripos de overlord */}

              </ul>
            </div>
          </div>
          <h2 id="accordion-flush-heading-3">
            <button type="button" className="flex text-left items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
              <span>Repuestos y reparaciones</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-3" className="hidden" aria-labelledby="accordion-flush-heading-3">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">Repuestos y reparaciones</p>

              <p className="mb-2 text-gray-500 dark:text-gray-400">Consultar por estos medios.</p>
              <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                <li><a href="https://www.facebook.com/casa.tomas.rafaela" className="text-blue-600 dark:text-blue-500 hover:underline">Facebook</a></li>
                <li><a href="https://www.instagram.com/casatomas.rafaela/?hl=es" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Instagram</a></li>
                <p>(03492) 422683</p>
              </ul>
            </div>
          </div>
          <br className='bg-cyan-200' />
          <h2 className="text-xl text-center font-bold mb-2 md:text-2xl md:mb-1 xs:text-2xl mt-4 border-t border-b border-solid border-sky-500">
            Mercería
          </h2>

          <h2 id="accordion-flush-heading-4">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-4" aria-expanded="false" aria-controls="accordion-flush-body-4" onClick={() => handleFilters("Merceria", "Hilos")}>
              <span>Hilos</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-4" className="hidden" aria-labelledby="accordion-flush-heading-4">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Hilos de bordar y de tejer")}>Hilos de bordar y de tejer</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Hilos de costura")}>Hilos de costura</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={handleClick}>Hilos para manualidades</button>
                </li>

              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-5">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-5" aria-expanded="false" aria-controls="accordion-flush-body-5"
              onClick={() => handleFilters("Merceria", "Puntillas")}>
              <span>Puntillas</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-5" className="hidden" aria-labelledby="accordion-flush-heading-5">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Puntillas de Nylon")}>Puntillas de Nylon</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Puntillas de Algodon")}>Puntillas de Algodon</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Puntillas de Lycra")}>Puntillas de Lycra</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Puntillas de Broderie")}>Puntillas de Broderie</button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-6">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-6" aria-expanded="false" aria-controls="accordion-flush-body-6"
              onClick={() => handleFilters("Merceria", "Agujas")}>
              <span>Agujas</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-6" className="hidden" aria-labelledby="accordion-flush-heading-6">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Agujas para Maquinas")}>Agujas para Máquinas</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Agujas de mano")}>Agujas de mano</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Agujas de lana")}>Agujas de Lana</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Agujas de tejer y crochet")}>Agujas de tejer y crochet</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Agujas varias y accesorios")}>Agujas varias y accesorios</button>
                </li>
              </ul>
            </div>
          </div>


          <h2 id="accordion-flush-heading-7">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-7" aria-expanded="false" aria-controls="accordion-flush-body-7"
              onClick={() => handleFilters("Merceria", "Apliques")}>
              <span>Apliques</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-7" className="hidden" aria-labelledby="accordion-flush-heading-7">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Apliques")}>Apliques</button>
                </li>

              </ul>
            </div>
          </div>


          <h2 id="accordion-flush-heading-8">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-8" aria-expanded="false" aria-controls="accordion-flush-body-8"
              onClick={() => handleFilters("Merceria", "Reparadores")}>
              <span>Reparadores</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-8" className="hidden" aria-labelledby="accordion-flush-heading-8">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Parches y reparadores")}>Parches y reparadores</button>
                </li>

              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-9">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-9" aria-expanded="false" aria-controls="accordion-flush-body-9"
              onClick={() => handleFilters("Merceria", "Elasticos")}>
              <span>Elásticos</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-9" className="hidden" aria-labelledby="accordion-flush-heading-9">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos de Algodon")}>Elásticos de Algodon</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos de Poliester")}>Elásticos de Poliester</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos Redondos")}>Elásticos Redondos</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos Afelpados")}>Elásticos Afelpados</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos Bretel")}>Elásticos Bretel</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos Quebrados")}>Elásticos Quebrados</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Elasticos Lenceria")}>Elásticos Lencería</button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-10">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md  2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-10" aria-expanded="false" aria-controls="accordion-flush-body-10"
              onClick={() => handleFilters("Merceria", "Tijeras")}>
              <span>Tijeras</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-10" className="hidden" aria-labelledby="accordion-flush-heading-10">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Tijeras")}>Tijeras</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Herramientas")}>Herramientas</button>
                </li>
              </ul>
            </div>
          </div>


          <h2 id="accordion-flush-heading-11">
            <button type="button" className="flex text-left items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-11" aria-expanded="false" aria-controls="accordion-flush-body-11"
              onClick={() => handleFilters("Merceria", "Lubricantes y pegamentos")}>
              <span>Lubricantes y pegamentos</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-11" className="hidden" aria-labelledby="accordion-flush-heading-11">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Lubricantes")}>Lubricantes</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Pegamentos")}>Pegamento</button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-12">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-12" aria-expanded="false" aria-controls="accordion-flush-body-12"
              onClick={() => handleFilters("Merceria", "Cintas")}>
              <span>Cintas</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-12" className="hidden" aria-labelledby="accordion-flush-heading-12">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cinta de Raso")}>Cinta de Raso</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cinta Gross")}>Cinta Gross</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cinta Bies")}>Cinta Bies</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cinta Mochilera")}>Cinta Mochilera</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cinta Fantasia")}>Cinta Fantasía</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cinta Hilera")}>Cinta Hilera</button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-13">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-13" aria-expanded="false" aria-controls="accordion-flush-body-13"
              onClick={() => handleFilters("Merceria", "Cierres")}>
              <span>Cierres</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-13" className="hidden" aria-labelledby="accordion-flush-heading-13">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre Comun Fijo")}>Cierre Común Fijo</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre Reforzado Desmontable")}>Cierre Reforzado Desmontable</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy' onClick={() => clickDoubleFilter("Cierre D. de Perro")}>Cierre D. de Perro</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre de Aluminio y Empavonado")}>Cierre de Aluminio y Empavonado</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre Invisible")}>Cierre Inivisible</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre Reforzado Fijo")}>Cierre Reforzado Fijo</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre Perrito")}>Cierre Perrito</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cierre por Metro  y Desilzadores")}>Cierre por Metro y Deslizadores</button>
                </li>
              </ul>
            </div>
          </div>

          <h2 id="accordion-flush-heading-14">
            <button type="button" className="flex items-center justify-between w-full py-2 px-3 rounded-md 2xl:text-xl text-md rtl:text-right text-xl text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-14" aria-expanded="false" aria-controls="accordion-flush-body-14"
              onClick={() => handleFilters("Merceria", "Cordones")}>
              <span>Cordones</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-flush-body-14" className="hidden" aria-labelledby="accordion-flush-heading-14">
            <div className="py-5 border-b border-gray-200 text-center dark:border-gray-700">
              <ul className="pl-4 text-sm md:text-base">
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cordon de Zapato")}>Cordón de Zapato</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cordon de Zapatilla")}>Cordón de Zapatilla</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cordon de Borcego")}>Cordón de Borcego</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cordon Polipropireno")}>Cordón Polipropireno</button>
                </li>
                <li className="mb-1">
                  <button className='hover:underline hover:text-sky-400 hover:decoration-wavy 2xl:text-xl text-sm' onClick={() => clickDoubleFilter("Cordon de raso")}>Cordón de Raso</button>
                </li>

              </ul>
            </div>
          </div>
        </div>




      </div>

    </div>
  );
};

export default SideBar;
