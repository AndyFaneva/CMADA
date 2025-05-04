import React from "react";
import ThemeSelector from "../components/ThemeSelector";
import { Outlet } from 'react-router-dom';
import {Link} from 'react-router-dom';


const DefaultLayout = ({ children }) => (
  <div>
   <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-between">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="mx-2 flex-1 px-2">C'MADA Pro</div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/product">Produit</Link></li>
                <li><Link to="/about" >A propos</Link></li>
                <li><a>Télécharger</a></li>
              </ul>
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="hidden flex-none lg:block text-sm" >

                <ThemeSelector></ThemeSelector>
            </div>
          </div>
        </div>

        {/* Drawer content on the right */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu w-80 bg-base-200 min-h-full">
            {/* Sidebar content here */}
            <div className="navbar bg-base-300 w-full">
            <div className="mx-2 flex-1 px-2">C'MADA Pro</div> 
            </div>
            <li><a>Accueil</a></li>
                <li><a>Produit</a></li>
                <li><a>A propos</a></li>
                <li><a>Télécharger</a></li>
                <li>
            <ThemeSelector></ThemeSelector></li>
          </ul>
        </div>
      </div>
    <main>
        <Outlet /> {/* Affiche HomePage, AboutPage, etc. */}
      </main>
  </div>
);

export default DefaultLayout;
