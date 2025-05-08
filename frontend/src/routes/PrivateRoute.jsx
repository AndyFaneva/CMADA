import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Vérification du token:', token);
    setIsAuthorized(!!token);
  }, []);

  if (isAuthorized === null) {
    return <div>Chargement...</div>; // ou un spinner
  }

  return isAuthorized ? children : <Navigate to="/404" replace />;
};

export default PrivateRoute;
