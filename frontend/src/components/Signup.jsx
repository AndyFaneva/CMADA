import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";

export default function Signup() {
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
    info_id: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    handleChange(e);
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
      if (err.response && err.response.status === 409) {
        setMessage("Cette adresse mail est déjà utilisé.");
      } else {
        setMessage("Erreur lors de l'ajout de l'utilisateur.");
      }
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">Nouvel utilisateur</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Prénom */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Prénom *</span>
                </label>
                <input
                  name="prenom"
                  onChange={handleChange}
                  placeholder="Prénom"
                  className={`input input-bordered w-full ${errors.prenom ? 'input-error' : ''}`}
                />
                {errors.prenom && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.prenom}</span>
                  </label>
                )}
              </div>

              {/* Nom */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nom *</span>
                </label>
                <input
                  name="nom"
                  onChange={handleChange}
                  placeholder="Nom"
                  className={`input input-bordered w-full ${errors.nom ? 'input-error' : ''}`}
                />
                {errors.nom && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.nom}</span>
                  </label>
                )}
              </div>

              {/* Email */}
              <div className="form-control sm:col-span-2">
                <label className="label">
                  <span className="label-text">Email *</span>
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
                {errors.existant && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.existant}</span>
                  </label>
                )}
              </div>

              {/* Rôle */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rôle *</span>
                </label>
                <select
                  value={form.role}
                  name="role"
                  onChange={handleRoleChange}
                  className={`select select-bordered w-full ${errors.role ? 'select-error' : ''}`}
                >
                  <option value="" disabled>Choisir un rôle</option>
                  <option value="client">Client</option>
                  <option value="fournisseur">Fournisseur</option>
                </select>
              </div>

              {/* Statut */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Statut</span>
                </label>
                <input
                  value={form.statut}
                  name="statut"
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                  placeholder="Statut"
                />
              </div>

              {/* Société */}
              <div className="form-control sm:col-span-2">
                <label className="label">
                  <span className="label-text">Société (optionnel)</span>
                </label>
                <input
                  name="Société"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Mot de passe */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Mot de passe *</span>
                </label>
                <input
                  name="mot_de_passe"
                  type="password"
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className={`input input-bordered w-full ${errors.mot_de_passe ? 'input-error' : ''}`}
                />
                {errors.mot_de_passe && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.mot_de_passe}</span>
                  </label>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirmation *</span>
                </label>
                <input
                  name="confirmation_mot_de_passe"
                  type="password"
                  onChange={handleChange}
                  placeholder="Confirmation"
                  className={`input input-bordered w-full ${errors.confirmation_mot_de_passe ? 'input-error' : ''}`}
                />
                {errors.confirmation_mot_de_passe && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.confirmation_mot_de_passe}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Message d'erreur */}
            {message && (
              <div className="alert alert-error mt-4">
                <div className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <label>{message}</label>
                </div>
              </div>
            )}

            {/* Boutons */}
            <div className="card-actions justify-end mt-6">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="btn btn-ghost"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}