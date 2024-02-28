import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

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
        localStorage.setItem("email", JSON.stringify(response.data));
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

  return (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="email"
              value={usuario.email}
              className="form-control"
              type="text"
              placeholder="Nombre de Usuario"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="password"
              value={usuario.password}
              className="form-control"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={toggleMostrarPassword}
                checked={mostrarPassword}
              />{" "}
              Mostrar contraseña
            </label>
          </div>
          <div>
            <button type="submit" className="login-button button is-primary is-outlined">
              Iniciar Sesión
            </button>
          </div>
        </form>

  );
};

export default Login;