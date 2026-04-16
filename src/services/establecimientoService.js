import api from "./api";


export const getEstablecimientos = async (parametros) => {

    const respuesta = await api.get('/establecimientos', { params: parametros })

    return respuesta.data
}

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

export const eliminarEstablecimiento = async id => {
    const respuesta = await api.delete('/establecimientos/'+id)
    return respuesta.data
}


/// establecimientos public


export const getEstablecimientosPublic = async (parametros) => {

    const respuesta = await api.get('/public/establecimientos', { params: parametros })

    return respuesta.data
}

export const getEstablecimientoPublicID = async id => {
    const respuesta = await api.get('/public/establecimientos/' + id)

    return respuesta.data
}