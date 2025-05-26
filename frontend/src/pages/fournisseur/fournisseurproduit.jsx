import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import {Edit3} from "lucide-react";
import ModifierProduitModal from "../../components/ModifierProduitModal";

export default function FournisseurProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleProductUpdated = () => {
    fetchProduits();
    setIsModalOpenVisible(false);
  };
  // Fonction pour récupérer les produist
  const fetchProduits = async () => {
    try {
      const response = await fetch(`${API_URL}/produits`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage(error.message);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

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

  // Filtrer les produits en fonction du terme de recherche
  const filteredProduits = produits.filter(product => {
    // Vérifier si 'product' est défini
    if (!product) return false;
  
    // Si 'product' est défini, on vérifie les propriétés nom, email et role
    return (
      product.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categorie_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

    //SUPRIMER DES PRODUITS
    const handleDeleteProduct = async (productId) => {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
      if (!confirmDelete) return;
    
      try {
        const response = await fetch(`${API_URL}/produits/${productId}`, {
          method: "DELETE",
        });
    
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du produits");
        }
    
        // Mettre à jour la liste sans le produit supprimé
        setProduits((prev) => prev.filter((product) => product.id !== productId));
        setMessage("Produit supprimé avec succès");
    
        // Message temporaire
        setTimeout(() => setMessage(''), 5000);
      } catch (error) {
        console.error("Erreur:", error);
        setMessage(error.message);
        setTimeout(() => setMessage(''), 5000);
      }
    };

  return (
    <div className="h-full p-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Gestion des Produits</h1>
          <p className="text-gray-600">Créez et gérez vos produits</p>
        </div>

        {/* Carte principale */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-6">
            {/* Barre de recherche et bouton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Liste des Produits</h2>
                <p className="text-sm text-gray-500">Création et modification des produits</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
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
                    <th className="bg-base-300">IMAGE</th>
                    <th className="bg-base-300">REFERENCE</th>
                    <th className="bg-base-300">NOM</th>
                    <th className="bg-base-300">CATEGORIE</th>
                    <th className="bg-base-300">PRIX</th>
                    <th className="bg-base-300">STOCK</th>
                    <th className="bg-base-300">STATUT</th>
                    <th className="bg-base-300">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        Chargement des produits...
                      </td>
                    </tr>
                  ) : filteredProduits.length > 0 ? (
                    filteredProduits.map((product) => (
                      <tr key={product.id} className="hover:bg-base-200">
                        <td>
                          <div className="font-bold">{product.image}</div>
                        </td>
                        <td>REF-{product.reference}</td>
                        <td>{product.nom}</td>
                        <td>{product.categorie?.nom}</td>
                        <td>{product.prix}</td>
                        <td>
                            {product.stock}
                        </td>
                        <td>{product.statut}</td>
                        <td>
                          <div className="flex space-x-2">
                            {/* BOUTTON MODIFIER */}
                          <button className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={()=>setIsModalOpen(true)}>
                          <Edit3 className="h-5 w-5"/>
                          </button>

                          <button
  onClick={() => handleDeleteProduct(product.id)}
  className="text-red-600 hover:text-red-900 mr-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
    />
  </svg>
</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        Aucun produit trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-base-300">
              <div className="text-sm mb-4 sm:mb-0">
                Affichage de <span className="font-bold">1</span> à <span className="font-bold">{filteredProduits.length}</span> sur <span className="font-bold">{produits.length}</span> produits
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

      <ModifierProduitModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        produit={selectedProduct}
        onProductUpdated={handleProductUpdated}
      />
    </div>
  );
}
