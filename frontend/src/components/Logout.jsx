import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut(){
    const navigate = useNavigate();
    const handleLogout = () => {
        const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
        if (confirmLogout) {
          localStorage.removeItem('token'); // Supprime le token
          navigate('/'); // Redirige vers la page de connexion
        }
      };
    return(
<button  onClick={handleLogout}>
                    Déconnexion
                    </button>
    );
}