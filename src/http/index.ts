import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor para adicionar o token JWT automaticamente
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
