import axios from "axios";

const baseURL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://sebastien-chappert.fr";

export const api = axios.create({
    baseURL,
    withCredentials: true, // envoie les cookies (pour jwt)
});

// 🔁 Intercepteur pour gérer le refresh automatique
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si 401 non déjà retentée → le SI tente le refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });

                // ✅ Rejoue la requête initiale après refresh
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token expiré ❌");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
