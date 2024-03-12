import { useState } from "react";
import SmallCard from "../ChargeProducts/DataItemsCards/SmallCard"
import CloudinaryUploadWidget from "../../Cloudinary/Cloudinary"
import { useItems } from "../Context/ItemsContext";
import { getAllItemsBdd } from "../../../redux/actions";
import {useDispatch} from "react-redux"
import Swal from "sweetalert2"


const EditModal = ({ editCardData, closeEditCard }) => {

  const dispatch = useDispatch();
  const { updateItem } = useItems();
  const [editData, setEditData] = useState({
    offer: false,
    section: editCardData.section,
    subsection: editCardData.subsection,
    filter: false,
    data: {
      type: editCardData.data.type,
      items: [
        {
          marca: editCardData.data.items[0].marca,
          name: editCardData.data.items[0].name,
          photo: editCardData.data.items[0].photo,
          price: editCardData.data.items[0].price,
          summary: editCardData.data.items[0].summary,
          description: editCardData.data.items[0].description,
          specsTecs: editCardData.data.items[0].specsTecs,
        },
      ],
    },
  });


  const [newPhotos, updateNewPhotos] = useState([]);

  const handleImageUpload = (newUrl) => {
    setEditData((prevInitialState) => {
      const updatedItems = prevInitialState.data.items.map((item, index) => {
        if (index === 0) {
          const updatedPhotos = Array.isArray(newUrl) ? [...newPhotos, ...newUrl] : [...newPhotos, newUrl];
          updateNewPhotos(updatedPhotos);
          return {
            ...item,
            photo: updatedPhotos,
          };
        }
        return item;
      });
  
     
  
      return {
        ...prevInitialState,
        data: {
          ...prevInitialState.data,
          items: updatedItems,
        },
      };
    });
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        items: [
          {
            ...prev.data.items[0],
            [name]: value,
          },
        ],
      },
    }));
  };

  const onSubmit = async (editCardData, editData, e) => {
    e.preventDefault();
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    try {
      const response = await updateItem(editCardData._id, editData);
     
  
      if (response.status === 200) {
        
        swalWithBootstrapButtons.fire({
          title: "Updated!",
          text: "Your product has been updated.",
          icon: "success"
        });
  
        
        dispatch(getAllItemsBdd());
        closeEditCard();
      } else {
      
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: "An error occurred while updating the product.",
          icon: "error"
        });
      }
    } catch (error) {
     throw error
    }
  };
  
  return (

    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full xl:flex xl:ml-76 "
    >
      <div className="flex p-4 w-screen max-w-7xl max-h-full">


        <div className="flex-1 bg-sky-400 xl:flex xl:items-center rounded-3xl xl:min-h-[200px] xl:max-h-[800px]  xs:min-h-[1400px]">

          <div className="flex flex-col xl:flex-row items-start justify-start h-screen dark xs:-mb-[1000px]  xl:-mt-[900px]">

            <button data-modal-hide="default-modal" type="button" class="ms-3 top-0 right-0 bg-red-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-400 dark:hover:bg-red-600 mt-10"
              onClick={closeEditCard}>CERRAR</button>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center h-screen dark">


            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 mb-4 xl:mr-4  xl:-mt-[100px]">
              <h2 className="text-2xl font-bold text-gray-200 mb-4 ">Información General del Producto</h2>

              <form className="flex flex-col  " 
              onSubmit={(e) => onSubmit(editCardData, editData, e)}>
                <input placeholder="Marca" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                  name="marca"
                  value={editData.data.items[0].marca}
                  onChange={handleChange}
                />
                <input placeholder="Modelo" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                  name="name"
                  value={editData.data.items[0].name}
                  onChange={handleChange} />
                <input placeholder="Precio" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                  name="price"
                  value={editData.data.items[0].price}
                  onChange={handleChange}
                />
                <input placeholder="Resumen" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                  name="summary"
                  value={editData.data.items[0].summary}
                  onChange={handleChange}
                />
                <textarea placeholder="Descripción general" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" name="description"
                  value={editData.data.items[0].description}
                  onChange={handleChange}
                ></textarea>
                <p>Fotos del producto</p>
                <div >
                  <CloudinaryUploadWidget onImageUpload={handleImageUpload} />
                </div>

                <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit" >Enviar</button>
              </form>

            </div>
            <h1>hola</h1>
          </div>
          <div className="xl:ml-[300px] xl:-mt-[100px] xs:ml-12">
            <SmallCard initialState={editData} />
          </div>
        </div>
      </div>
    </div>


  )
}

export default EditModal;