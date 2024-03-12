import DeleteButton from "./DeleteButton";
import { useAuth } from "../Context/AdminContext";
import EditButton from "./EditButton";
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

const AdminCards = ({ photo, price, name, marca, description, summary, openFullCard, id, editCard }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { user, isAuthenticated } = useAuth();

  
  const photosArray = Array.isArray(photo) ? photo : [photo];

  const formattedPrice = formatPrice(price);

  return (
    <div className="max-w-[280px] bg-sky-200 px-4 pt-2 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{marca}</h1>
      {user.isSuperAdmin ? (
        <div className="absolute top-1 right-1 z-10">
          <DeleteButton id={id} />
        </div>
      ) : null}
      {isAuthenticated ? (
        <div className="absolute top-14 right-1 z-20">
          <EditButton id={id} editCard={editCard} />
        </div>
      ) : null}
      <div className="relative">
        {photosArray.length > 1 ? (
          <Slider {...sliderSettings}>
            {photosArray.map((photoItem, index) => (
              <div key={index}>
                <img className="rounded-xl" src={photoItem} alt={`Photo ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : (
          <img className="rounded-xl" src={photosArray[0]} alt="Photo" />
        )}

        <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg ">{formattedPrice}</p>
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

      <h3 className="mb-1 text-xl font-bold text-indigo-600">{name}</h3>
      <div className="my-1">
        <p className="text-gray-800">{summary}</p>
        <button
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="mt-2 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
          onClick={() => openFullCard(id)}
        >
          Más información
        </button>
      </div>
    </div>
  );
};

export default AdminCards;
