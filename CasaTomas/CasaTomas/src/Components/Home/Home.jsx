import { useState, useCallback, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import {  filterItems, getAllItemsBdd } from "../../redux/actions";



import NavBar from "../NavBar/NavBar"
import Carousel from "../Carousel/Carousel";
import SideBar from "../SideBar/SideBar";
import CardsContainer from "../CardsContainer/CardsContainer";
import Footer from "../Footer/Footer";



const Home = () => {

const dispatch = useDispatch();
const data = useSelector(state => state.items);
const [loading, setLoading] = useState(false)

//Filtros
const filteredData = useSelector((state) => state.filteredItems);
 const handleFilter = useCallback((filters) => {
  dispatch(filterItems(filters));
}, [dispatch]);





  //On/Off Offers
  const [showOffers, setShowOffers] = useState(true);

  const trueOffers = () => {
    setShowOffers(true)
  }
  const falseOffers = () => {
    setShowOffers(false)
  }

  

  return (
    <div className="h-full w-full bg-white" >

      <NavBar />
      <Carousel />


      <div className="flex h-full">
        <SideBar showOffers={showOffers} trueOffers={trueOffers} falseOffers={falseOffers} handleFilter={handleFilter} />
        <CardsContainer showOffers={showOffers} trueOffers={trueOffers} falseOffers={falseOffers} filteredData={filteredData} data={data} />
      </div>
      <Footer/>

    </div>
  )
}

export default Home;