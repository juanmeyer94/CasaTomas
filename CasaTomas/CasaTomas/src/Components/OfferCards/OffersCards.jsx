import Card from "../Card/Card";
import OfferCarousel from "../Carousel/OfferCarousel";


const OffersCards = ({data, closeFullCard, FullCardData, openFullCard}) => {

    const offers = data.filter((item) => item.offer)
    const showOffers = (offer) => (
        <Card   openFullCard={() => openFullCard(offer.id ? offer.id : offer._id)} key={offer.id} {...offer.data.items[0]} id={offer.id} />
    );

    const maquinas = data.filter((item) => item.section === "Maquina")
    const mostrarMaquinas = (maquinas) => (
        <Card    openFullCard={() => openFullCard(maquinas.id ? maquinas.id : maquinas._id)} key={maquinas.id} {...maquinas.data.items[0]} id={maquinas.id} />
    )

    const merceria = data.filter((item) => item.section === "Merceria");
    const mostrarMerceria = (merceria) => (
        <Card    openFullCard={() => openFullCard(merceria.id ? merceria.id : merceria._id)} key={merceria.id} {...merceria.data.items[0]} id={merceria.id}/>
    )
  

    return (
        <div className="mx-2 my-2 px-2">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-4xl 2xl:text-6xl dark:text-black"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">OFERTAS</span> únicas</h1>

            <OfferCarousel items={offers} renderItem={showOffers} />
            <br />
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl 2xl:text-6xl "><span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Máquinas de coser</span></h2>
            <OfferCarousel items={maquinas} renderItem={mostrarMaquinas} />
            <br />
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl 2xl:text-6xl "><span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Mercería</span></h2>
            <OfferCarousel items={merceria} renderItem={mostrarMerceria} /> 

        </div>
    )
}

export default OffersCards;
