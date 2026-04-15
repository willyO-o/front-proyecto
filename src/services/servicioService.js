import api from "./api";

export const listarServicioId = async id => {
    const respuesta = await api.get('/servicios/' + id)
    return respuesta.data

}


export const registrarServicio = async (datos) => {

    const respuesta = await api.post('/servicios', datos)

    return respuesta.data

}


export const actualizarServicio = async (datos, id) => {
    const respuesta = await api.put('/servicios/' + id, datos)
    return respuesta.data
}

export const eliminarServicio = async (id) => {
    const respuesta = await api.delete('/servicios/' + id)
    return respuesta.data
}