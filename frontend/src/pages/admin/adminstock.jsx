import React from "react";

const AdminStock = () => {
  return (
    <div className="h-full p-6 bg-base-200">
    <section id="inventory-section" className="page-section">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-800">Gestion du stock</h1>
        <p className="text-base-600">
          Suivez et gérez votre inventaire en temps réel
        </p>
      </div>

      <div className="bg-base-100 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-base-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-base-800">
                Inventaire des produits
              </h2>
              <p className="text-sm text-base-500">
                Statut actuel du stock et alertes
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="btn btn-neutral">
                {/* Icône Export SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h10v-5a1 1 0 112 0v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm11-1a1 1 0 011 1v3.586l-1.293-1.293a1 1 0 00-1.414 1.414L15.414 10l-3.121 3.121a1 1 0 001.414 1.414L16 11.414V15a1 1 0 102 0V4a1 1 0 00-1-1h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Exporter
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus mr-2" />
                Ajouter un produit
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-base-200 bg-base-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-base-100 p-3 rounded shadow-sm">
              <p className="text-sm text-base-500">Produits en stock</p>
              <p className="text-xl font-bold text-base-800">124</p>
            </div>
            <div className="bg-base-100 p-3 rounded shadow-sm">
              <p className="text-sm text-base-500">Produits en rupture</p>
              <p className="text-xl font-bold text-red-600">8</p>
            </div>
            <div className="bg-base-100 p-3 rounded shadow-sm">
              <p className="text-sm text-base-500">Stock moyen</p>
              <p className="text-xl font-bold text-base-800">45</p>
            </div>
            <div className="bg-base-100 p-3 rounded shadow-sm">
              <p className="text-sm text-base-500">Valeur totale</p>
              <p className="text-xl font-bold text-base-800">24,560€</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-base-200">
            <thead className="bg-base-50">
              <tr>
                {[
                  "Référence",
                  "Produit",
                  "Catégorie",
                  "Stock",
                  "Statut",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-base-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-base-100 divide-y divide-base-200">
              {[
                {
                  ref: "PRO-A-001",
                  name: "Produit Professionnel A",
                  cat: "Catégorie 1",
                  stock: 45,
                  status: { text: "Disponible", color: "green" },
                },
                {
                  ref: "PRO-B-002",
                  name: "Produit Professionnel B",
                  cat: "Catégorie 2",
                  stock: 12,
                  status: { text: "Stock faible", color: "yellow" },
                },
                {
                  ref: "PRO-C-003",
                  name: "Produit Professionnel C",
                  cat: "Catégorie 1",
                  stock: 0,
                  status: { text: "Rupture", color: "red" },
                },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-900">
                    {item.ref}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-base-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-base-500">
                    {item.cat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-base-500">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${item.status.color}-100 text-${item.status.color}-800`}
                    >
                      {item.status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-base-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Modifier
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AdminStock;
