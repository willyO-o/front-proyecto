<script setup>
import { reactive, ref } from 'vue';
import {  notificarError } from '@/utils/alertUtil';
import { loginValidationSchema } from '@/schemas/authValidationSchema';
import { Form, Field, ErrorMessage } from 'vee-validate';

import {  useRouter } from 'vue-router'

import useUserStore from '@/stores/userStore';

import { login } from '@/services/authService'
import Swal from 'sweetalert2';

const datosForm = reactive({
    email: 'test@example.com',
    password: 'password',
})

const mostrarPassword = ref(false)

const router = useRouter()
const userStore = useUserStore()


const autenticar = async () => {

    try {
        const resultado = await login(datosForm)
        
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            html: `<p class="h4">Bienvenido, ${resultado.user.name}!</p>`,
        });

        userStore.setUsuario(resultado.user)

        userStore.setToken(resultado.access_token)

        setTimeout(() => {
            router.push({name: 'Panel'})
        },1500)

    } catch (error) {

        notificarError(error.response)

    }

}

</script>

<template>
    <!-- ==================== LOGIN SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5 col-md-7">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-sign-in-alt me-2"></i>Iniciar Sesión</h3>
                            <p>Ingresa a tu cuenta para continuar y administrar tus establecimientos</p>
                        </div>
                        <div class="auth-card-body">
                            <Form id="loginForm" @submit="autenticar" :validation-schema="loginValidationSchema"
                                v-slot="{ errors }">
                                <div class="mb-3">
                                    <label for="loginEmail" class="form-label">Correo Electrónico *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        <Field type="email" name="email" v-model="datosForm.email" class="form-control"
                                            :class="{ 'is-invalid': errors.email }" id="loginEmail"
                                            placeholder="ejemplo@correo.com" required />
                                    </div>
                                    <ErrorMessage name="email" class="text-danger small" />
                                </div>
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Password *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                        <Field :type="mostrarPassword ? 'text' : 'password'" name="password"
                                            class="form-control" :class="{ 'is-invalid': errors.password }"
                                            id="loginPassword" v-model="datosForm.password" required />
                                        <button class="btn btn-toggle-password border" type="button"
                                            @click="mostrarPassword = !mostrarPassword" data-target="loginPassword"><i
                                                :class="{ 'fas fa-eye': !mostrarPassword, 'fas fa-eye-slash': mostrarPassword }"></i></button>
                                    </div>
                                    <ErrorMessage name="password" class="text-danger small" />

                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="form-check d-none">
                                        <input class="form-check-input" type="checkbox" id="rememberMe">
                                        <label class="form-check-label" for="rememberMe">Recordarme</label>
                                    </div>
                                    <a href="javascript:void(0)" class="forgot-link">Olvidaste tu contraseña?</a>
                                </div>
                                <button type="submit" class=" btn-auth-submit w-100">LOGIN</button>
                            </Form>

                            <div class="auth-divider d-none">
                                <span>or login with</span>
                            </div>

                            <div class="social-login d-none">
                                <a href="#" class="btn-social btn-facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="btn-social btn-google"><i class="fab fa-google"></i></a>
                                <a href="#" class="btn-social btn-twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="btn-social btn-linkedin"><i class="fab fa-linkedin-in"></i></a>
                            </div>

                            <p class="auth-footer-text mt-4">No tiene una cuenta? <RouterLink to="/registrarse">
                                    Registrate ahora</RouterLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>