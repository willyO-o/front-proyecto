import api from "@/services/api";


export const login = async (credenciales) =>{

    const response =  await api.post('/auth/login', credenciales)

    return response.data
} 