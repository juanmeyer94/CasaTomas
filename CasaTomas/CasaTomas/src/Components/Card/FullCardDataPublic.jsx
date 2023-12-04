const FullCardDataPublic = ({ closeFullCard, FullCardData }) => {

    




    return (

        
        
        <div id="default-modal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 h-[calc(100%-1rem)] max-h-full xl:ml-96 xl:mt-40">
    <div class="relative p-4 w-full max-w-7xl max-h-full">
      
        <div class="relative bg-white min-w-full rounded-lg shadow  dark:bg-gray-700">
          
            
          
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                    <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <img class="w-full h-full object-cover mt-4" src={FullCardData.data.items[0].photo} alt="Product Image"/>
                    </div>
                   
                </div>
                <div class="md:flex-1 px-4">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white mt-2">{FullCardData.data.items[0].marca}
                <br />
                     <h2 className='text-xl font-bold text-gray-800 dark:text-white'>{FullCardData.data.items[0].name}</h2>
                     </h1>
                    
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
              
                    {FullCardData.data.items[0].summary}
                    </p>
                    <div class="flex mb-4">
                        <div class="mr-4">
                            <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                            <span class="text-gray-600 dark:text-gray-300">$ {FullCardData.data.items[0].price}</span>
                        </div>
                        <div>
                            <span class="font-bold text-gray-700 dark:text-gray-300">Disponibilidad:</span>
                            <span class="text-gray-600 dark:text-gray-300">En stock</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Escoger Color:</span>
                        <div class="flex items-center mt-2">
                            <button class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                            <button class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                            <button class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                            <button class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Seleccionar medida:</span>
                        <div class="flex items-center mt-2">
                            <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                            <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                            <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                            <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                            <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                        </div>
                    </div>
                    <div>
                        <span class="font-bold text-gray-700 dark:text-gray-300">Características:</span>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        {FullCardData.data.items[0].description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
           
            <div class="flex items-center justify-center p-4 md:p-5 border-t border-sky-600 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class=" bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">COMPRAR AHORA</button>
                <button data-modal-hide="default-modal" type="button" class="ms-3 bg-red-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-400 dark:hover:bg-red-600"
                onClick={closeFullCard}>CERRAR</button>
            </div>
        </div>
    </div>
</div>
    


    )
}

export default FullCardDataPublic;