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
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
