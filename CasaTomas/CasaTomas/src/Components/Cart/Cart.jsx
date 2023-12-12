import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { changeQuantity, removeProduct, createOrderToApi } from "../../redux/actions"

const Cart = ({ cart, handleCloseModal }) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    firstName: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
  
      const orderData = {
        orderItems: cart.map((product) => ({
          type: product.type,
          items: product.items, // Mantener todos los elementos de items
          _id: product._id,
          quantity: product.quantity,
          
        })),
        userEmail: values.email,
        userName: values.firstName,
        userLastName: values.lastName,
        totalAmount: calculateTotal(cart),
        status: "pendiente",
        deleted: false,
      };
  
      console.log(orderData);
      
      try {
        await dispatch(createOrderToApi(orderData));
        // Limpiar el carrito después de la creación exitosa
        cart.forEach((product) => dispatch(removeProduct(product._id)));
        console.log("Se creó con éxito");
      } catch (error) {
        console.error("Error al crear la orden:", error);
      }
  
      setSubmitting(false);
    },
  });
  


  const calculateSubtotal = (cart) => {
    return cart.reduce(
      (total, product) =>
        total + product.items[0].price * product.quantity,
      0
    );
  };
  const calculateTotal = (cart) => {
    return calculateSubtotal(cart);
  };

  const handleQuantityChange = (productId, number) => {
    dispatch(changeQuantity(productId, number));
  };

  const handleRemoveProduct = (productId2) => {
    console.log("dio click" + productId2)
    dispatch(removeProduct(productId2));
  };

  return (
    <section className="h-full bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Tú carrito</h1>
        </div>

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">

                  {cart.map((product) => (
                    <li
                      key={product._id}
                      className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                    >
                      <div className="shrink-0">
                        <img
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src={product.items[0].photo[0]}
                          alt={product.items[0].name || product.items[0].marca}
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">
                              {product.items[0].marca}
                            </p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              {product.items[0].name}
                            </p>
                          </div>

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              ${product.items[0].price}
                            </p>

                            <div className="sm:order-1">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  onClick={() => handleQuantityChange(product._id, -1)}>
                                  -
                                </button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                  {product.quantity}
                                </div>
                                <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  onClick={() => handleQuantityChange(product._id, +1)}>
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">

                          <button
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            onClick={() => handleRemoveProduct(product._id)}
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                                className=""
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {"$" + calculateSubtotal(cart)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">USD</span>
                  {"$" + calculateTotal(cart)}
                </p>
              </div>

              <div className="mt-6 text-center">
                <form onSubmit={formik.handleSubmit} className="mr-3 mx-2 my-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  ) : null}

                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Nombre"
                    className="mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                  ) : null}

                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Apellido"
                    className="mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 mt-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    disabled={!formik.isValid || submitting}
                  >
                    {submitting ? "ENVIANDO..." : "ENVIAR"}
                    {/* ... Icono de carga opcional */}
                  </button>
                </form>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="ms-3 my-2 bg-red-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-400 dark:hover:bg-red-600"
                  onClick={handleCloseModal}
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart;