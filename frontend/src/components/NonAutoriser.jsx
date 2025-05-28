import React from 'react';

const NonAutoriser = () => {
  return (
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600"><h1>⛔ Accès refusé</h1><br /></p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
               <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
            </h1> 
          </div>
        </main>
  );
};

export default NonAutoriser;
