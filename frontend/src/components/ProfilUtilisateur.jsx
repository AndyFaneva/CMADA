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
     prenom: '',
        nom: '',
        email: '',
        mot_de_passe: '',
        confirmation_mot_de_passe: '',
        role: '',
        statut:'',
        info_id:'',
  });
  const [infoDetails, setInfoDetails] =useState({
    telephone:'',
    post:'',
    entreprise:''
 });
  const [error, setError] = useState(null);
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleInfoChange2 = (e) => {
    const { name, value } = e.target;
    setInfoDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('🔑 Token récupéré :', token);
  
    if (!token) {
      setError('Utilisateur non connecté');
      console.log('❌ Pas de token, utilisateur non connecté');
      return;
    }
  
    // 1. Récupération du profil
    fetch('http://localhost:3000/utilisateur/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('📡 Réponse profil status :', res.status);
      if (!res.ok) throw new Error('Erreur lors de la récupération du profil');
      return res.json();
    })
    .then(data => {
      console.log('✅ Profil récupéré :', data);
      setProfile(data);
  
      // 2. Si info_id existe, récupération des infos complémentaires
      if (data.info_id) {
        console.log('ℹ️ info_id détecté, récupération des infos complémentaires :', data.info_id);
        return fetch(`http://localhost:3000/information/${data.info_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        console.log('⚠️ Pas d\'info_id, aucune info complémentaire à récupérer');
        setInfoDetails(null);
      }
    })
    .then(resInfo => {
      if (resInfo) {
        console.log('📡 Réponse infos complémentaires status :', resInfo.status);
        if (!resInfo.ok) throw new Error('Erreur lors de la récupération des infos complémentaires');
        return resInfo.json();
      }
    })
    .then(infoData => {
      if (infoData) {
        console.log('✅ Infos complémentaires récupérées :', infoData);
        setInfoDetails(infoData);
      }
    })
    .catch(err => {
      console.error('❌ Erreur attrapée :', err.message);
      setError(err.message);
    });
  }, []);
  

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Chargement...</div>;

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const updateProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById('profile-image').src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    document.getElementById('profile-form').reset();
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    try {
      // Construction du payload utilisateur
      const utilisateurPayload = {
        prenom: profile.prenom || "",
        nom: profile.nom || "",
        email: profile.email || "",
        statut: profile.statut || "",
        role: profile.role || "",
      };
  
      // Si les champs mot de passe sont remplis, on les ajoute
      if (
        profile.mot_de_passe_actuel && 
        profile.mot_de_passe_nouveau && 
        profile.confirmation_mot_de_passe
      ) {
        utilisateurPayload.mot_de_passe_actuel = profile.mot_de_passe_actuel;
        utilisateurPayload.mot_de_passe = profile.mot_de_passe_nouveau;
        utilisateurPayload.confirmation_mot_de_passe = profile.confirmation_mot_de_passe;
      }
  
      // Envoi de la requête PUT profil + mot de passe si applicable
      await axios.put(
        `http://localhost:3000/utilisateur/${profile.id}`,
        utilisateurPayload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Mise à jour de infoDetails comme avant
      if (profile.info_id) {
        await axios.put(
          `http://localhost:3000/information/${profile.info_id}`,
          {
            telephone: infoDetails.telephone,
            entreprise: infoDetails.entreprise,
            poste: infoDetails.poste,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }
  
      alert('Profil mis à jour avec succès');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    }
  };
  
  
  return (
    <section id="profile-section" className="px-4 py-8 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-base-800">Votre Profil Professionnel</h1>
          <p className="text-base-600">Gérez vos informations personnelles et professionnelles</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-box">
          <div className="px-6 py-4 border-b border-base-300">
            <h2 className="text-lg font-semibold text-base-content">Informations du Compte</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    id="profile-image"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Photo de profil"
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                  />
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 btn btn-sm btn-circle btn-primary"
                  >
                    <i className="fas fa-camera"></i>
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={updateProfileImage}
                  />
                </div>

                <h3 id="profile-name" className="text-lg font-medium">{profile.nom} {profile.prenom}</h3>
                {infoDetails?.poste &&  <p id="profile-role" className="text-sm text-base-content/70">{infoDetails.poste}</p>}

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

              <div className="md:col-span-2">
                <form id="profile-form" className="space-y-4"
                onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
        name="role"
        value={profile.role ?? ''}
        readOnly
      />
      <input
        name="statut"
        value={profile.statut ?? ''}
        readOnly
      />
                    <div>
                      <label className="label">Prénom</label>
                      <input type="text" name="prenom" className="input input-bordered w-full" value={profile?.prenom || ''} 
                          onChange={handleInfoChange}
                      />
                    </div>
                    
                    <div>
                      <label className="label">Nom</label>
                      <input type="text" className="input input-bordered w-full" name="nom" value={profile?.nom || ''}
                      onChange={handleInfoChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Email professionnel</label>
                    <input type="email" className="input input-bordered w-full"value={profile?.email || ''} 
                    onChange={handleInfoChange}
                    />
                  </div>

                  <div>
                    <label className="label" >Téléphone</label>
                    <input type="tel" className="input input-bordered w-full" value={infoDetails?.telephone || ''}
                      name="telephone"        onChange={handleInfoChange2}/>
                  </div>

                  <div>
                    <label className="label">Entreprise</label>
                  <input type="text" className="input input-bordered w-full" value={infoDetails?.entreprise || ''}
                   name="entreprise"          onChange={handleInfoChange2}/>
                  </div>

                  <div>
                    <label className="label">Poste</label>
                     <input type="text" className="input input-bordered w-full" value={infoDetails?.poste || ''}
                      name="poste"          onChange={handleInfoChange2}/>
                  </div>

                  <div className="pt-4 border-t border-base-300">
                    <h3 className="text-lg font-medium mb-3">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Mot de passe actuel</label>
                        <input type="password" className="input input-bordered w-full" 
                         name="mot_de_passe_actuel"
                          value={passwordData.mot_de_passe_actuel}
                          onChange={handlePasswordChange} />
                      </div>
                      <div>
                        <label className="label">Nouveau mot de passe</label>
                        <input type="password" className="input input-bordered w-full" 
                          name="nouveau_mot_de_passe"
                       value={passwordData.nouveau_mot_de_passe}
                       onChange={handlePasswordChange}
                        />
                      </div>
                      <div>
                        <label className="label">Confirmer le nouveau mot de passe</label>
                        <input type="password" className="input input-bordered w-full" 
                          name="confirmation_nouveau_mot_de_passe"
                           value={passwordData.confirmation_nouveau_mot_de_passe}
                           onChange={handlePasswordChange}/>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-base-300">
                    <button type="button" onClick={resetForm} className="btn btn-ghost mr-3">
                      Annuler
                    </button>
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