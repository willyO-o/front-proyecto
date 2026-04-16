import { defineStore } from "pinia";
// import { ref } from "vue";
import { useStorage } from '@vueuse/core'
import { computed } from "vue";

const useUserStore = defineStore('user', () => {
    const usuario = useStorage('usuario', {})
    const accesToken = useStorage('accesToken', null)


    const setUsuario = (user) => {
        usuario.value = user
    }

    const setToken = (newToken) => {
        accesToken.value = newToken
    }

    const isLoggedIn = computed(() =>{
        return !!usuario.value && !!accesToken.value
    })
    
    const clearUser = () =>{
        usuario.value = {}
        accesToken.value = null
    }

    





    return {
        usuario,
        setUsuario,
        setToken,
        isLoggedIn,
        clearUser
    }
})


export default useUserStore