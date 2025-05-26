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
import FournisseurCatalogue from "./pages/fournisseur/fournisseurcatalogue";
import FournisseurCommande from "./pages/fournisseur/fournisseurcommande";
import FournisseurStock from "./pages/fournisseur/fournisseurstock";
import FournisseurDocument from "./pages/fournisseur/fournisseurdocument";
import FournisseurRemise from "./pages/fournisseur/fournisseurremise";
import FournisseurProduct from "./pages/fournisseur/fournisseurproduit";
import ClientCommande from "./pages/client/clientcommande";
import ClientDocument from "./pages/client/clientdocument";
import ClientRemise from "./pages/client/clientremise";

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
          <Route path="/clientcatalogue" element={<PrivateRoute roleAttendu="client"><CatalogueProduits/></PrivateRoute>}/>
           <Route path="/clientcommande" element={<PrivateRoute roleAttendu="client"><ClientCommande/></PrivateRoute>}/>
           <Route path="/clientdocument" element={<PrivateRoute roleAttendu="client"><ClientDocument/></PrivateRoute>}/>
           <Route path="/clientremise" element={<PrivateRoute roleAttendu="client"><ClientRemise/></PrivateRoute>}/>
      </Route>
      {/* FOURNISSEUR */}
      <Route  element={<FournisseurLayout />}>
          <Route path="/fournisseurdashboard" index element={<PrivateRoute roleAttendu="fournisseur"><FournisseurDashboard /></PrivateRoute>} />
          <Route path="/profilfournisseur" element={<PrivateRoute roleAttendu="fournisseur"><ProfilUtilisateur/></PrivateRoute>}/>
          <Route path="/fournisseurcommande" element={<PrivateRoute roleAttendu="fournisseur"><FournisseurCommande/></PrivateRoute>}/>
          <Route path="/fournisseurcatalogue" element={<PrivateRoute roleAttendu="fournisseur"><FournisseurCatalogue/></PrivateRoute>}/>
          <Route path="/fournisseurstock" element={<PrivateRoute roleAttendu="fournisseur"><FournisseurStock/></PrivateRoute>}/>
           <Route path="/fournisseurdocument" element={<PrivateRoute roleAttendu="fournisseur"><FournisseurDocument/></PrivateRoute>}/>
           <Route path="/fournisseurremise" element={<PrivateRoute roleAttendu="fournisseur"><FournisseurRemise/></PrivateRoute>}/>
           <Route path="/fournisseurproduct" element={<PrivateRoute roleAttendu="fournisseur"><FournisseurProduct/></PrivateRoute>}/>
      </Route>
      
      <Route path="/nonautoriser" element={<NonAutoriser />}/>
          <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all */}
      </Routes>
  )
}

export default App;