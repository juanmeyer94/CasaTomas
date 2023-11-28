import React, { useState } from 'react';
import OffersCards from '../OfferCards/OffersCards';
import FilteredCards from '../FilteredCards/FilteredCards';

const CardsContainer = ({showOffers, filteredData, data}) => {

   

    return (
        <div className=' w-full'>
            {showOffers ?<OffersCards data={data}/> : <FilteredCards filteredData={filteredData}/>}

        </div>
    )
}

export default CardsContainer;