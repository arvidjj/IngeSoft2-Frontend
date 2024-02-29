import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Swal from "sweetalert2";
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
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Usuario no encontrado",
                    text: "Revise su nombre de usuario o contraseña",
                    timer: 2000,
                    timerProgressBar: true,
                });
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
                    <img src={Logo} alt="Logo de la aplicación" className="logo"/>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${emailFocused || usuario.email ? 'focused' : ''}`}>
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
                        <label className="placehold">Usuario</label>
                    </div>
                    <div className={`form-group ${passwordFocused || usuario.password ? 'focused' : ''}`}>
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
