import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import axios from "axios";

export default function UtilisateurModal({ show, onClose, message, onUserAdded }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    mot_de_passe: "",
    confirmation_mot_de_passe: "",
    role: "",
    statut:"",
    info_id: null,
  });

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
  
    if (!validate()) {
      return;
    }
  
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/utilisateur`, form);
      onUserAdded(); // Callback pour notifier qu'un utilisateur a été ajouté
      setErrors({});
      closeModal(); // Fermeture du modal
      alert("Utilisateur créé avec succès !");
    } catch (err) {
      setIsSubmitting(false);
      console.error(err);
      if (err.response && err.response.status === 409) {
        setErrors({ api: "Cette adresse mail est déjà utilisée." });
      } else {
        setErrors({ api: "Erreur lors de l'ajout de l'utilisateur." });
      }
      alert("Erreur lors de l'inscription");
    }
  };

  const closeModal = () => {
    onClose(); // Ferme le modal lorsque l'utilisateur est ajouté
  };

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-bold">Ajouter un nouvel utilisateur</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Prénom *</span></label>
              <input
                name="prenom"
                onChange={handleChange}
                value={form.prenom}
                placeholder="Prénom"
                className={`input input-bordered w-full ${errors.prenom ? 'input-error' : ''}`}
              />
              {errors.prenom && <label className="label text-error">{errors.prenom}</label>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Nom *</span></label>
              <input
                name="nom"
                onChange={handleChange}
                value={form.nom}
                placeholder="Nom"
                className={`input input-bordered w-full ${errors.nom ? 'input-error' : ''}`}
              />
              {errors.nom && <label className="label text-error">{errors.nom}</label>}
            </div>

            <div className="form-control md:col-span-2">
              <label className="label"><span className="label-text">Email *</span></label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <label className="label text-error">{errors.email}</label>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Rôle *</span></label>
              <select
                name="role"
                value={form.role}
                onChange={handleRoleChange}
                className={`select select-bordered w-full ${errors.role ? 'select-error' : ''}`}
              >
                <option value="">Choisir un rôle</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="fournisseur">Fournisseur</option>
              </select>
              {errors.role && <label className="label text-error">{errors.role}</label>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Statut</span></label>
              <input
                name="statut"
                value={form.statut}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label"><span className="label-text">Société (optionnel)</span></label>
              <input
                name="societe"
                onChange={handleChange}
                value={form.societe}
                placeholder="Société"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Mot de passe *</span></label>
              <input
                type="password"
                name="mot_de_passe"
                onChange={handleChange}
                value={form.mot_de_passe}
                placeholder="Mot de passe"
                className={`input input-bordered w-full ${errors.mot_de_passe ? 'input-error' : ''}`}
              />
              {errors.mot_de_passe && <label className="label text-error">{errors.mot_de_passe}</label>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Confirmation *</span></label>
              <input
                type="password"
                name="confirmation_mot_de_passe"
                onChange={handleChange}
                value={form.confirmation_mot_de_passe}
                placeholder="Confirmation"
                className={`input input-bordered w-full ${errors.confirmation_mot_de_passe ? 'input-error' : ''}`}
              />
              {errors.confirmation_mot_de_passe && <label className="label text-error">{errors.confirmation_mot_de_passe}</label>}
            </div>
          </div>

          {errors.api && (
            <div className="alert alert-error mt-4">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <label>{errors.api}</label>
              </div>
            </div>
          )}
          {message && (
            <div className="alert alert-success mt-4">
              <div className="flex-1">
                <label>{message}</label>
              </div>
            </div>
          )}
          <div className="modal-action">
            <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}>
              {isSubmitting ? 'Envoi...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
