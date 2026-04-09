import { defineStore } from "pinia";
// import { ref } from "vue";
import { useStorage } from '@vueuse/core'

const useUserStore = defineStore('user', () => {
    const usuario = useStorage('usuario', {})
    const accesToken = useStorage('accesToken', '')


    const setUsuario = (user) => {
        usuario.value = user
    }

    const setToken = (newToken) => {
        accesToken.value = newToken
    }

    





    return {
        usuario,
        setUsuario,
        setToken,
    }
})


export default useUserStore