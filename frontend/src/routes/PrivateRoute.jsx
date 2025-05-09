import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../services/authService'; // adapte le chemin

const PrivateRoute = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await verifyToken();

      if (userData && userData.role === requiredRole) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  if (isAuthorized === null) {
    return <div>Chargement...</div>;
  }

  return isAuthorized ? children : <Navigate to="/nonautoriser" replace />;
};

export default PrivateRoute;
