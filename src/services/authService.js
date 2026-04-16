import api from "@/services/api";


export const login = async (credenciales) =>{

    const response =  await api.post('/auth/login', credenciales)

    return response.data
} 


export const registro = async (datos) => {
    const response =  await api.post('/auth/register', datos)
    return response.data
}

export const logout = async ()=>{
    const response = await api.post('/auth/logout')
    return response.data
}
