import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import axios from "axios";

export default function ModifierUtilisateurModal({ show, onClose, utilisateur, onUserUpdated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (utilisateur) {
      setForm({
        prenom: utilisateur.prenom || "",
        nom: utilisateur.nom || "",
        email: utilisateur.email || "",
        mot_de_passe: "",
        confirmation_mot_de_passe: "",
        role: utilisateur.role || "",
        statut: utilisateur.statut || "",
      });
    }
  }, [utilisateur]);

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
    if (form.mot_de_passe && form.mot_de_passe.length < 6) newErrors.mot_de_passe = '6 caractères minimum.';
    if (form.mot_de_passe && form.mot_de_passe !== form.confirmation_mot_de_passe) {
      newErrors.confirmation_mot_de_passe = 'Les mots de passe ne correspondent pas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const dataToUpdate = { ...form };
      if (!dataToUpdate.mot_de_passe) {
        delete dataToUpdate.mot_de_passe;
        delete dataToUpdate.confirmation_mot_de_passe;
      }

      await axios.put(`${API_URL}/utilisateur/${utilisateur.id}`, dataToUpdate);
      onUserUpdated(); // callback pour rafraîchir la liste
      onClose();
      alert("Utilisateur modifié avec succès !");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrors({ api: "Erreur lors de la modification." });
    }
  };

  if (!show) return null;

  return (
    <div className="modal modal-open z-30">
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-bold">Modifier l'utilisateur</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">Prénom *</label>
              <input name="prenom" onChange={handleChange} value={form.prenom} className={`input input-bordered ${errors.prenom ? 'input-error' : ''}`} />
              {errors.prenom && <span className="text-error">{errors.prenom}</span>}
            </div>

            <div className="form-control">
              <label className="label">Nom *</label>
              <input name="nom" onChange={handleChange} value={form.nom} className={`input input-bordered ${errors.nom ? 'input-error' : ''}`} />
              {errors.nom && <span className="text-error">{errors.nom}</span>}
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">Email *</label>
              <input type="email" name="email" onChange={handleChange} value={form.email} className={`input input-bordered ${errors.email ? 'input-error' : ''}`} />
              {errors.email && <span className="text-error">{errors.email}</span>}
            </div>

            <div className="form-control">
              <label className="label">Rôle *</label>
              <select name="role" value={form.role} onChange={handleRoleChange} className={`select select-bordered ${errors.role ? 'select-error' : ''}`}>
                <option value="">Choisir un rôle</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="fournisseur">Fournisseur</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">Statut</label>
              <input name="statut" value={form.statut} readOnly className="input input-bordered bg-base-200" />
            </div>

            <div className="form-control md:col-span-2">
              <label className="label">Société (optionnel)</label>
              <input name="societe" className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label">Nouveau mot de passe</label>
              <input type="password" name="mot_de_passe" onChange={handleChange} value={form.mot_de_passe} className={`input input-bordered ${errors.mot_de_passe ? 'input-error' : ''}`} />
              {errors.mot_de_passe && <span className="text-error">{errors.mot_de_passe}</span>}
            </div>

            <div className="form-control">
              <label className="label">Confirmation</label>
              <input type="password" name="confirmation_mot_de_passe" onChange={handleChange} value={form.confirmation_mot_de_passe} className={`input input-bordered ${errors.confirmation_mot_de_passe ? 'input-error' : ''}`} />
              {errors.confirmation_mot_de_passe && <span className="text-error">{errors.confirmation_mot_de_passe}</span>}
            </div>
          </div>

          {errors.api && (
            <div className="alert alert-error mt-4">
              <div className="flex-1">{errors.api}</div>
            </div>
          )}

          <div className="modal-action">
            <button type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}>
              {isSubmitting ? 'Modification...' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
