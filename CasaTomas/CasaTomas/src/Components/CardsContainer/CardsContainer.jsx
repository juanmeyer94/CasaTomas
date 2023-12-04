import React, { useState } from 'react';
import OffersCards from '../OfferCards/OffersCards';
import FilteredCards from '../FilteredCards/FilteredCards';
import { getItemById } from '../../redux/actions';
import FullCardDataPublic from '../Card/FullCardDataPublic';

const CardsContainer = ({showOffers, filteredData, data}) => {
    const [isFullCardOpen, setIsFullCardOpen] = useState(false);
    const [fullCardData, setFullCardData] = useState(null);

    const openFullCard = async (id) => {
        try {
          const response = await getItemById(id);
          setFullCardData(response.data);
          setIsFullCardOpen(true);
          console.log(`Abriendo información para la card con ID: ${id}`);
        } catch (error) {
          console.error('Error al obtener la información de la tarjeta completa:', error);
        }
      };
    
      const closeFullCard = () => {
        setIsFullCardOpen(false);
      };
    
    

    return (
        <div className=' w-full'>
            {showOffers ?<OffersCards closeFullCard={closeFullCard} openFullCard={openFullCard}  FullCardData={fullCardData} data={data}/> : <FilteredCards closeFullCard={closeFullCard}  FullCardData={fullCardData} openFullCard={openFullCard} filteredData={filteredData}/>}
            {isFullCardOpen && <FullCardDataPublic closeFullCard={closeFullCard} FullCardData={fullCardData} />}
        </div>
    )
}

export default CardsContainer;