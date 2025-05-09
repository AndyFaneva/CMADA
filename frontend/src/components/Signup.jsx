import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";

export default function Signup(){

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        prenom: "",
        nom: "",
        email: "",
        mot_de_passe: "",
        confirmation_mot_de_passe: "",
        role: "",
        statut: "",
        info_id: null, // optionnel
      });
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
      };

      
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;

    // Met à jour le rôle dans le formulaire
    handleChange(e); // Appelle handleChange pour mettre à jour le rôle

    // Met à jour le statut en fonction du rôle
    setForm((prevData) => ({
      ...prevData,
      statut: selectedRole === 'client' ? 'actif' : 'inactif',
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.prenom) newErrors.prenom = 'Le prénom est obligatoire.';
    if (!form.nom) newErrors.nom = 'Le nom est obligatoire.';
    if (!form.email) newErrors.email = 'L\'email est obligatoire.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide.';
    if (!form.mot_de_passe) newErrors.mot_de_passe = 'Le mot de passe est requis.';
    if (form.mot_de_passe.length < 6) newErrors.mot_de_passe = '6 caractères minimum.';
    if (form.mot_de_passe !== form.confirmation_mot_de_passe) newErrors.confirmation_mot_de_passe = 'Les mots de passe ne correspondent pas.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  
    if (!validate()) {
      setMessage('');
      return;
    }
  
    try {
      await axios.post(`${API_URL}/utilisateur`, form);
      alert("Utilisateur créé avec succès !");
      setErrors({});
      navigate('/login');
    } catch (err) {
      console.error(err);
  
      // ✅ Vérifie si le backend a renvoyé une erreur 409 (conflit)
      if (err.response && err.response.status === 409) {
        setMessage("Cette adresse mail est déjà utilisé.");
      } else {
        setMessage("Erreur lors de l'ajout de l'utilisateur.");
      }
  
      alert("Erreur lors de l'inscription");
    }
  };
  

      // const handleSubmit = async (e) => {
      //   e.preventDefault();
      //   console.log(form);
        
      //   if (!validate()) {
      //       setMessage('');
      //       return;
      //     }
      //   try {
      //     await axios.post("http://localhost:3000/utilisateur", form);
      //     alert("Utilisateur créé avec succès !");
      //     setErrors({});

      //     navigate('/login');
      //   } catch (err) {
      //     console.error(err);
      //     setMessage('Erreur lors de l\'ajout de l\'utilisateur');
      //     alert("Erreur lors de l'inscription");
      //   }
      // };
    const navigate = useNavigate();
    return(
        <>
        
     <div className="p-5">
    <form onSubmit={handleSubmit}  className="max-w-md mx-auto bg-base-100 p-2 rounded-lg shadow-md mx-2">
      <div className="bg-base-100 px-4 pt-5 pb-2 sm:p- sm:pb-2">
       

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-base-500">Nouvel utilisateur</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-base-500">
                Prénom *
              </label>
              <div className="mt-2">
                 <input name="prenom" onChange={handleChange} placeholder="Prénom" className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                 {errors.prenom && <div className="error">{errors.prenom}</div>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-base-500">
                Nom *
              </label>
              <div className="mt-2">
                 
                  <input name="nom" onChange={handleChange} placeholder="Nom" className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              
                  {errors.nom && <div className="error">{errors.nom}</div>}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="email" className="block text-sm/6 font-medium text-base-500">
                Email *       {errors.existant && <div className="error">{errors.existant}</div>}
              </label>
              <div className="mt-2">
               <input name="email" onChange={handleChange} placeholder="Email" className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
               {errors.email && <div className="error">{errors.email}</div>}
              </div>
            </div>

            <div className="sm:col-span-3">
                 <label htmlFor="country" className="block text-sm/6 font-medium text-base-500">
                Rôle *
              </label>
              <div className="mt-2 grid grid-cols-1">
               <select
                       value={form.role}
                 name="role"
                onChange={handleRoleChange}
                className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                defaultValue=""
                >       
                 <option value="" disabled>Choisir un rôle</option>
                     <option value="client">Client</option>
                     <option value="fournisseur">Fournisseur</option>
                    </select>
                </div>
            </div>
            <div className="sm:col-span-3">
            <label htmlFor="street-address" className="block text-sm/6 font-medium text-base-500 mb-2">
                Statut
              </label>
            <input
        value={form.statut}
        onChange={handleRoleChange}
        name="statut"
        readOnly
        className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        placeholder="Statut"
      />
            </div>
            

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-base-500">
                Société (optionnel)
              </label>
              <div className="mt-2">
                <input
                  id="Société"
                  name="Société"
                  type="text"
                  autoComplete="Société"
                  className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-base-500">
                Mot de passe *
              </label>
              <div className="mt-2">
               <input name="mot_de_passe" type="password" onChange={handleChange} placeholder="Mot de passe" className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
               {errors.mot_de_passe && <div className="error">{errors.mot_de_passe}</div>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-base-500">
                Confirmation *
              </label>
              <div className="mt-2">
                <input name="confirmation_mot_de_passe" type="password" onChange={handleChange} placeholder="Mot de passe" className="block w-full rounded-md bg-base-200 px-3 py-1.5 text-base text-base-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                {errors.confirmation_mot_de_passe && <div className="error">{errors.confirmation_mot_de_passe}</div>}

              </div>
            </div>

          </div>
        </div>

       
      </div>

      <div className=" flex items-center justify-end gap-x-6 bg-base-100 p-5">
        <button 
        onClick={()=>navigate("/login")}
        type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-base-300 shadow-sm px-4 py-2 bg-base-100 text-base-700 font-medium hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Annuler
        </button>
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          S'inscrire
        </button>
       
      </div>
      <a className="error mx-auto">
      {message && <p>{message}</p>}
      </a>
    </form>
    </div>
    </> 
  )
}

       
