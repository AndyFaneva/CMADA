import React from "react";
import { useNavigate } from "react-router-dom";

export default function Accueil(){
  const navigate = useNavigate();
    return(
        <>
           <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Bienvenu sur C'MADA Pro</h1>
      <div className="flex justify-center items-center" >
      <img src="Cmada.png" alt="logo" width={100} />
      </div>
      <p className="py-6">
        Commencer à vous connecter avec votre compte professionnel.
      </p>
      <button className="btn btn-neutral" onClick={()=>navigate('/login')}>Commencer</button>
    </div>
  </div>
</div>
        </>
    );
}