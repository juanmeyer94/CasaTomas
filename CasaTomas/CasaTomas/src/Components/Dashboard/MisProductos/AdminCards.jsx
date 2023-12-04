import DeleteButton from "./DeleteButton";
import { useAuth } from "../Context/AdminContext"
import EditButton from "./EditButton";

import { useState } from "react";

const AdminCards = ({ photo, price, name, marca, description, summary, openFullCard, id }) => {

  const { user, isAuthenticated } = useAuth();
 
  return (


    <div className="max-w-[280px]  bg-sky-200 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{marca}</h1>
      {user.isSuperAdmin ? <div className="absolute top-1 right-1 z-10">
        <DeleteButton id={id} />
      </div> : null}
      {isAuthenticated ? <div className="absolute top-14 right-1 z-20">
        <EditButton id={id} />
      </div> : console.log("el edit button no se muestra")}
      <div className="relative">
        <img className=" rounded-xl " src={photo} alt="Colors" />
        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg ">${price}</p>

      </div>

      <h3 className="mb-1 text-xl font-bold text-indigo-600">{name}</h3>
      <div className="my-1">
        <p>{summary}
        </p>
        <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="mt-2 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
         onClick={() => openFullCard(id)}>Mas información</button>
      </div>
     
    </div>
  )
}

export default AdminCards;