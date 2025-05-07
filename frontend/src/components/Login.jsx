import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    return(
        <>
        {/* div soloina form */}
        <div className="p-5">
            <div className="max-w-md mx-auto bg-base-100 p-8 rounded-lg shadow-md mx-5">
            <i className="fas fa-lock text-blue-500 text-5xl mb-4 text-center">
                Logo
            </i>
                <h2 className="text-center font-bold text-xl mt-5">Connexion à votre expace pro</h2>
                <p className="text-center ">Accédez à votre compte professionnel</p>
            {/* email */}
            <div className="sm:col-span-4 mt-5">
              <label htmlFor="email" className="block text-sm/6 font-medium text-base-900">
                Email professionnel
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md px-3 py-1.5 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  sm:text-sm/6 border-2"
                />
              </div>
            </div>
            {/* password */}
            <div className="sm:col-span-4 mt-5">
              <label htmlFor="password" className="block text-sm/6 font-medium text-base-900">
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  className="block w-full  rounded-md px-3 py-1.5  outline-1  -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600  sm:text-sm/6 border-2"
                />
            </div>
            {/* checkbox */}
            <div className="flex flex-col text-left align-item-left mt-5">
            <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox" />
                     <span className="label-text">Se souvenir de moi</span>
                     <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Mot de passe oublié?</a>
            </div>
            </label>  
            </div>
            {/* Boutton */}
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5">
                Se connecter
            </button>
            {/* Première Connexion ? */}
            <div className="relative mt-5">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-base-100 text-gray-500">Première connexion ?</span>
            </div>
            </div>
            {/* Boutton2 */}
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-base-700 bg-base-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
            onClick={()=>navigate('/signup')}   >
                Créer un compte professionnel
            </button>
            </div>
            </div>
            </div>
        </>
    );
}