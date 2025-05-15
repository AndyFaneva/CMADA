import React, { useRef } from 'react';

export default function ProfileUtilisateur() {
  const fileInputRef = useRef(null);

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

  return (
    <section id="profile-section" className="px-4 py-8 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Votre Profil Professionnel</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
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

                <h3 id="profile-name" className="text-lg font-medium">Rakoto Rabe</h3>
                <p id="profile-role" className="text-sm text-base-content/70">Responsable Achats</p>

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
                <form id="profile-form" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Prénom</label>
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                    <div>
                      <label className="label">Nom</label>
                      <input type="text" className="input input-bordered w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="label">Email professionnel</label>
                    <input type="email" className="input input-bordered w-full" />
                  </div>

                  <div>
                    <label className="label">Téléphone</label>
                    <input type="tel" className="input input-bordered w-full" />
                  </div>

                  <div>
                    <label className="label">Entreprise</label>
                    <input type="text" className="input input-bordered w-full" />
                  </div>

                  <div>
                    <label className="label">Poste</label>
                    <input type="text" className="input input-bordered w-full" />
                  </div>

                  <div className="pt-4 border-t border-base-300">
                    <h3 className="text-lg font-medium mb-3">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Mot de passe actuel</label>
                        <input type="password" className="input input-bordered w-full" />
                      </div>
                      <div>
                        <label className="label">Nouveau mot de passe</label>
                        <input type="password" className="input input-bordered w-full" />
                      </div>
                      <div>
                        <label className="label">Confirmer le nouveau mot de passe</label>
                        <input type="password" className="input input-bordered w-full" />
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