import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InfoClients from "./pages/clients/InfoClients";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout/Layout";
import MainClients from "./pages/clients/mainClients";
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/clientes" element={<Layout><MainClients /></Layout>} />
          <Route path="/clientesinfo" element={<Layout><InfoClients /></Layout>} />
          <Route path="*" element={<Layout><PageNotFound /></Layout>} />
        </Routes>
      </Router>
    </React.StrictMode>
);