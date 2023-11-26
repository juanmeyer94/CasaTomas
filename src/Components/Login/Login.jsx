import { logoLogin } from "../../assets"
import { frases } from "../../BDD/frases";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/actions";

const getRandomFrase = () => {
   
    const randomIndex = Math.floor(Math.random() * frases.length);
   
    return frases[randomIndex];
  };


const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = useSelector((state) => state.user)

      const [currentFrase, setCurrentFrase] = useState(getRandomFrase);


      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleLogin = (e) => {
        e.preventDefault();
        const userData = {
            email:email,
            password:password,
        };
        dispatch(loginUser(userData, history))
      }




    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <section className="bg-sky-200 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center  py-8  md:h-screen lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className=" w-screen h-[340px] -mt-28" src={logoLogin} alt="logo" />
                        
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
                                    onChange={handleEmailChange}/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    onChange={handlePasswordChange} />
                                </div>

                                <button type="submit" className="w-full text-2xl text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-sky-500">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    <a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Back to home</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-6">
        <div className="text-center">
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
            {currentFrase.phrase}
          </p>
          <p className="text-lg md:text-xl font-semibold">{`- ${currentFrase.autor}`}</p>
        </div>
        </div>
        </div>
    )
}

export default Login;