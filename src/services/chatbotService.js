import api from "./api";


export const enviarMensaje = async (datos) =>{

    const respuesta = await api.post('/chatbot', datos)
    return respuesta.data

}