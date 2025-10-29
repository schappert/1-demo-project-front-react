import axios from "axios";

const baseURL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://sebastien-chappert.fr";

export const api = axios.create({
    baseURL,
    withCredentials: true, // envoie les cookies (pour jwt)
});

// 🔁 Intercepteur Refresh Token auto
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post("/auth/refresh", {}, { withCredentials: true });

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token expiré ❌");
                // 🔥 Empêche la boucle et force logout
                window.localStorage.removeItem("isAuthenticated");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
