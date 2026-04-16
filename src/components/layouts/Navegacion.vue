<script setup>

import { logout } from '@/services/authService'
import useUserStore from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const cerrarSesion = async () => {
    await logout()
    userStore.clearUser()
    router.push({ name: 'Inicio' })

}



</script>


<template>
    <!-- ==================== TOP BAR ==================== -->
    <div class="top-bar">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <span>WELCOME TO THE WISEM LISTINGS</span>
                <div v-if="userStore.isLoggedIn" class="d-flex align-items-center">
                    <i class="fas fa-user me-1"></i>
                    <span class="">{{ userStore.usuario?.name }}</span>
                    <!-- <span class="separator">|</span> -->

                </div>
                <div v-else class="d-flex align-items-center">
                    <RouterLink :to="{ name: 'Login' }">INICIAR SESIÓN</RouterLink>
                    <span class="separator">|</span>
                    <RouterLink :to="{ name: 'Registrarse' }">REGISTRARSE</RouterLink>
        
                </div>

            </div>
        </div>
    </div>

    <!-- ==================== NAVBAR ==================== -->
    <nav class="navbar navbar-expand-lg main-navbar">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{ name: 'Inicio' }">
                <i class="fas fa-globe"></i> WISEM
            </RouterLink>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                <ul class="navbar-nav align-items-lg-center">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Inicio' }">INICIO</RouterLink>
                    </li>

                    <li v-if="userStore.isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class=" fas fa-user me-1"></i> Mi cuenta
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'Perfil' }">Perfil</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'Panel' }">Panel</RouterLink>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)" @click="cerrarSesion">
                                    <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    </li>


                </ul>
            </div>
        </div>
    </nav>

</template>