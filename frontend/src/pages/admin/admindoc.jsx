import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import UtilisateurModal from "../../components/UtilisateurModal";
import ModifierUtilisateurModal from "../../components/ModifierUtilisateurModal";

export default function AdminDoc() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // État de chargement
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModalVisible(true);
  };

  const handleUserUpdated = () => {
    fetchUtilisateurs();
    setShowModalVisible(false);
  };




//CHANGER STATUT
const toggleUserStatus = async (userId, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/utilisateur/${userId}/statut`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statut: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Échec de la mise à jour du statut");
    }

    // Met à jour localement la liste
    setUtilisateurs((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, statut: newStatus } : user
      )
    );
    setMessage("Statut mis à jour avec succès");
    setTimeout(() => setMessage(''), 5000);
  } catch (error) {
    console.error("Erreur:", error);
    setMessage(error.message);
    setTimeout(() => setMessage(''), 5000);
  }
};

  //SUPRIMER DES UTILISATEURS
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`${API_URL}/utilisateur/${userId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }
  
      // Mettre à jour la liste sans l'utilisateur supprimé
      setUtilisateurs((prev) => prev.filter((user) => user.id !== userId));
      setMessage("Utilisateur supprimé avec succès");
  
      // Message temporaire
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage(error.message);
      setTimeout(() => setMessage(''), 5000);
    }
  };
  
  // Fonction pour récupérer les utilisateurs
  const fetchUtilisateurs = async () => {
    try {
      // const response = await fetch(`${API_URL}/utilisateur`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs');
      }
      const data = await response.json();
      setUtilisateurs(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage(error.message);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  // Fonction pour ajouter un nouvel utilisateur
  const handleUserAdded = (newUser) => {
    setUtilisateurs((prevUtilisateurs) => [...prevUtilisateurs, newUser]);
    setMessage("Utilisateur ajouté avec succès");
    setTimeout(() => setMessage(''), 5000);
  };

  // Obtenir la classe du badge en fonction du rôle
  const getBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800";
      case "fournisseur":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800";
      case "client":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800";
      default:
        return "badge badge-ghost";
    }
  };

  // Obtenir la classe du badge en fonction du statut
  const getBadgeStatut = (statut) => {
    switch (statut) {
      case "actif":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800";
      case "inactif":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800";
      default:
        return "badge badge-warning";
    }
  };

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUtilisateurs = utilisateurs.filter(user => {
    // Vérifier si 'user' est défini
    if (!user) return false;
  
    // Si 'user' est défini, on vérifie les propriétés nom, email et role
    return (
      user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="h-full p-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-gray-600">Gérez vos bons de commande et factures</p>
        </div>

        {/* Carte principale */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-6">
            {/* Barre de recherche et bouton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Historique des documents</h2>
                <p className="text-sm text-gray-500">Bons de commandes et factures générés</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  className="btn btn-neutral"
                  onClick={() => setShowModal(true)}
                >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h10v-5a1 1 0 112 0v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm11-1a1 1 0 011 1v3.586l-1.293-1.293a1 1 0 00-1.414 1.414L15.414 10l-3.121 3.121a1 1 0 001.414 1.414L16 11.414V15a1 1 0 102 0V4a1 1 0 00-1-1h-3z" clipRule="evenodd" />
</svg>

                  Exporter
                </button>
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="bg-base-300">TYPE</th>
                    <th className="bg-base-300">N° DOCUMENT</th>
                    <th className="bg-base-300">DATE</th>
                    <th className="bg-base-300">CLIENT</th>
                    <th className="bg-base-300">MONTANT</th>
                    <th className="bg-base-300">STATUT</th>
                    <th className="bg-base-300">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        Chargement des documents...
                      </td>
                    </tr>
                  ) : filteredUtilisateurs.length > 0 ? (
                    filteredUtilisateurs.map((user) => (
                      <tr key={user.id} className="hover:bg-base-200">
                        <td>
                          <div className="font-bold">{user.nom}</div>
                          <div className="text-sm text-gray-500">{user.prenom}</div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={getBadgeClass(user.role)}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.societe || '-'}</td>
                        <td>
                          <span className={getBadgeStatut(user.statut)}>
                            {user.statut}
                          </span>
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 mr-3"
                            onClick={() => handleEditClick(user)}
                            >Modifier</button>
                            {user.statut === "actif" ? (
                             <button
                             className="text-yellow-600 hover:text-yellow-900 mr-3"
                             onClick={() => toggleUserStatus(user.id, "inactif")}
                             >
                              Désactiver
                            </button>
                            ) : (
                             <button
                             className="text-yellow-600 hover:text-yellow-900 mr-3"
                               onClick={() => toggleUserStatus(user.id, "actif")}
                             >
                            Activer
                               </button>
                            )}

                              {/* Ajouter le bouton Supprimer pour les utilisateurs de type client ou fournisseur */}
                            {(user.role === 'client' || user.role === 'fournisseur') && (
                             <button className="text-red-600 hover:text-red-900"
                             onClick={() => handleDeleteUser(user.id)}>
                             Supprimer
                            </button>
                        )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        Aucun document trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-base-300">
              <div className="text-sm mb-4 sm:mb-0">
                Affichage de <span className="font-bold">1</span> à <span className="font-bold">{filteredUtilisateurs.length}</span> sur <span className="font-bold">{utilisateurs.length}</span> utilisateurs
              </div>
              <div className="btn-group">
                <button className="btn btn-sm">«</button>
                <button className="btn btn-sm btn-active">1</button>
                <button className="btn btn-sm">»</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModifierUtilisateurModal
        show={showModalVisible}
        onClose={() => setShowModalVisible(false)}
        utilisateur={selectedUser}
        onUserUpdated={handleUserUpdated}
      />
      <UtilisateurModal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={message}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
}
