import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import axios from "axios";

export default function ModifierProduitModal({ show, onClose, message, onUserAdded }) {
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
        <h2 className="text-xl font-bold">Ajouter un nouveau produit</h2>
        <button onClick={onClose} className="btn btn-sm btn-circle">✕</button>
      </div>
  
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne gauche */}
          <div>
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">Informations de base</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Nom du produit *</label>
                  <input type="text" id="product-name" className="input input-bordered w-full" />
                </div>
                <div>
                  <label htmlFor="product-reference" className="block text-sm font-medium text-gray-700">Référence *</label>
                  <input type="text" id="product-reference" className="input input-bordered w-full" />
                </div>
                <div>
                  <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="product-description" rows="3" className="textarea textarea-bordered w-full"></textarea>
                </div>
              </div>
            </div>
  
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">Prix et stock</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">Prix HT *</label>
                  <div className="relative">
                    <input type="number" step="0.01" id="product-price" className="input input-bordered w-full pr-10" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">€</div>
                  </div>
                </div>
                <div>
                  <label htmlFor="product-tax" className="block text-sm font-medium text-gray-700">TVA *</label>
                  <select id="product-tax" className="select select-bordered w-full">
                    <option value="5.5">5.5%</option>
                    <option value="10" selected>10%</option>
                    <option value="20">20%</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="product-stock" className="block text-sm font-medium text-gray-700">Stock *</label>
                  <input type="number" id="product-stock" className="input input-bordered w-full" />
                </div>
                <div>
                  <label htmlFor="product-min-stock" className="block text-sm font-medium text-gray-700">Stock d'alerte</label>
                  <input type="number" id="product-min-stock" className="input input-bordered w-full" />
                </div>
              </div>
            </div>
          </div>
  
          {/* Colonne droite */}
          <div>
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">Catégorie et statut</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">Catégorie *</label>
                  <select id="product-category" className="select select-bordered w-full">
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="chocolat">Chocolat</option>
                    <option value="fèves">Fèves de cacao</option>
                    <option value="praliné">Praliné</option>
                    <option value="accessoires">Accessoires</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="product-status" className="block text-sm font-medium text-gray-700">Statut *</label>
                  <select id="product-status" className="select select-bordered w-full">
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="preorder">Précommande</option>
                    <option value="outofstock">Rupture</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">Images du produit</h4>
              <label htmlFor="product-image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-base-100 hover:bg-base-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour télécharger</span></p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                </div>
                <input type="file" id="product-image" className="hidden" accept="image/*" />
              </label>
              <div id="product-image-preview" className="mt-3 grid grid-cols-3 gap-2 hidden"></div>
            </div>
  
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">Caractéristiques</h4>
              <div id="product-features-container" className="space-y-2"></div>
              <button type="button" className="btn btn-outline btn-sm mt-2">
                <i className="fas fa-plus mr-1"></i> Ajouter une caractéristique
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  );
}
