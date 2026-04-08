import api from "./api";


export const registrarEstablecimiento = async (datos) => {

    const respuesta = await api.post('/establecimientos', datos)

    return respuesta.data

}

export const actualizarEstablecimiento = async (datos, id) => {

    const respuesta = await api.post('/establecimientos/' + id, datos)

    return respuesta.data


}


export const listarEstablecimientoID = async id => {

    const respuesta = await api.get('/establecimientos/' + id)

    return respuesta.data

}