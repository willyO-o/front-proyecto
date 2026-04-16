import axios from "axios";
import { createAuthRefresh } from 'axios-auth-refresh';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true

})

api.interceptors.request.use(configuracion => {
    const token = localStorage.getItem('accesToken')
    if (token) {
        configuracion.headers['Authorization'] = 'Bearer ' + token
    }

    return configuracion
})

const refreshAuthLogic = (failedRequest) =>
    api.post('/auth/refresh').then((tokenRefreshResponse) => {
        const nuevoToken = tokenRefreshResponse.data.access_token;
        localStorage.setItem('accesToken', nuevoToken);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + nuevoToken
        return Promise.resolve();
    }).catch((error) => {
        localStorage.removeItem('accesToken');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
        return Promise.reject(error);

    })


createAuthRefresh(api, refreshAuthLogic);





export default api;