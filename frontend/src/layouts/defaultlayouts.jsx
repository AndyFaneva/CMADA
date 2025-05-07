import React from "react";
import ThemeSelector from "../components/ThemeSelector";
import { Outlet } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Footer from "../components/Footer";


const DefaultLayout = ({ children }) => (
  <div>
      <div className="drawer drawer-mobile z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col justify-between">
          {/* Navbar */}
          <div className="navbar bg-base-0 w-full shadow-md">
            <div className="mx-2 flex-1 px-2">
              <span className="text-xl font-bold bg-base-800">C'MADA Pro</span></div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Accueil</NavLink></li>
                <li><NavLink to="/product"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Produit</NavLink></li>
                <li><NavLink to="/about"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>A propos</NavLink></li>
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
            <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Accueil</NavLink></li>
                <li><NavLink to="/product"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Produit</NavLink></li>
                <li><NavLink to="/about"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>A propos</NavLink></li>
                <li>
            <ThemeSelector></ThemeSelector></li>
          </ul>
        </div>
      </div>
    <main className="bg-base-200">
        <Outlet /> {/* Affiche HomePage, AboutPage, etc. */}
      </main>
        <Footer></Footer>
  </div>
);

export default DefaultLayout;
