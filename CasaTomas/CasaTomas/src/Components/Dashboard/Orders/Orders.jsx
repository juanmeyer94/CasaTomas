import { useState, useEffect, useRef } from "react";
import OrderModal from "./OrderModal"
import { format, compareDesc, isSameSecond } from 'date-fns';
import { useAuth } from "../Context/AdminContext";
import { Dropdown } from "flowbite-react";


const Orders = ({ orders }) => {
    const { orderById, updateStatus, ordersBdd, deleteOrderGeneral } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState(null)
    const [status, setStatus] = useState(null);
    const [updatedOrders, setUpdatedOrders] = useState([]);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Todos");




    const openModal = async (id) => {
        try {
            const response = await orderById(id);
            setOrderData(response.data)
            setIsModalOpen(true)
        } catch (error) {
            console.error('Error al obtener la información de la orden completa:', error);
        }
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const handleStatus = async (id, status) => {
        try {
            if (status === "Eliminar") {
                await deleteOrderGeneral(id);
            } else {
                await updateStatus(id, status);
                setSelectedStatus(status);  
            }
        } catch (error) {
            console.error("Error al cambiar el estado de la orden: ", error);
        }
    };

    const filterOrdersByStatus = (status) => {
        if (status === "Todos") {
            return orders.filter(order => !order.deleted);
        } else {
            return orders.filter(order => order.status === status && !order.deleted);
        }
    };
    

    const filteredOrders = filterOrdersByStatus(selectedStatus);

    const sortedOrders = [...filteredOrders].sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
    );
    
    const noDouble = useRef(false)

    useEffect(() => {
        if (noDouble.current === false) {
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
        <div className="xl:pl-64">
            <h1 className=" text-center text-5xl bg-sky-400 text-gray-100 font-semibold py-4 px-4 mb-4 mt-2">CASA TOMAS</h1>
            <h1 className="text-center text-5xl bg-sky-400 text-gray-100 font-semibold ">PEDIDOS</h1>

            <div className="sm:px-6 w-full">

                <div className="px-4 md:px-10 py-2 md:py-7">
                    <div className="flex items-center justify-between">


                    </div>
                </div>
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" 
                            onClick={() => setSelectedStatus("Todos")}>
                                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                    <p>Todos</p>
                                </div>
                            </a>
                            <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" 
                            onClick={() => setSelectedStatus("Listo")}>
                                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                    <p>Listos</p>
                                </div>
                            </a>
                            <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" onClick={() => setSelectedStatus("pendiente")}>
                                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                    <p>Pendientes</p>
                                </div>
                            </a>
                        </div>

                    </div>
                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full xl:h-[500px] whitespace-nowrap">
                            <tbody>
                                {sortedOrders.map((order) => (
                                    <tr tabIndex="0" className="focus:outline-none  h-16 border border-gray-100 rounded " key={order._id}>
                                        <td>
                                            <div className="ml-5">
                                                <div className="bg-gray-200  rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                    <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                                    <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                                            <path d="M5 12l5 5l10 -10"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center pl-5">
                                                <p className="text-base font-medium leading-none text-gray-700 mr-2">{order.userEmail} {order.userName} <span></span>
                                                    {order.userLastName}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333" stroke="#3B82F6" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="pl-24">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <circle cx="7.50004" cy="7.49967" r="1.66667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></circle>
                                                </svg>
                                                <p className="text-sm leading-none text-gray-600 ml-2">{order.status}</p>
                                            </div>
                                        </td>
                                        <td className="pl-5">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M7.5 5H16.6667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M7.5 10H16.6667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M7.5 15H16.6667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M4.16669 5V5.00667" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M4.16669 10V10.0067" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M4.16669 15V15.0067" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <p className="text-sm leading-none text-gray-600 ml-2"> {format(new Date(order.createdAt), 'MM/dd/yyyy HH:mm')}</p>
                                            </div>
                                        </td>

                                        <td className="pl-5">
                                            {isSameSecond(new Date(order.createdAt), new Date(order.updatedAt)) ? (
                                                <p className="text-sm leading-none text-gray-600 ml-2 py-4 px-4 rounded-xl bg-red-300">NO REALIZADO</p>
                                            ) : (
                                                <div className="flex items-center">
                                                    <p className="text-sm leading-none text-gray-600 ml-2 bg-green-200 py-4 px-4 rounded-xl">
                                                        {format(new Date(updatedOrders.includes(order._id) ? order.updatedAt : order.createdAt), 'MM/dd/yyyy HH:mm')}
                                                    </p>
                                                </div>
                                            )}
                                        </td>

                                        <td className="pl-4">
                                            <button
                                                className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                                onClick={() => openModal(order._id)}
                                            >
                                                View
                                            </button>

                                        </td>
                                        <td>
                                            <div className="relative px-5 pt-2">
                                                <Dropdown label="..." dismissOnClick={false}>
                                                    <Dropdown.Item value={"En Progreso"} onClick={() => handleStatus(order._id, "En Proceso")}>En progreso</Dropdown.Item>
                                                    <Dropdown.Item value={"Listo"} onClick={() => handleStatus(order._id, "Listo")}>Listo</Dropdown.Item>
                                                    <Dropdown.Item value={"Eliminar"} onClick={() => handleStatus(order._id, "Eliminar")}>Eliminar</Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                        </td>

                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    </div>
                    {isModalOpen && <OrderModal onClose={closeModal} order={orderData} />}
                </div>

            </div>


        </div>
    )
}

export default Orders;