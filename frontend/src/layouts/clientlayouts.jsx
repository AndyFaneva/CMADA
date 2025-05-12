import React from "react";
import { Outlet } from "react-router-dom";

export default function ClientLayout(){
    return(
        <>
           <h1>Client Layout</h1>
           <main>
            <Outlet />
           </main>
        </>
    )
}