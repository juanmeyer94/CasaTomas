import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AdminContext";
import { useEffect } from "react";

const RegisterUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, user, isAuthenticated, errors: registerErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <form className="max-w-md mx-auto mt-8 bg-sky-200 py-8 px-8 rounded-2xl" onSubmit={onSubmit}>
      {registerErrors.map((error, i) => (
        <p key={i} className="text-red-500">{error}</p>
      ))}
      <div class="relative h-11 w-full min-w-[200px] my-2 mx-2" >
                  <input
                    class="peer h-full w-full rounded-md border border-sky-400 bg-transparent px-3 py-3 font-sans text-sm font-normal text-sky-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeHolder=" "
                    {...register("username", { required: true })}
                    name="username"
                    id="username"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-fsky:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Nombre del integrante
                  </label>
                
        {errors.username && (<p className="text-red-500">Username is required</p>)}
      </div>
      
        <div class="relative h-11 w-full min-w-[200px] my-2 mx-2">
                  <input
                    class="peer h-full w-full rounded-md border border-sky-400 bg-transparent px-3 py-3 font-sans text-sm font-normal text-sky-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeHolder=" "
                    type="text"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-fsky:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                  
        {errors.email && (<p className="text-red-500">Email is required</p>)}
      </div>
      
        <div class="relative h-11 w-full min-w-[200px] my-2 mx-2" >
                  <input
                    class="peer h-full w-full rounded-md border border-sky-400 bg-transparent px-3 py-3 font-sans text-sm font-normal text-sky-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeHolder=" "
                    type="password"
                    name="password"
                    id="password"
                    {...register("password", { required: true })}
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-fsky:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
        {errors.password && (<p className="text-red-500">Password is required</p>)}
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
        
      </div>
    </form>
  );
}

export default RegisterUser;
