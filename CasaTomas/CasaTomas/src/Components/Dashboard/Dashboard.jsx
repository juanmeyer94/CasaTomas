import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import ToggleThemeV2 from "../DarkMode/ToggleThemeV2";

import GeneralDashboard from "./generalDashboard";
import Products from "./MisProductos/Products";
import ChargeProducts from "./ChargeProducts/ChargeProducts";
import Orders from "./Orders/Orders";
import AdminUsers from "./AdminUsers";
import DatosGenerales from "./DatosGenerales";
import { useAuth } from "./Context/AdminContext";




const Dashboard = () => {
   const { logout, ordersBdd } = useAuth();
   const orders = useSelector((state) => state.orders)
  

   const countPendingOrders = () => {
      const pendingOrders = orders.filter(order => order.status === 'pendiente');
      return pendingOrders.length;
   };


   const [isDropdownVisible, setDropdownVisible] = useState(false);
   const [selectedComponent, setSelectedComponent] = useState('dashboard');

   const renderSelectedComponent = () => {
      switch (selectedComponent) {
         case 'dashboard':
            return <GeneralDashboard />;
         case 'products':
            return <Products />;
         case 'chargeProducts':
            return <ChargeProducts />;
         case 'Inbox':
            return <Orders orders={orders} />;
         case 'Users':
            return <AdminUsers />;
         case 'GeneralSettings':
            return <DatosGenerales />;
         default:
            return null;
      }
   };

   const handleComponentChange = (component) => {
      setSelectedComponent(component);
   };
   const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
   };

   const noDouble = useRef(false)

  useEffect(() => {
           if(noDouble.current === false){
            const fetchData = async () => {
              try {
           
                await ordersBdd();
              console.log("se obtuvieron las ordenes de la bdd")
             
              } catch (error) {
               
                console.error('Error al cargar las ordenes:', error);
              }
            };
        
            fetchData();
            return () => {
              noDouble.current = true
            }
           }
         }, [])
   return (
      <div>



         <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <ul className="space-y-2 font-medium">
                  {/*dashboard*/}
                  <li>
                     <a href="#" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${selectedComponent === 'dashboard' ? 'bg-gray-100 dark:bg-gray-700' : ''}`} onClick={() => handleComponentChange('dashboard')}>
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                           <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                           <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ms-3">Dashboard</span>
                     </a>
                  </li>
                  {/*e-commerce*/}
                  <li>
                     <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
                        onClick={toggleDropdown}>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                           <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                     </button>
                     <ul id="dropdown-example" className={`${isDropdownVisible ? 'block' : 'hidden'
                        } py-2 space-y-2`}>
                        <li>
                           <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              onClick={() => handleComponentChange('products')}>Mis Productos</a>
                        </li>
                        <li>
                           <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                              onClick={() => handleComponentChange('chargeProducts')}>Cargar Producto</a>
                        </li>

                     </ul>
                  </li>
                  {/*pinbox*/}
                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => handleComponentChange('Inbox')}>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Pedidos</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"> {countPendingOrders()}</span>
                     </a>
                  </li>
                  {/* users */}
                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => handleComponentChange('Users')}>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
                     </a>
                  </li>
                  {/*prudcts */}
                  <li>
                     <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => handleComponentChange('GeneralSettings')}>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Datos Generales</span>
                     </a>
                  </li>
                  {/*sing-out*/}
                  <li>

                     <a href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => logout()}>
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                     </a>
                  </li>
                  <ToggleThemeV2 />
               </ul>
            </div>
         </aside>
         {/*dashboard boxes*/}
         <div className="h-full w-full ">

            {renderSelectedComponent()}

         </div>

      </div>
   )
}

export default Dashboard;