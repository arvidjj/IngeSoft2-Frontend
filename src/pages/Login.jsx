import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import Logo from "../assets/logo.png";
import { IoPeopleSharp } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import api from "../utils/api";
import "../style.css";


const Login = () => {
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        api.post("/auth/login", usuario)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/clientes");
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    toast.error("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
                } else if (error.response && error.response.status === 404) {
                    toast.error("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
                } else {
                    toast.error("Ha ocurrido un error. Inténtalo de nuevo.");
                }
            })
            .finally(() => {
                setLoading(false);
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
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
            error:{
                style: {
                    background: '#FFDBD9',
                    color: '#D92D20',
                }
            }
        }} />
            <div className="login-card">
                <center><img src={Logo} alt="Logo de la aplicación" className="logo" /></center>
                <form onSubmit={handleSubmit}>
                    <div className={`form-email ${emailFocused || usuario.email ? 'focused' : ''}`}>
                        <div className="input-container">
                            <input
                                name="email"
                                value={usuario.email}
                                className="form-input"
                                type="text"
                                placeholder=" "
                                onChange={handleChange}
                                onFocus={handleEmailFocus}
                                onBlur={handleEmailBlur}
                                autoFocus
                                required
                            />
                            <IoPeopleSharp className="input-icon" />
                        </div>
                        <label className="placehold">Usuario</label>
                    </div>
                    <div className={`form-password ${passwordFocused || usuario.password ? 'focused' : ''}`}>
                        <div className="input-container">
                            <input
                                name="password"
                                value={usuario.password}
                                className="form-input"
                                type={mostrarPassword ? "text" : "password"}
                                placeholder=" "
                                onChange={handleChange}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                required
                            />
                            <RiLockPasswordFill className="input-icon" />
                        </div>
                        <label className="placehold">Contraseña</label>
                    </div>
                    <div className="form-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                onChange={toggleMostrarPassword}
                                checked={mostrarPassword}
                            />{" "}
                            Mostrar contraseña
                        </label>
                    </div>
                    <div className="form-buttom">
                        <button type="submit" className="login-button" disabled={loading} style={{ position: 'relative' }}>
                            {loading ? (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                                    <ThreeDots
                                        visible={true}
                                        height="30"
                                        width="30"
                                        color="white"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
