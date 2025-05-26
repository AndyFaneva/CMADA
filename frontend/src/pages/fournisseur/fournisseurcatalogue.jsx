import React from "react";

const FournisseurCatalogue = () => {
  const filterProducts = (filter) => {
    console.log("Filtrer par:", filter);
    // Implémentation ici
  };

  const addToCart = (ref) => {
    console.log("Ajouter au panier:", ref);
    // Implémentation ici
  };

  const showProductDetails = (ref) => {
    console.log("Afficher détails pour:", ref);
    // Implémentation ici
  };

  return (
    <div className="h-full p-6 bg-base-200">
    <section id="catalog-section" className="page-section">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-base-800">Catalogue Produits</h1>
        <p className="text-base-600">
          Découvrez notre gamme complète de produits professionnels
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-base-400"></i>
            </div>
            <input
              type="text"
              id="search-products"
              className="block w-full pl-10 pr-3 py-2 border border-base-300 rounded-md leading-5 bg-base placeholder-base-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Rechercher un produit..."
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {["all", "preorder", "arrival", "available", "clearance", "sample"].map((filter) => (
              <button
                key={filter}
                onClick={() => filterProducts(filter)}
                className={`filter-btn px-4 py-2 border border-base-300 rounded-md text-sm font-medium ${
                  filter === "all"
                    ? "bg-blue-50 text-blue-700 border-blue-300"
                    : "text-base-700 hover:bg-base-50"
                }`}
              >
                {{
                  all: "Tous",
                  preorder: "Précommande",
                  arrival: "Arrivages",
                  available: "Disponible",
                  clearance: "Déstockage",
                  sample: "Échantillons",
                }[filter]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtres par catégorie */}
        <div className="lg:w-1/6">
          <div className="bg-base p-4 rounded-lg shadow">
            <h3 className="font-bold mb-3">Filtrer par catégorie</h3>
            <ul className="space-y-2">
              {[
                ["all", "Tous les produits"],
                ["chocolat", "Chocolats"],
                ["patisserie", "Pâtisserie"],
                ["equipement", "Équipement"],
                ["materiel", "Matériel"],
                ["promo", "Promotions"],
              ].map(([group, label]) => (
                <li key={group}>
                  <button
                    className={`group-filter text-base-700 hover:text-blue-600 ${
                      group === "all" ? "text-blue-600" : ""
                    }`}
                    data-group={group}
                    onClick={() => console.log("Filtre groupe:", group)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tableau des produits */}
        <div className="lg:w-4/6">
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto border border-base-200">
              <table className="min-w-full bg-base border border-base-200">
                <thead>
                  <tr className="bg-base-100">
                    <th className="py-2 px-4 border-b text-left">Produit</th>
                    <th className="py-2 px-4 border-b text-left">Référence</th>
                    <th className="py-2 px-4 border-b text-left">Statut</th>
                    <th className="py-2 px-4 border-b text-left">Disponibilité</th>
                    <th className="py-2 px-4 border-b text-left">Prix</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Chocolats */}
                  <tr className="bg-base-50">
                    <td colSpan="7" className="py-2 px-4 font-semibold text-base-700">Chocolats</td>
                  </tr>

                  <tr className="hover:bg-base-50 product-row" data-group="chocolat">
                    <td className="py-3 px-4 border-b">Chocolat Professionnel A</td>
                    <td className="py-3 px-4 border-b">PRO-A-2023</td>
                    <td className="py-3 px-4 border-b">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Disponible</span>
                    </td>
                    <td className="py-3 px-4 border-b">Stock: 45</td>
                    <td className="py-3 px-4 border-b font-bold">49,99€</td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToCart("PRO-A-2023")}
                          className="bg-blue-600 hover:bg-blue-700 text-base py-1 px-2 rounded text-xs"
                        >
                          Commander
                        </button>
                        <button
                          onClick={() => showProductDetails("PRO-A-2023")}
                          className="border border-base-300 hover:bg-base-50 text-base-700 py-1 px-2 rounded text-xs"
                        >
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-base-50 product-row" data-group="chocolat">
                    <td className="py-3 px-4 border-b">Chocolat Professionnel B</td>
                    <td className="py-3 px-4 border-b">PRO-B-2023</td>
                    <td className="py-3 px-4 border-b">
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Précommande</span>
                    </td>
                    <td className="py-3 px-4 border-b">Disponibilité: 15/07/2023</td>
                    <td className="py-3 px-4 border-b font-bold">79,99€</td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToCart("PRO-B-2023")}
                          className="bg-blue-600 hover:bg-blue-700 text-base py-1 px-2 rounded text-xs"
                        >
                          Précommander
                        </button>
                        <button
                          onClick={() => showProductDetails("PRO-B-2023")}
                          className="border border-base-300 hover:bg-base-50 text-base-700 py-1 px-2 rounded text-xs"
                        >
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Pâtisserie */}
                  <tr className="bg-base-50">
                    <td colSpan="7" className="py-2 px-4 font-semibold text-base-700">Pâtisserie</td>
                  </tr>

                  <tr className="hover:bg-base-50 product-row" data-group="patisserie">
                    <td className="py-3 px-4 border-b">Pâte à sucre professionnelle</td>
                    <td className="py-3 px-4 border-b">PATIS-001</td>
                    <td className="py-3 px-4 border-b">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Nouveauté</span>
                    </td>
                    <td className="py-3 px-4 border-b">Stock: 12</td>
                    <td className="py-3 px-4 border-b">
                      <span className="font-bold">64,99€</span>
                      <span className="text-xs line-through text-base-400 block">74,99€</span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addToCart("PATIS-001")}
                          className="bg-blue-600 hover:bg-blue-700 text-base py-1 px-2 rounded text-xs"
                        >
                          Commander
                        </button>
                        <button
                          onClick={() => showProductDetails("PATIS-001")}
                          className="border border-base-300 hover:bg-base-50 text-base-700 py-1 px-2 rounded text-xs"
                        >
                          Détails
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Ajoute d'autres produits ici... */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default FournisseurCatalogue;
