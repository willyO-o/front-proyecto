<script setup>

import useUserStore from '@/stores/userStore';
import{ Form, Field , ErrorMessage} from 'vee-validate';
import {reactive, ref} from 'vue';

import { cambiarContrasenia} from '@/services/authService';
import {cambiarContraseniaValidationSchema} from '@/schemas/authValidationSchema';

const datosForm= reactive({
    contrasenia_actual: 'password',
    nueva_contrasenia: '44444444',
    confirmar_nueva_contrasenia: '44444444'
})

const mostrar= ref(false);

const procesarFormulario = async() =>{

    const resultado = await cambiarContrasenia(datosForm);
    
    console.log(resultado);
    

}

const userStore = useUserStore();

</script>

<template>

    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5 col-md-7">
                    <div class="auth-card anim scale-in">
  
                        <div class="auth-card-body">
                            <h1 class="text-center mb-4">Datos de Usuario</h1>
                                <div class="mb-3">
                                    <label for="usuario" class="form-label">Nombre de usuario</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        <input type="email" class="form-control" id="usuario"  disabled
                                            placeholder="Enter your email" :value="userStore.usuario.name">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="correo" class="form-label">Correo actual</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        <input type="text" class="form-control" id="correo" disabled
                                            placeholder="Enter your password" :value="userStore.usuario.email">
         
                                    </div>
                                </div>
            

                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-5 col-md-7">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header text-center">
                            <h3><i class="fas fa-sign-in-alt me-2"></i>Cambiar Contraseña</h3>
                            <p>completa el formulario para cambiar tu contraseña</p>
                        </div>
                        <div class="auth-card-body">
                            <Form 
                            :validation-schema="cambiarContraseniaValidationSchema"
                            @submit="procesarFormulario"
                            >
     
                                <div class="mb-3">
                                    <label for="loginPassword" class="form-label">Contraseña Actual *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                        <Field :type="mostrar ? 'text' : 'password'" class="form-control" id="loginPassword"
                                            placeholder="Ingrese tu contraseña actual" required 
                                            v-model="datosForm.contrasenia_actual" name="contrasenia_actual"
                                            />
                                        <button class=" btn-toggle-password" type="button" @click="mostrar =!mostrar"
                                            data-target="loginPassword"><i :class="{ 'fas fa-eye': !mostrar, 'fas fa-eye-slash': mostrar }"></i></button>
                                    </div>
                                    <ErrorMessage name="contrasenia_actual" class="text-danger mt-1" />
                                </div>
                                <div class="mb-3">
                                    <label for="nuevaContrasenia" class="form-label">Nueva Contraseña *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                        <Field :type="mostrar ? 'text' : 'password'" class="form-control" id="nuevaContrasenia"
                                        v-model="datosForm.nueva_contrasenia" name="nueva_contrasenia"
                                            placeholder="Enter your password" required />
                          
                                    </div>
                                    <ErrorMessage name="nueva_contrasenia" class="text-danger mt-1" />

                                </div>
                                <div class="mb-3">
                                    <label for="confirmar" class="form-label">Confirmar Nueva Contraseña *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                        <Field  :type="mostrar ? 'text' : 'password'"  class="form-control" id="confirmar"
                                        v-model="datosForm.confirmar_nueva_contrasenia" name="confirmar_nueva_contrasenia"
                                            placeholder="Enter your password" required />
                   
                                    </div>
                                    <ErrorMessage name="confirmar_nueva_contrasenia" class="text-danger mt-1" />

                                </div>

                                <button type="submit" class=" btn-auth-submit w-100">
                                    <i class="fas fa-save me-2"></i>
                                    Cambiar Contraseña
                                </button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>