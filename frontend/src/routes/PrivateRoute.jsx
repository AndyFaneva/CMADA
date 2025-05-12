import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const PrivateRoute = ({ children, roleAttendu }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log('[PrivateRoute] Token récupéré :', token);

      if (!token) {
        console.log('[PrivateRoute] Aucun token trouvé');
        setIsAuthorized(false);
        return;
      }

      try {
        console.log('[PrivateRoute] Vérification du token en cours...');
        const response = await axios.post(`${API_URL}/auth/verify-token`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('[PrivateRoute] Réponse complète du backend :', response);
        console.log('[PrivateRoute] Réponse du backend :', response.data);

        const { role } = response.data;
        console.log('[PrivateRoute] Rôle reçu :', role, '| Rôle attendu :', roleAttendu);

        if (role === roleAttendu) {
          console.log('[PrivateRoute] Accès autorisé ✅');
          setIsAuthorized(true);
        } else {
          console.log('[PrivateRoute] Rôle non autorisé ❌');
          setIsAuthorized(false);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('[PrivateRoute] Erreur lors de la vérification du token ❌', error);
        localStorage.removeItem('token');
        setIsAuthorized(false);
      }
    };

    verifyToken();
  }, [roleAttendu]);

  if (isAuthorized === null) {
    return <div>Chargement...</div>;
  }

  return isAuthorized ? children : <Navigate to="/nonautoriser" replace />;
};

export default PrivateRoute;
