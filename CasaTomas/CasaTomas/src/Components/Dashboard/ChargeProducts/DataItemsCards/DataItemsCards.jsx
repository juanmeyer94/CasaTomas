import SmallCard from "./SmallCard";

const DataItemCards = ({initialState, setInitialState}) => {

  console.log(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialState((prev) => ({
      ...prev,
      data: {
        items: [
          {
            ...prev.data.items[0],
            [name]: value,
          },
        ],
      },
    }));
  };

  return (
    <div className="col-span-12 flex h-screen">
      <div className="flex-1 bg-sky-400">
        <div class="flex flex-col items-center justify-center h-screen dark">
          <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-200 mb-4">Información General del Producto</h2>

            <form class="flex flex-col">
              <input placeholder="Marca" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
              name="marca"
              value={initialState.data.items[0].marca}
              onChange={handleChange}
              />
                <input placeholder="Modelo" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                name="name"
                value={initialState.data.items[0].name}
                onChange={handleChange}/>
                  <input placeholder="Precio" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                  name="price"
                  value={initialState.data.items[0].price}
                  onChange={handleChange}
                  />
                    <input placeholder="Resumen" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text"
                    name="summary"
                    value={initialState.data.items[0].summary}
                    onChange={handleChange}
                    />
                      <textarea placeholder="Descripción general" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" name="description"
                      value={initialState.data.items[0].description}
                      onChange={handleChange}
                      ></textarea>
                      <p>Fotos del producto</p>
                      <input placeholder="Resume" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="file"
                      name="photo"
                      value={initialState.data.items[0].photo}
                      onChange={handleChange}/>

                        <button class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">Enviar</button>
                      </form>
                    </div>
                  </div>

                </div>

                {/* Derecha con gray-700 */}
                <div className="flex-1 bg-gray-700 flex items-center justify-center">
                  <SmallCard initialState={initialState} />
                </div>
              </div>
              );
}

              export default DataItemCards;
