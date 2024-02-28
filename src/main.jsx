import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InfoClients from "./pages/clients/InfoClients";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Ruta raíz */}
          <Route path="/login" element={<Login />} /> {/* Ruta raíz */}
          <Route path="/home" element={<Home />} /> {/* Ruta de la página de inicio */}
          <Route path="/clientes" element={<InfoClients />} /> {/* Ruta de clientes */}
          <Route path="*" element={<PageNotFound />} /> {/* Ruta de página no encontrada */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
