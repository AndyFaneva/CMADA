import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import './App.css'
import Accueil from './pages/public/accueil'
import DefaultLayout from "./layouts/defaultlayouts";
import AdminDashboard from "./pages/admin/admindashboard";
import AdminLayout from "./layouts/adminlayouts";
import About from "./pages/public/about";
import Product from "./pages/public/product";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminUser from "./pages/admin/adminuser";
import NotFound from "./components/PageNotFound";
import PrivateRoute from "./routes/PrivateRoute";
import NonAutoriser from "./components/NonAutoriser";
import ClientLayout from "./layouts/clientlayouts";
import FournisseurLayout from "./layouts/fournisseurlayouts";
import ClientDashboard from "./pages/client/clientdashboard";
import FournisseurDashboard from "./pages/fournisseur/fournisseurdashboard";
import AdminProduct from "./pages/admin/adminproduct";
import ProfilUtilisateur from "./components/ProfilUtilisateur";
import AdminRemise from "./pages/admin/adminremise";
import AdminDoc from "./pages/admin/admindoc";
import AdminStock from "./pages/admin/adminstock";
import AdminCommande from "./pages/admin/admincommande";
import CatalogueProduits from "./pages/client/clientcatalogue";
import AdminCatalogueProduits from "./pages/admin/admincatalogue";

function App() {
  return (
      <Routes>
        {/* PUBLIC */}
        <Route element={<DefaultLayout />}>
              <Route path="/" index element={<Accueil />} />
              <Route path="/about" element={<About />} />
              <Route path="/product" element={<Product/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>} />
      </Route>
      {/* ADMIN */}
      <Route  element={<AdminLayout />}>
          <Route path="/admindashboard" index element={<PrivateRoute roleAttendu="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/adminuser" element={<PrivateRoute roleAttendu="admin"><AdminUser/></PrivateRoute>}/>
          <Route path="/adminproduct" element={<PrivateRoute roleAttendu="admin"><AdminProduct/></PrivateRoute>}/>
          <Route path="/profilutilisateur" element={<PrivateRoute roleAttendu="admin"><ProfilUtilisateur/></PrivateRoute>}/>
          <Route path="/admindoc" element={<PrivateRoute roleAttendu="admin"><AdminDoc/></PrivateRoute>}/>
          <Route path="/adminremise" element={<PrivateRoute roleAttendu="admin"><AdminRemise/></PrivateRoute>}/>
          <Route path="/adminstock" element={<PrivateRoute roleAttendu="admin"><AdminStock/></PrivateRoute>}/>
          <Route path="/admincommande" element={<PrivateRoute roleAttendu="admin"><AdminCommande/></PrivateRoute>}/>
          <Route path="/admincatalogueproduit" element={<PrivateRoute roleAttendu="admin"><AdminCatalogueProduits/></PrivateRoute>}/>
      </Route>
      {/* CLIENT */}
      <Route  element={<ClientLayout />}>
          <Route path="/clientdashboard" index element={<PrivateRoute roleAttendu="client"><ClientDashboard /></PrivateRoute>} />
          <Route path="/profilclient" element={<PrivateRoute roleAttendu="client"><ProfilUtilisateur/></PrivateRoute>}/>
          <Route path="/catalogueproduit" element={<PrivateRoute roleAttendu="client"><CatalogueProduits/></PrivateRoute>}/>
      </Route>
      {/* FOURNISSEUR */}
      <Route  element={<FournisseurLayout />}>
          <Route path="/fournisseurdashboard" index element={<PrivateRoute roleAttendu="fournisseur"><FournisseurDashboard /></PrivateRoute>} />
      </Route>
      
      <Route path="/nonautoriser" element={<NonAutoriser />}/>
          <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all */}
      </Routes>
  )
}

export default App;