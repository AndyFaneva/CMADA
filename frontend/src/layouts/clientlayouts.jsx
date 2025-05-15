import React from "react";
import {Outlet} from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";
import {Link} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import {Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon} from "@heroicons/react/24/outline";
import LogOut from "../components/Logout";
import Footer from "../components/Footer";
import ProfilUtilisateur from "../components/ProfilUtilisateur";
import { useNavigate } from "react-router-dom";

export default function ClientLayout() {
  const navigate = useNavigate();

    return(
        <div>
        <div className="drawer drawer-mobile z-20">
             <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
             <div className="drawer-content flex flex-col justify-between">
               {/* Navbar */}
               <div className="navbar bg-base-100 w-full shadow-md">
               <div className="mx-2 flex-1 px-2">
              <img src="Cmada.png" alt="logo" width={25}/>
              <span className="text-xl font-bold bg-base-800">C'MADA Pro</span></div>
                 <div className="hidden flex-none lg:block">
                   <ul className="menu menu-horizontal">
                 <li><NavLink to="/clientdashboard"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Tableau de bord</NavLink></li>
        <li><NavLink to="/catalogueproduit"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Catalogue</NavLink></li>
        <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Commande</NavLink></li>
        <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Document</NavLink></li>
        <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-gray-500'
        }>Remise</NavLink></li>
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
                     <div className="relactive inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="fixed right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-100 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                   navigate="/profilclient"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-base-100 data-focus:outline-hidden"
                  >
                    Votre profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Paramètres
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                   
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    <LogOut />
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
                     <div>
                     </div>
                 </div>
                 <div className="hidden flex-none lg:block text-sm" >
                     <ThemeSelector></ThemeSelector>
                 </div>
                  <div className="hidden flex-col lg:block text-sm">

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="fixed right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-100 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <Link to="/profilclient"
                    className="block px-4 py-2 text-sm text-base-700 data-focus:bg-base-100 data-focus:outline-hidden"
                  >
                    Votre profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={()=>navigate('/profilclient')}
                    className="block px-4 py-2 text-sm text-base-700 data-focus:bg-base-100 data-focus:outline-hidden"
                  >
                    Paramètres
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a
                    className="block px-4 py-2 text-sm text-base-700 data-focus:bg-base-100 data-focus:outline-hidden"
                  >
                    <LogOut />
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
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
                 <div className="mx-2 flex-1 px-2">
              <img src="Cmada.png" alt="logo" width={25}/>
              <span className="text-xl font-bold bg-base-800">C'MADA Pro</span></div>
                 </div>
                 <li><NavLink to="/clientdashboard"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-base-500'
        }>Tableau de bord</NavLink></li>
        <li><NavLink to="/catalogueproduit"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-base-500'
        }>Catalogue</NavLink></li>
        <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-base-500'
        }>Commande</NavLink></li>
        <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-base-500'
        }>Document</NavLink></li>
        <li><NavLink to="/"  className={({ isActive }) =>
          isActive ? 'border-b-2 border-blue-500 text-blue-700' : 'text-base-500'
        }>Remise</NavLink></li>
                     <li>
                 <ThemeSelector></ThemeSelector></li>
               </ul>
             </div>
        </div>
         <main>
             <Outlet /> {/* Affiche HomePage, AboutPage, etc. */}
           </main>
           <Footer />
       </div>
    );
}