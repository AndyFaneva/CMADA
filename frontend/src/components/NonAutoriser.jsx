import React from 'react';

const NonAutoriser = () => {
  return (
    <div className="unauthorized flex justify-center item-center">
      <h1>⛔ Accès refusé</h1><br />
      <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
    </div>
  );
};

export default NonAutoriser;
