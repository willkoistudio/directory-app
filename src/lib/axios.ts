/** @format */

import axios, { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pour ajouter automatiquement le token à chaque requête
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem("auth_token");

    if (token && config.headers) {
      // Ajouter le token dans le header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si l'erreur est 401 (Unauthorized), déconnecter l'utilisateur
    if (error.response?.status === 401) {
      // Supprimer le token
      localStorage.removeItem("auth_token");
      // Rediriger vers la page de login si on n'y est pas déjà
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
