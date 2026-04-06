import api from "./api";


export const registrarEstablecimiento = async (datos) => {

    const respuesta = await api.post('/establecimientos', datos)

    return respuesta.data

}