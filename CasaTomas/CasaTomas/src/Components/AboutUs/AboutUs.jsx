import NavBar from "../NavBar/NavBar"
import { logoactual, oldlogo, oldlogo2, oldlogo3 } from "../../assets";

const AboutUs = () => {
    return (
        <div>
            <NavBar />
            <section class="flex items-center py-10 bg-gray-100 font-poppins dark:bg-gray-800 ">
                <div class="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-6 md:px-6">
                    <div class="flex flex-wrap items-center">
                        <div class="w-full px-2 mb-10 xl:w-1/2 lg:mb-8">
                            <div class="flex flex-wrap">
                                <div class="w-full px-4 md:w-1/2 items-center justify-center ">
                                    <img src={oldlogo} alt="1924"
                                        class=" mb-6 rounded-lg h-80 " />
                                        <p className="text-xs -mt-4">Año: 1923</p>
                                    <img src={oldlogo3} alt=""
                                        class="w-full rounded-lg h-80 py-20" />
                                         <p className="text-xs -mt-16">Año: 1995</p>
                                </div>
                                <div class="w-full px-4 md:w-1/2 xl:mt-11">
                                    <img src={oldlogo2} alt=""
                                        class="w-full mb-6 rounded-lg h-80 py-20" />
                                         <p className="text-xs -mt-24 mb-32">Año: 1963</p>
                                    <img src={logoactual} alt=""
                                        class="object-fill w-full rounded-lg h-80 py-20" />
                                         <p className="text-xs -mt-14">Año: 2020</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
                            <span class="text-sm font-semibold text-blue-500 dark:text-blue-400">¿Porque elegirnos?</span>
                            <h2 class="mt-2 mb-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
                                Somos Casa Tomas: 100 Años de Pasión por la Costura

                            </h2>
                            <p class="mb-4 text-xs leading-7 text-gray-500 dark:text-gray-400">
                                Desde 1923, Casa Tomas ha sido el epicentro de la pasión por la costura y la maestría en el mundo de las máquinas de coser. Fundada por el visionario Bartolomé Tomas, nuestra empresa ha sido el referente en la venta y reparación de máquinas de coser industriales y familiares, así como en la provisión de repuestos y accesorios para satisfacer las necesidades de nuestros clientes.

                                La historia de Casa Tomas es una historia de tradición, dedicación y amor por el arte de la costura. Lo que comenzó como un pequeño taller familiar ha crecido a lo largo de cinco generaciones, manteniendo siempre la excelencia y la calidad como los pilares fundamentales de nuestro negocio.
                            </p>
                            <ul class="mb-10">
                                <li class="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span class="mr-3 text-blue-500 dark:text-blue-400 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="w-6 h-6 bi bi-1-circle-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
                                        </svg>
                                    </span>
                                    El Legado de Bartolomé Tomas:                          </li>
                                <p class="mb-4 text-xs leading-7 text-gray-500 dark:text-gray-400">En 1923, Bartolomé Tomas, un apasionado amante de la costura, fundó Casa Tomas con el objetivo de proporcionar a la comunidad máquinas de coser de la más alta calidad. Su visión y habilidad para ofrecer un servicio excepcional sentaron las bases de lo que hoy es una institución respetada en el mundo de la costura.</p>
                                <li class="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span class="mr-3 text-blue-500 dark:text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="w-6 h-6 bi bi-2-circle-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                                        </svg>
                                    </span>
                                    De Generación en Generación:
                                </li>
                                <p class="mb-4 text-xs leading-7 text-gray-500 dark:text-gray-400">El compromiso con la excelencia y la atención al cliente se transmitió de generación en generación. El hijo de Bartolomé, seguido por su nieto, bisnieto, y ahora, en la quinta generación, continuamos el legado familiar con pasión y orgullo. Cada miembro de la familia Tomas ha aportado su experiencia única, contribuyendo al crecimiento y éxito continuo de Casa Tomas.</p>
                                <li class="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span class="mr-3 text-blue-500 dark:text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="w-6 h-6 bi bi-3-circle-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                                        </svg>
                                    </span>
                                    Más que una Tienda:
                                </li>
                                <p class="mb-4 text-xs leading-7 text-gray-500 dark:text-gray-400">Casa Tomas no es solo una tienda, es un destino para los amantes de la costura y la creación. No solo ofrecemos máquinas de coser y repuestos de la más alta calidad, sino que también contamos con una mercería completa, donde los creadores pueden encontrar todo lo necesario para dar vida a sus proyectos.</p>
                                <li class="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                                    <span class="mr-3 text-blue-500 dark:text-blue-400 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="w-6 h-6 bi bi-4-circle-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM7.519 5.057c-.886 1.418-1.772 2.838-2.542 4.265v1.12H8.85V12h1.26v-1.559h1.007V9.334H10.11V4.002H8.176c-.218.352-.438.703-.657 1.055ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z" />
                                        </svg>
                                    </span>
                                    Nuestro Compromiso:
                                </li>
                                <p class="mb-4 text-xs leading-7 text-gray-500 dark:text-gray-400">En Casa Tomas, nos enorgullece proporcionar un servicio personalizado y productos de calidad que han sido el sello distintivo de nuestra empresa durante más de un siglo. Estamos comprometidos con la satisfacción de nuestros clientes y nos esforzamos por ser líderes en la industria de máquinas de coser y mercería.
                                </p>
                                
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs;
