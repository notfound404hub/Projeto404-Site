import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:500/api/users"
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

let handledExpiredToken = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if ((status === 401 || status === 403) && !handledExpiredToken) {
            handledExpiredToken = true;
            try {
                alert("Seu token expirou! Faça login novamente");
            } catch (e) {
            }
            
            localStorage.removeItem("token");
            localStorage.removeItem("ID_Usuario");
            localStorage.removeItem("Tipo_Usuario");
            localStorage.removeItem("Email");

            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api