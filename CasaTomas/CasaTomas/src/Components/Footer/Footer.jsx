import { logo } from "../../assets"

const Footer = () => {

    return (
        

<footer className="bg-sky-100 -mt-4 w-full -ml-1 rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://www.facebook.com/casa.tomas.rafaela" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-600 dark:text-white">Casa Tomás</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Acerca de nosotros</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Preguntas frecuentes</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contacto</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-blue-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://www.facebook.com/casa.tomas.rafaela" className="hover:underline">Casa Tomás™</a>. All Rights Reserved.</span>
    </div>
</footer>


    )
}


export default Footer;