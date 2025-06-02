import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const getToken = localStorage.getItem("auth-storage");
    const token = getToken ? JSON.parse(getToken).state.token : null;

    if (token) {
        
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
