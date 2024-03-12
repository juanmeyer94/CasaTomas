import { useAuth } from "../../Context/AdminContext";
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


const SmallCard = ({ initialState }) => {
  const { user, isAuthenticated } = useAuth();

  const photos = initialState?.data?.items[0]?.photo;
  const marca = initialState?.data?.items[0]?.marca;
  const name = initialState?.data?.items[0]?.name;
  const summary = initialState?.data?.items[0]?.summary;
  const price = initialState?.data?.items[0]?.price;

  const formattedPrice = formatPrice(price);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const photosArray = Array.isArray(photos) ? photos : [photos];

  return (
    <div className="max-w-[280px] min-h-[400px] bg-sky-200 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{marca}</h1>

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

      <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg ">{formattedPrice}</p>

      <h3 className="mb-1 text-xl font-bold text-indigo-600">{name}</h3>
      <div className="my-1">
        <p>{summary}</p>
        <button
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="mt-2 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
          onClick={() => openFullCard(id)}
        >
          Mas información
        </button>
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
    </div>
  );
};

export default SmallCard;
