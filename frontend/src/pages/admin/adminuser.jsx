import React from "react";
const user = [
  {
    id: 1,nom: 'Jane',email: 'jane@gmail.com',role: 'administrateur',societe: "",statut: 'actif',
  },
    {
      id: 2,nom: 'Faneva',email: 'fanevahasintsoa@gmail.com',role: 'client',societe: "",statut: 'inactif',
    },
    // More user...
  ]
  const getBadgeClass = (role) => {
    switch (role) {
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
export default function AdminUser(){
  return (
    <div className="h-full overflow-auto bg-base-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-base-200"> 
    <div className=" bg-base-200 h-auto place-items-left">
  <div className="bg-base-200 h-20 place-items-left m-5 p-5">
    <h1 className="font-bold">Gestion des Utilisateurs</h1>
    <p>Créez et gérez les utilisateurs de votre plateforme</p>
  </div>
  </div>
  <div className=" max-w-7xl mx-auto">
  {/* tableau */}
  <div className=" ">
  <div>
    <div className="max-h-[200px]border-gray-200 mb-5">
    <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between bg-base-100">
            <div className="flex flex-col">
                <h1>Liste des Utilisateurs</h1>
                <p>Administration des comptes utilisateurs</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-non">
                        <i className="fas fa-search text-base-500">

                        </i>
                    </div>
                    <input type="text" id="user-search"
                    placeholder="Rechercher un utilisateur ..."
                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-base-100 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <button className="btn btn-primary">+ Nouvel utilisateur</button>
            </div>
        </div>
        <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    
    {/* head */}
    <thead className="bg-base-300">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOM</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOCIETE</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUT</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
      </tr>
    </thead>
    <tbody className="bg-base-100" id="user-list">
      {/* row 1 */}
      {user.map((item, index)=>(
      <tr key={item.id || index}>
        <th>{item.nom}</th>
        <td>{item.email}</td>
        <td>
          <span className={getBadgeClass(item.role)}> 
          {item.role} </span></td>
        <td>{item.societe}</td>
        <th>{item.statut}</th>
        <th>
          <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs ">Modifier</button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-1 px-2 rounded text-xs">Activer</button>
          </div>
        </th>
      </tr>
      ))}
    </tbody>
  </table>
  </div>
  <div className="x-6 py-4 border-t border-gray-200 bg-base-100">
    <div className="flex justify-between items-center bg-base-100">
        <div>
            <p>Affichage de
            <span>1</span>
            à
            <span>2</span>
            sur
            <span>2</span>
            utilisateurs
            </p>
        </div>
        <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"></button>
                <span>Page 1</span>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"></button>
            </nav>
        </div>
    </div>
  </div>
  </div>
</div>
  </div>
</div>
</div>
</div>
  )
}
