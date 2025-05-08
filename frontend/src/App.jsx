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
          <Route path="/admindashboard" index element={
          <PrivateRoute>
                    <AdminDashboard />
          </PrivateRoute>} />
          <Route path="/adminuser" element={
            <PrivateRoute>
          <AdminUser/>
          </PrivateRoute>}/>
      </Route>
      {/* CLIENT
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
      </Route>
      FOURNISSEUR
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
      </Route> */}
          <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all */}
      </Routes>
  )
}

export default App;