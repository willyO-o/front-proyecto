<script setup>

import { reactive, onMounted, ref } from 'vue';

import { getCategorias } from '@/services/categoriaService'
import Mapa from '@/components/Mapa.vue';



const categorias = ref([])


const datos = reactive({
    nombre: '',
    descripcion: '',
    direccion: '',
    imagen: '',
    telefono: '',
    email: '',
    website: '',
    horario_apertura: '',
    horario_cierre: '',
    latitud: '',
    longitud: '',
    estado: '',
    categoria_id: '',
})



const listarCategorias = async () => {


    const resultado = await getCategorias()

    categorias.value = resultado.data
}

onMounted(() => {

    listarCategorias()

})




</script>


<template>
    <!-- ==================== REGISTER SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class=" col-md-10">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-user-plus me-2"></i>Create Account</h3>
                            <p>Join us today! Fill in the form below to get started.</p>
                        </div>
                        <div class="auth-card-body">
                            <form id="registerForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="nombre" class="form-label">Nombre del Establecimiento *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-building"></i></span>
                                            <input type="text" class="form-control" id="nombre" v-model="datos.nombre"
                                                placeholder="Nombre del Establecimiento" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="regLastName" class="form-label">Categoria *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-list"></i></span>

                                            <select name="" id="" v-model="datos.categoria_id" class="form-select">
                                                <option value="">Seleccione una categoría</option>
                                                <option v-for="categoria in categorias" :key="categoria.id"
                                                    :value="categoria.id">{{ categoria.nombre }}</option>

                                            </select>

                                        </div>
                                    </div>

                                    <div class="col-12 mb-3">
                                        <label for="direccion" class="form-label">Dirección *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                            <input type="text" class="form-control" id="direccion" name="direccion"
                                                v-model="datos.direccion" placeholder="Dirección" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">

                                        <Mapa  />

                                    </div>
                                </div>

                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="telefono" class="form-label">Phone Number *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                            <input type="tel" class="form-control" id="telefono" name="telefono"
                                                v-model="datos.telefono" placeholder="(+591) 777 77 777" required>
                                        </div>
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="email" class="form-label">Correo Electrónico </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <input type="email" class="form-control" id="email" name="email"
                                                v-model="datos.email" placeholder="ejemplo@empresa.com">
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_apertura" class="form-label">Hora Apertura *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                            <input type="time" class="form-control" id="horario_apertura"
                                                name="horario_apertura" v-model="datos.horario_apertura"
                                                placeholder="00:00" required>
                                        </div>
                                    </div>
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_cierre" class="form-label">Hora Cierre *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                            <input type="time" class="form-control" id="horario_cierre"
                                                name="horario_cierre" v-model="datos.horario_cierre" placeholder="00:00"
                                                required>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <label for="website" class="form-label">Sitio Web </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                            <input type="text" class="form-control" id="website" name="website"
                                                v-model="datos.website" placeholder="https://www.ejemplo.com">
                                        </div>
                                    </div>

                                    <div class="col-md-12 mb-3">
                                        <label for="descripcion" class="form-label">Descripción </label>
                                        <div class="input-group border">
                                            <textarea name="descripcion" v-model="datos.descripcion" id="descripcion" rows="4" class="form-control"></textarea>
                                        </div>
                                    </div>

                                </div>
                             

                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                                    <label class="form-check-label" for="agreeTerms">
                                        Acepto los  <a href="#" class="forgot-link">Terminos y condiciones</a> y <a
                                            href="#" class="forgot-link">Politica de Privacidad</a>
                                    </label>
                                </div>
                                <button type="submit" class=" btn-auth-submit w-100">
                                    <i class="fas fa-save"></i> 
                                    Guardar
                                </button>
                            </form>

                     

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


</template>