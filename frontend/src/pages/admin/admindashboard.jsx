import React from 'react';

const AdminDashboard = () => {
  const showSection = (sectionId) => {
    // Fonction personnalisée pour gérer la navigation (à adapter selon ton routeur)
    console.log(`Afficher la section : ${sectionId}`);
  };

  return (
    <div className="h-full p-6 bg-base-200">
    <section id="dashboard-section" className="page-section">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-800">Tableau de bord</h1>
        <p className="text-base-600">Bienvenue sur votre espace professionnel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Commandes ce mois',
            value: '24',
            icon: 'fa-shopping-bag',
            color: 'blue',
          },
          {
            label: "Chiffre d'affaires",
            value: '3,450€',
            icon: 'fa-euro-sign',
            color: 'green',
          },
          {
            label: 'Nombre d\'utilisateur',
            value: '8',
            icon: 'fa-star',
            color: 'yellow',
          },
          {
            label: 'Remises actives',
            value: '3',
            icon: 'fa-tag',
            color: 'purple',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-base-100 p-6 rounded-lg shadow-sm border-l-4 border-${stat.color}-500`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                <i className={`fas ${stat.icon} text-${stat.color}-600`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-base-800">Dernières commandes</h2>
            <button
              onClick={() => showSection('orders-section')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Voir tout
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-base-200">
              <thead className="bg-base-50">
                <tr>
                  {['N° Commande', 'Date', 'Montant', 'Statut'].map((header, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-base-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-base-100 divide-y divide-gray-200">
                {[
                  {
                    id: '#CMD-2023-456',
                    date: '15/06/2023',
                    amount: '1,245€',
                    status: 'Livré',
                    bg: 'green',
                  },
                  {
                    id: '#CMD-2023-457',
                    date: '18/06/2023',
                    amount: '890€',
                    status: 'En cours',
                    bg: 'yellow',
                  },
                  {
                    id: '#CMD-2023-458',
                    date: '20/06/2023',
                    amount: '2,150€',
                    status: 'Préparation',
                    bg: 'blue',
                  },
                ].map((order, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-500">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${order.bg}-100 text-${order.bg}-800`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-base-800">Produits récemment ajoutés</h2>
            <button
              onClick={() => showSection('catalog-section')}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {['Produit A', 'Produit B', 'Produit C'].map((product, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 overflow-hidden">
                  <img
                    src="https://chocolaterierobert.fr/web/image/24858/Chocolat_Madagascar-redim.jpg"
                    alt="Product"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-base-900">{product}</h3>
                  <p className="text-sm text-base-500">Réf: PROD-{String.fromCharCode(65 + idx)}-00{idx + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AdminDashboard;
