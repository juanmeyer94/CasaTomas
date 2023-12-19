import CloudinaryUploadWidget from "../../../Cloudinary/Cloudinary";
import SmallCard from "./SmallCard";
import {useDispatch} from "react-redux"
import { newItem } from "../../../../redux/actions";
import Swal from 'sweetalert2';

const DataItemCards = ({ initialState, setInitialState, onImageUpload, setSelectedComponent }) => {
  const dispatch = useDispatch();

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialState((prev) => ({
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
  const handleOffer = (clickedSection) => {

    setInitialState({
      ...initialState,
      offer: clickedSection,
    });


  };

  

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(newItem(initialState));
      
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'La operación se realizó correctamente.',
      }).then(function(){
        setSelectedComponent("products")
      })
  
      console.log("enviado");
    } catch (error) {
     
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al realizar la operación.',
      });
  
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="col-span-12 flex h-screen">
      <div className="flex-1 bg-sky-400">
        <div className="flex flex-col items-center justify-center h-screen dark">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">Información General del Producto</h2>

            <form className="flex flex-col" >
              <input placeholder="Marca" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                name="marca"
                value={initialState.data.items[0].marca}
                onChange={handleChange}
              />
              <input placeholder="Modelo" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                name="name"
                value={initialState.data.items[0].name}
                onChange={handleChange} />
              <input placeholder="Precio" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                name="price"
                value={initialState.data.items[0].price}
                onChange={handleChange}
              />
              <input placeholder="Resumen" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                name="summary"
                value={initialState.data.items[0].summary}
                onChange={handleChange}
              />
              <textarea placeholder="Descripción general" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" name="description"
                value={initialState.data.items[0].description}
                onChange={handleChange}
              ></textarea>
              <p>Fotos del producto</p>
              <div >
                <CloudinaryUploadWidget onImageUpload={onImageUpload} />
              </div>

              <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit" onClick={onSubmit}>Enviar</button>
            </form>
          </div>
        </div>

      </div>


      <div className="flex-1 bg-gray-700 flex items-center justify-center">
        <SmallCard initialState={initialState} />
      </div>
    </div>
  );
}

export default DataItemCards;
