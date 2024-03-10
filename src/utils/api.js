import axios from "/node_modules/.vite/deps/axios.js?v=e9a41200";

const baseURL = import.meta.env.VITE_API; // Acceso a variables de entorno en Vite

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      // Ignorar el uso del token para las rutas /auth/register y /auth/login
      if (config.url !== "/auth/register" && config.url !== "/auth/login") {
        config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
