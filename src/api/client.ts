import axios from "axios";

const baseURL = 'https://sebastien-chappert.fr';
// const baseURL = "http://localhost:3000";

export const api = axios.create({
    baseURL
});

export const login = async (username: string, password: string) => {
    const res = await axios.post(`/auth/login`, { username, password });
    // backend renvoie { access_token: "xxxx" }
    return res.data;
};
