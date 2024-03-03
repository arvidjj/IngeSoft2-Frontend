import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoPeopleSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import "../style.css";


const Login = () => {
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:8080/auth/login", usuario)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/home");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const toggleMostrarPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const handleEmailFocus = () => {
        setEmailFocused(true);
    };

    const handleEmailBlur = () => {
        if (!usuario.email) {
            setEmailFocused(false);
        }
    };

    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        if (!usuario.password) {
            setPasswordFocused(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <center><img src={Logo} alt="Logo de la aplicación" className="logo" /></center>
                <form onSubmit={handleSubmit}>
                    <div className={`form-email ${emailFocused || usuario.email ? 'focused' : ''}`}>
                        <div className="input-container">
                            <input
                                name="email"
                                value={usuario.email}
                                className="form-control"
                                type="text"
                                placeholder=" "
                                onChange={handleChange}
                                onFocus={handleEmailFocus}
                                onBlur={handleEmailBlur}
                                autoFocus
                            />
                            <IoPeopleSharp className="input-icon" /> {/* Icono dentro del input */}
                        </div>
                        <label className="placehold">Usuario</label>
                    </div>
                    <div className={`form-password ${passwordFocused || usuario.password ? 'focused' : ''}`}>
                        <div className="input-container">
                            <input
                                name="password"
                                value={usuario.password}
                                className="form-control"
                                type={mostrarPassword ? "text" : "password"}
                                placeholder=" "
                                onChange={handleChange}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                            />
                            <RiLockPasswordFill className="input-icon" /> {/* Icono dentro del input */}
                        </div>
                        <label className="placehold">Contraseña</label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                onChange={toggleMostrarPassword}
                                checked={mostrarPassword}
                            />{" "}
                            Mostrar contraseña
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
