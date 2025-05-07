import React from "react";
const products = [
  {
    id: 1,produit: 'Chocolat',ref: 'PRO-A-2023',statut: 'Disponible',dispo: "13",price: '35',
  },
    {
      id: 2,produit: 'Chocolat',ref: 'PRO-B-2023',statut: 'Précommande',dispo: "1",price: '10',
    },
    {
      id: 3,produit: 'Chocolat',ref: 'PRO-C-2023',statut: 'Arrivages',dispo: "13",price: '50',
    },
    {
      id: 3,produit: 'Chocolat',ref: 'PRO-C-2023',statut: 'Déstockage',dispo: "13",price: '50',
    },
    {
      id: 3,produit: 'Chocolat',ref: 'PRO-C-2023',statut: 'Echantillons',dispo: "13",price: '50',
    },
    // More products...
  ]
  const getBadgeClass = (statut) => {
    switch (statut) {
      case "Disponible":
        return "badge badge-accent";
      case "Précommande":
        return "badge badge-primary";
      case "Arrivages":
        return "badge badge-warning";
      case "Déstockage":
        return "badge badge-error";
      case "Echantillons":
        return "badge badge-success";
      default:
        return "badge badge-neutral";
    }
  };
export default function Product(){
  return (
    <div className="flex w-full flex-col"> 
    <div className=" bg-base-200 h-auto place-items-left">
      {/* Catalogue */}
  <div className="bg-base-200 h-20 place-items-left m-5 p-5">
    <h1 className="font-bold">Catalogue Produits</h1>
    <p>Découvrez notre gamme complète de produits professionnels.</p>
  </div>
  {/* Barre de recherche */}
  <div className="bg-base-200 h-auto place-items-left m-5 p-5">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <label className="input input-bordered flex items-center gap-2 w-10-full">
  <input type="text" className="grow" placeholder="Search" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
    <div className="felx gap-2 ">
    <button className="filter-btn active px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border-blue-300 m-2">Tous</button>
    <button className="filter-btn px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 m-2">Précommande</button>
    <button className="filter-btn px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 m-2">Arrivages</button>
    <button className="filter-btn px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 m-2">Disponible</button>
    <button className="filter-btn px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 m-2">Déstockage</button>
    <button className="filter-btn px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 m-2">Echantillons</button>
    </div>
    </div>
  </div>
  </div>
  <div className="flex flex-col lg:flex-row gap-6 bg-base-200 px-5">
    {/* fitre */}
    <div className="lg:w-1/4">
    <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <h1>Filtrer</h1>
      </div>
    </div>
  </div>
  {/* tableau */}
  <div className=" lg:w-4/6 ">
  <div className="overflow-x-auto">
    <div className="max-h-[200px] overflow-y-auto  border-gray-200 mb-5">
  <table className="table min-w-full bg-base-100">
    {/* head */}
    <thead>
      <tr>
        <th className="font-bold bg-base-100">Produit</th>
        <th>Référence</th>
        <th>Statut</th>
        <th>Disponibilité</th>
        <th>Prix</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {products.map((item)=>(
      <tr key={item.id}>
        <th>{item.produit}</th>
        <td>{item.ref}</td>
        <td>
          <span className={getBadgeClass(item.statut)}> 
          {item.statut} </span></td>
        <td>Stock: {item.dispo}</td>
        <th>{item.price}</th>
        <th>
          <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs ">Commander</button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-1 px-2 rounded text-xs">Détails</button>
          </div>
        </th>
      </tr>
      ))}
    </tbody>
  </table>
  </div>
</div>
  </div>
  {/* panier */}
  <div className="lg:w-1/4">
    <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-md overflow-hidden mx-5">
     <div className="p-5">
      <h1>Votre panier</h1>
     </div>
    </div>
  </div>
</div>
</div>
  )
}
