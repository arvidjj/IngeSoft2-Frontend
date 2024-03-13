import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoClients from "./pages/clients/InfoClients";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout/Layout";
import MainClients from "./pages/clients/mainClients";
import MainUsers from "./pages/users/mainUsers"; 
import Login from "./pages/Login";
import MainProductos  from './pages/productos/MainProductos';
createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/clientes" element={<Layout><MainClients /></Layout>} />
          <Route path="/users" element={<Layout><MainUsers /></Layout>} />
          <Route path="/clientesinfo/:id" element={<Layout><InfoClients /></Layout>} />
          <Route path="/productos" element={<Layout><MainProductos /></Layout>} />
          <Route path="*" element={<Layout><PageNotFound /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>
);