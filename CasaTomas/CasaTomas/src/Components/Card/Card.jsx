import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Card = ({ photo, price, name, summary, id, marca, openFullCard }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  const photosArray = Array.isArray(photo) ? photo : [photo];

  const formattedPrice = formatPrice(price);


  return (
    <div className="max-w-[280px] 2xl:min-h-[450px] xl:max-h-[300px] xl:min-h-[300px] 2xl:max-h-[450px] xs:max-h-[280px] xs:min-h-[280px] bg-sky-200 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 my-4 border-dashed relative">
      <h1 className="mt-4 text-gray-800 2xl:text-2xl font-bold cursor-pointer text-md">{marca}</h1>
      <div className="relative ml-3" >
        {photosArray.length > 1 ? (
          <Slider {...sliderSettings}>
            {photosArray.map((photoItem, index) => (
              <div  key={index}>
                <img className="rounded-xl xl:h-[100px] xl:w-[130px] 2xl:h-[200px] 2xl:w-[220px] xs:h-[80px] xs:w-[110px] " src={photoItem} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : (
          <img className="rounded-xl xl:h-[100px] xl:w-[130px] 2xl:h-[200px] 2xl:w-[220px] xs:h-[80px] xs:w-[110px] " src={photosArray[0]} alt="Photo" />
        )}
        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-bold py-1 px-3 rounded-br-lg rounded-tl-lg text-xs">{formattedPrice}</p>
        <style>
          {`
            .slick-prev, .slick-next {
              
              top: 50%; 
              transform: translateY(-50%);
              
              
              
            }
            .slick-prev {
              
              left: 1px; 
              z-index: 5
              
            }
            .slick-next {
              right: 10px; 
            }
          `}
        </style>

      </div>

      <h3 className="mb-1 2xl:text-xl text-sm font-bold text-indigo-600 left-0">{name}</h3>
      <div className="my-1 text-gray-800 font-semibold text-center">
        <p className="2xl:text-xl text-xs">{summary}</p>
        <div className="absolute bottom-2 left-0 w-full">
          <button className="text-xl xl:text-sm w-[80%] text-white bg-indigo-600 py-2 rounded-xl shadow-lg" onClick={() => openFullCard(id)}>
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
