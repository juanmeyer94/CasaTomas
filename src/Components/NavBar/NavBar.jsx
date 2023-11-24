import Logo from "../../assets/LOGO.png"
import ToggleTheme from "../DarkMode/ToggleTheme";

const NavBar = () => {
    return (
        <div>
            

<nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://www.facebook.com/casa.tomas.rafaela" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8 lg:h-12 lg:w-16" alt="Flowbite Logo" />
            <span className="font-serif self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">CASA TOMAS</span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">(03492) 422683</a>
            <a href="/login" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
            <ToggleTheme />
        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-md">
                <li>
                    <a href="/" className="text-gray-900 dark:text-white hover:underline " aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Empresa</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Equipo</a>
                </li>
                <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Contacto</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

        </div>
    )
}

export default NavBar;