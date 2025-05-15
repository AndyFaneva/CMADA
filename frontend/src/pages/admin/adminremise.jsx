import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import UtilisateurModal from "../../components/UtilisateurModal";
import ModifierUtilisateurModal from "../../components/ModifierUtilisateurModal";

export default function AdminRemise() {
  const [remises, setremises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // État de chargement
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    fetchremises();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModalVisible(true);
  };

  const handleUserUpdated = () => {
    fetchremises();
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
    setremises((prev) =>
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

  //SUPRIMER DES remises
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
      setremises((prev) => prev.filter((user) => user.id !== userId));
      setMessage("Utilisateur supprimé avec succès");
  
      // Message temporaire
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error("Erreur:", error);
      setMessage(error.message);
      setTimeout(() => setMessage(''), 5000);
    }
  };
  
  // Fonction pour récupérer les remises
  const fetchremises = async () => {
    try {
      const response = await fetch(`${API_URL}/utilisateur`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des remises');
      }
      const data = await response.json();
      setremises(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage(error.message);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  useEffect(() => {
    fetchremises();
  }, []);

  // Fonction pour ajouter un nouvel utilisateur
  const handleUserAdded = (newUser) => {
    setremises((prevremises) => [...prevremises, newUser]);
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

  // Filtrer les remises en fonction du terme de recherche
  const filteredremises = remises.filter(user => {
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
          <h1 className="text-2xl font-bold">Gestion des Remises</h1>
          <p className="text-gray-600">Créez et gérez vos règles de remises personnalisées</p>
        </div>

        {/* Carte principale */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-6">
            {/* Barre de recherche et bouton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Règles de Remise</h2>
                <p className="text-sm text-gray-500">Configurez des remises automatiques</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Nouvel utilisateur
                </button>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="bg-base-300">NOM</th>
                    <th className="bg-base-300">TYPE</th>
                    <th className="bg-base-300">VALEUR</th>
                    <th className="bg-base-300">APPLICABILITE</th>
                    <th className="bg-base-300">STATUT</th>
                    <th className="bg-base-300">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        Chargement des remises...
                      </td>
                    </tr>
                  ) : filteredremises.length > 0 ? (
                    filteredremises.map((user) => (
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

                              {/* Ajouter le bouton Supprimer pour les remises de type client ou fournisseur */}
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
                        Aucun remise trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
