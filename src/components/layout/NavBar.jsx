import React, { useEffect, useState } from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [userData, setUserData] = useState(null);
    const [showLogoutOptions, setShowLogoutOptions] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    };

    const toggleLogoutOptions = () => {
        setShowLogoutOptions(!showLogoutOptions);
    };

    const isActiveLink = (link) => {
        return location.pathname === link;
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="logo-btn"><img src={Logo} alt="Logo de la aplicación" className="logo-img" /></button>
                <Link to="/clientes" ><button className={isActiveLink("/clientes") ? "nav-btn active" : "nav-btn"}>Clientes</button></Link>
                <Link to="/productos" ><button className={isActiveLink("/productos") ? "nav-btn active" : "nav-btn"}>Productos</button></Link>
                <Link to="/caja" ><button className={isActiveLink("/caja") ? "nav-btn active" : "nav-btn"}>Caja</button></Link>
                <Link to="/reportes" ><button className={isActiveLink("/reportes") ? "nav-btn active" : "nav-btn"}>Reportes</button></Link>
                <Link to="/users" ><button className={isActiveLink("/users") ? "nav-btn active" : "nav-btn"}>Usuarios</button></Link>
            </div>
            <div className="navbar-right">
                {userData && (
                    <div className="usuario-container">
                        <span className="usuario">{userData.nombre}</span>
                        <div className="icono-usuario-container">
                            <button className="icono-usuario" onClick={toggleLogoutOptions}>
                                <span>{userData.nombre.charAt(0)}</span>
                            </button>
                            {showLogoutOptions && (
                                <div className="logout-options">
                                    <button  onClick={handleLogout}>Cerrar sesión</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
