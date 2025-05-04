import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import './App.css'
import Accueil from './pages/public/accueil'
import DefaultLayout from "./layouts/defaultlayouts";
import AdminDashboard from "./pages/admin/admindashboard";
import AdminLayout from "./layouts/adminlayouts";

function App() {
  return (
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Accueil />} />
      </Route>
      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
      </Route>
      {/* CLIENT
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
      </Route>
      FOURNISSEUR
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
      </Route> */}
      </Routes>
  )
}

export default App;