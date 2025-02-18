import axios from 'axios';
// import localStorage from './localStorage';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKENDHOST || 'http://localhost:3001/',
  timeout: Number(import.meta.env.VITE_BACKENDTIMEOUT) || 15000, // 15 segundos
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // },
});

api.interceptors.request.use(
  (config) => {
    // Si cuentas con un módulo localStorage, descomenta y ajusta este código:
    // const data = localStorage.get(); // Antes de enviar la solicitud
    // if (data && data.token) {
    //   config.headers.common.Authorization = `${data.token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error) // Manejo de errores en la solicitud
);

api.interceptors.response.use(
  (response) => response.data, // Retorna directamente la data de la respuesta
  (error) => {
    console.error(error); // Imprime el error en consola
    return Promise.reject(error); // Rechaza la promesa con el error
  }
);

export default api;

