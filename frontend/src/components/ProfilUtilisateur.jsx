import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from '../config';
import axios from 'axios';

export default function ProfileUtilisateur() {
  const fileInputRef = useRef(null);
  const [passwordData, setPasswordData] = useState({
    mot_de_passe_actuel: '',
    nouveau_mot_de_passe: '',
    confirmation_nouveau_mot_de_passe: ''
  });
  
  const [profile, setProfile] = useState({
    id: null,
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    poste: '',
    statut: '',
    role: '',
    image_profil: null
  });
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Gestion des changements de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Récupération du profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Utilisateur non connecté');
        
        const response = await axios.get(`${API_URL}/utilisateur/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  // Mise à jour de l'image de profil
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image_profil', file);
      
      const response = await axios.put(
        `${API_URL}/utilisateur/${profile.id}/photo`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setProfile(prev => ({ ...prev, image_profil: response.data.image_profil }));
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const payload = { ...profile };
      
      // Si changement de mot de passe
      if (passwordData.nouveau_mot_de_passe) {
        payload.mot_de_passe_actuel = passwordData.mot_de_passe_actuel;
        payload.nouveau_mot_de_passe = passwordData.nouveau_mot_de_passe;
        payload.confirmation_nouveau_mot_de_passe = passwordData.confirmation_nouveau_mot_de_passe;
      }
      
      await axios.put(`${API_URL}/utilisateur/${profile.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Profil mis à jour avec succès');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div className="text-error">{error}</div>;

  return (
    <section className="px-4 py-8 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Votre Profil Professionnel</h1>
          <p>Gérez vos informations personnelles et professionnelles</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Informations du Compte</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Colonne de gauche - Photo de profil */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={profile.image_profil 
                      ? `${API_URL}/uploads/${profile.image_profil}`
                      : '/user.png'}
                    alt="Photo de profil"
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 btn btn-sm btn-circle btn-primary"
                  >
                    <i className="fas fa-camera"></i>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <h3 className="text-lg font-medium">
                  {profile.prenom} {profile.nom}
                </h3>
                {profile.poste && <p className="text-sm">{profile.poste}</p>}
                      <div className="mt-4 w-full">
                  <h4 className="font-medium mb-2">Votre activité</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Commandes ce mois:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dernière connexion:</span>
                      <span className="font-medium" id="last-login">Aujourd'hui, 14:32</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne de droite - Formulaire */}
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Prénom</label>
                      <input 
                        type="text" 
                        name="prenom" 
                        className="input input-bordered w-full" 
                        value={profile.prenom} 
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label className="label">Nom</label>
                      <input 
                        type="text" 
                        name="nom" 
                        className="input input-bordered w-full" 
                        value={profile.nom}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Email professionnel</label>
                    <input 
                      type="email" 
                      name="email"
                      className="input input-bordered w-full"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">Téléphone</label>
                    <input 
                      type="tel" 
                      name="telephone"
                      className="input input-bordered w-full" 
                      value={profile.telephone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">Entreprise</label>
                    <input 
                      type="text" 
                      name="entreprise"
                      className="input input-bordered w-full" 
                      value={profile.entreprise}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">Poste</label>
                    <input 
                      type="text" 
                      name="poste"
                      className="input input-bordered w-full" 
                      value={profile.poste}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Section mot de passe */}
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-3">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Mot de passe actuel</label>
                        <input 
                          type="password" 
                          name="mot_de_passe_actuel"
                          className="input input-bordered w-full" 
                          value={passwordData.mot_de_passe_actuel}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div>
                        <label className="label">Nouveau mot de passe</label>
                        <input 
                          type="password" 
                          name="nouveau_mot_de_passe"
                          className="input input-bordered w-full" 
                          value={passwordData.nouveau_mot_de_passe}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div>
                        <label className="label">Confirmer le nouveau mot de passe</label>
                        <input 
                          type="password" 
                          name="confirmation_nouveau_mot_de_passe"
                          className="input input-bordered w-full" 
                          value={passwordData.confirmation_nouveau_mot_de_passe}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <button type="submit" className="btn btn-primary">
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}