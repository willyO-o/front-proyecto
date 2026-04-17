import { defineStore } from "pinia";
import { watch } from "vue";
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

    watch([usuario, accesToken], ([newUsuario, newToken]) => {
        if(!usuario.value || !accesToken.value){
            localStorage.removeItem('usuario')
            localStorage.removeItem('accesToken')
            window.location.href = '/'
        }
    }, { deep: true })
    





    return {
        usuario,
        setUsuario,
        setToken,
        isLoggedIn,
        clearUser
    }
})


export default useUserStore