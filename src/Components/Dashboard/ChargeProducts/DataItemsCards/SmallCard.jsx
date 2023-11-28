const SmallCard = ({ initialState }) => {
    // Acceder a las propiedades correctamente
    const photo = initialState?.data?.items[0]?.photo;
    const marca = initialState?.data?.items[0]?.marca;
    const name = initialState?.data?.items[0]?.name;
    const summary = initialState?.data?.items[0]?.summary;
    const price = initialState?.data?.items[0]?.price;
  
    return (
      <div className="max-w-xs mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <a href="#">
          <img className="rounded-t-lg max-h-48 object-cover w-full" src={photo} alt="" />
        </a>
        <div className="p-4">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{marca}</h5>
            <p>{name}</p>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-16 overflow-hidden">{summary}</p>
          <p>Precio: {price}</p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    );
  };
  
  export default SmallCard;