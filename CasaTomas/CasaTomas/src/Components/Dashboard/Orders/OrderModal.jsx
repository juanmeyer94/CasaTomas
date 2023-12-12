import React from "react";

const OrderModal = ({order ,onClose }) => {
    console.log(order)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-96 p-6 rounded-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Cliente: {order.userName} {order.userLastName}</h2>
        <p>Email: {order.userEmail}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Artículos:</h2>
        <ul>
          {order.orderItems.map((item) => (
            <li key={item._id} className="mb-2">
              <div className="flex items-center">
                {item.items.map((subItem) => (
                  <div key={subItem._id} className="mr-4">
                    <img src={subItem.photo[0]} alt={subItem.name} className="w-16 h-16 object-cover rounded" />
                    <h1 className="mt-1">{subItem.marca}</h1>
                    <p className="mt-1">{subItem.name}</p>
                    <p className="text-sm text-gray-500">Precio por unidad ${subItem.price}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
      >
        CERRAR
      </button>
    </div>
  </div>
  );
};

export default OrderModal;
