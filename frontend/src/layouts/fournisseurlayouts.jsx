import React from "react";
import { Outlet } from "react-router-dom";

export default function FournisseurLayout(){
    return(
        <>
             <h1>Fournisseur Layout</h1>
           <main>
            <Outlet />
           </main>
        </>
    )
}