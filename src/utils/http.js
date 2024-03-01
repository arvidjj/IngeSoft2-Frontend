import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

http.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      config.headers["token"] = user.accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;

/*
 * Ejemplo de utilizacion:
 * import http from "./services/http.js"
 * http.[peticion]("/ruta sin localhost");
 * http.post("/clientes", clientes);
 * http.get("/clientes");
 */