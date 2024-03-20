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
                <Link to="/clientes" ><button className="nav-btn">Clientes</button></Link>
<<<<<<< HEAD
                {/* Modificamos "Productos" para que sea un select */}
                <select className="nav-btn" onChange={(e) => navigate(`/${e.target.value}`)}>
                    <option value="productos">Productos</option>
                    <option value="servicios">Servicios</option>
                    <option value="tienda">Tienda</option>
                </select>
                {/* Fin de la modificación */}
                <Link to="/proveedores" ><button className="nav-btn">Proveedores</button></Link>
=======
                <Link to="/productos" ><button className="nav-btn">Productos</button></Link>
>>>>>>> 5007063db172fa4ca76f35ccfa6c8da6fa671610
                <Link to="/caja" ><button className="nav-btn">Caja</button></Link>
                <Link to="/reportes" ><button className="nav-btn">Reportes</button></Link>
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
