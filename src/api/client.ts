import axios from "axios";

const baseURL = "https://sebastien-chappert.fr"; // ton backend

export const api = axios.create({
    baseURL,
});

// Login
export const login = async (username: string, password: string) => {
    const res = await api.post("/auth/login", { username, password });
    return res.data; // { access_token: "xxxx" }
};
