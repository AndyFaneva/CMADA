import React from 'react';

export default function FournisseurCommande() {
  return (
    <div className="h-full p-6 bg-base-200">
    <section id="orders-section" className="p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-800">Gestion des commandes</h1>
        <p className="text-base-600">Suivez et gérez vos commandes professionnelles</p>
      </div>

      <div className="bg-base-100 shadow rounded-box overflow-hidden">
        <div className="px-6 py-4 border-b border-base-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-base-content">Historique des commandes</h2>
              <p className="text-sm text-base-content opacity-70">Consultez l'état de vos commandes passées</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>N° Commande</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "#CMD-2023-456", date: "15/06/2023", montant: "1,245€", statut: "Livré", color: "success" },
                { id: "#CMD-2023-457", date: "18/06/2023", montant: "890€", statut: "En cours", color: "warning" },
                { id: "#CMD-2023-458", date: "20/06/2023", montant: "2,150€", statut: "Préparation", color: "info" },
                { id: "#CMD-2023-459", date: "22/06/2023", montant: "1,780€", statut: "En attente", color: "neutral" },
              ].map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.montant}</td>
                  <td>
                    <span className={`badge badge-${order.color} badge-sm`}>{order.statut}</span>
                  </td>
                  <td>
                    <button className="text-blue-600 hover:text-blue-900 mr-5">Détails</button>
                    <button className="text-blue-600 hover:text-blue-900">Facture</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-base-300">
          <div className="flex justify-between items-center">
            <p className="text-sm text-base-content opacity-70">
              Affichage de <span className="font-medium">1</span> à <span className="font-medium">4</span> sur <span className="font-medium">12</span> commandes
            </p>
            <div className="join">
              <button className="join-item btn btn-sm">
                <i className="fas fa-chevron-left" />
              </button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
