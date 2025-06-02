import axios from "axios";

const api = axios.create({
    baseURL: "https://api-teste-front-production.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const getToken = localStorage.getItem("auth-storage");
    const token = getToken ? JSON.parse(getToken).state.token : null;

    if (token) {
        console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
