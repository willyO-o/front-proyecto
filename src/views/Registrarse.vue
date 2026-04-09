<script setup>

import { reactive, ref } from 'vue';

import { notificarError } from '@/utils/alertUtil';
import { registroValidationSchema } from '@/schemas/authValidationSchema'
import { Form, Field, ErrorMessage } from 'vee-validate';
const datosForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
})



</script>

<template>

    <!-- ==================== REGISTER SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-9">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-user-plus me-2"></i>Create Account</h3>
                            <p>Join us today! Fill in the form below to get started.</p>
                        </div>
                        <div class="auth-card-body">
                            <Form id="registerForm" :validation-schema="registroValidationSchema" v-slot="{ errors }">
                                <div class="row">

                                    <div class="col-md-12 mb-3">
                                        <label for="regLastName" class="form-label">Nombre Completo *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                            <Field type="text" class="form-control" id="regLastName" name="name"
                                                v-model="datosForm.name" required />
                                        </div>
                                        <ErrorMessage name="name" class="text-danger small" />

                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="regEmail" class="form-label">Correo electronico *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        <Field type="email" class="form-control" id="regEmail" name="email"
                                            v-model="datosForm.email" required />
                                    </div>
                                    <ErrorMessage name="email" class="text-danger small" />

                                </div>

                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="regPassword" class="form-label">Password *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <Field type="password" class="form-control" id="regPassword" name="password"
                                                v-model="datosForm.password" required />
                                            <button class="btn btn-toggle-password" type="button"
                                                data-target="regPassword"><i class="fas fa-eye"></i></button>
                                        </div>
                                        <ErrorMessage name="password" class="text-danger small" />

                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="regConfirmPassword" class="form-label">Confirm Password *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <Field type="password" class="form-control" id="regConfirmPassword"
                                                name="password_confirm" v-model="datosForm.password_confirm" required />
                                            <button class="btn btn-toggle-password" type="button"
                                                data-target="regConfirmPassword"><i class="fas fa-eye"></i></button>
                                        </div>
                                        <ErrorMessage name="password_confirm" class="text-danger small" />

                                    </div>
                                </div>
                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                                    <label class="form-check-label" for="agreeTerms">
                                        I agree to the <a href="#" class="forgot-link">Terms & Conditions</a> and <a
                                            href="#" class="forgot-link">Privacy Policy</a>
                                    </label>
                                </div>
                                <button type="submit" class="btn btn-auth-submit w-100">CREATE ACCOUNT</button>
                            </Form>

                            <div class="auth-divider">
                                <span>or register with</span>
                            </div>

                            <div class="social-login">
                                <a href="#" class="btn-social btn-facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="btn-social btn-google"><i class="fab fa-google"></i></a>
                                <a href="#" class="btn-social btn-twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="btn-social btn-linkedin"><i class="fab fa-linkedin-in"></i></a>
                            </div>

                            <p class="auth-footer-text">Already have an account? <a href="login.html">Login here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>