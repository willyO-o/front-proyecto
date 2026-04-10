import api from "./api";


export const getCategorias = async () => {

    const respuesta = await api.get('/categorias')

    return respuesta.data;

}








//categorias public

export const getCategoriasPublic = async () => {
    const respuesta = await api.get('/public/categorias')
    return respuesta.data;

}