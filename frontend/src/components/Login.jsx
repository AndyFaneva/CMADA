import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function Login(){

  const [form, setForm] = useState({ email: '', mot_de_passe: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
    
      const start = Date.now(); // ⏱ début du chargement
    
      try {
        const response = await axios.post('http://localhost:3000/utilisateur/login', form);
        const token = response.data.access_token;
        const utilisateur = response.data.utilisateur;
    
        localStorage.setItem('token', token);
        localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
    
        const delay = 5000 - (Date.now() - start); // 🕔 calcule le temps restant
    
        setTimeout(() => {
          if (utilisateur.statut === 'actif') {
            if (utilisateur.role === 'admin') {
              navigate('/admindashboard');
            } else if (utilisateur.role === 'fournisseur') {
              navigate('/fournisseur');
            } else if (utilisateur.role === 'client') {
              navigate('/client');
            } else {
              setError("Rôle non autorisé");
            }
          } else {
            setError("Compte inactif. Vous ne pouvez pas vous connecter.");
          }
    
          setLoading(false);
        }, delay > 0 ? delay : 0);
    
      } catch (err) {
        const delay = 5000 - (Date.now() - start); // 💡 garde 5s de chargement même en cas d'erreur
    
        setTimeout(() => {
          if (err.response && err.response.status === 401) {
            setError("Email ou mot de passe invalide.");
          } else {
            setError("Erreur de connexion au serveur.");
          }
    
          setLoading(false);
        }, delay > 0 ? delay : 0);
      }
    };
    
  
    return(
        <>
        {/* div soloina form */}
        <div className="p-5">
          <form onSubmit={handleLogin}>
            <div className="max-w-md mx-auto bg-base-100 p-8 rounded-lg shadow-md mx-5">
              
              {loading ? (
                  <div className="flex items-center justify-center gap-1">
                 <span className="loading loading-spinner loading-xs"></span>
                 <span className="loading loading-spinner loading-sm"></span>
                 <span className="loading loading-spinner loading-md"></span>
                 <span className="loading loading-spinner loading-lg"></span>
                 <span className="loading loading-spinner loading-xl"></span>
                 </div>
                 ) : (<img src="padlock.png" alt="padlock" width={50} className="mx-auto"/>)}
                <h2 className="text-center font-bold text-xl mt-5">Connexion à votre expace pro</h2>
                <p className="text-center ">Accédez à votre compte professionnel</p>
            {/* email */}
            <div className="sm:col-span-4 mt-5">
              <label htmlFor="email" className="block text-sm/6 font-medium text-base-900">
                Email professionnel
              </label>
              <div className="mt-2">
                <input
                value={form.email} onChange={handleChange} required
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
                value={form.mot_de_passe} onChange={handleChange} required
                  id="password"
                  name="mot_de_passe"
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
            <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5">
                 {loading ? (
                'Connexion ...'
                 ) : ('Se connecter')}
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
            {error && (
        <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
            <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-base-500 bg-base-100 hover:bg-base-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
            onClick={()=>navigate('/signup')}   >
                Créer un compte professionnel
            </button>
            </div>
            </div>
            </form>
            </div>
        </>
    );
}