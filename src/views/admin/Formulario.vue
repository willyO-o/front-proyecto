<script setup>

import { reactive, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate'
import establecimientosValidationSchema from '@/schemas/establecimientosValidationSchema'


import { getCategorias } from '@/services/categoriaService'
import { registrarEstablecimiento } from '@/services/establecimientoService'

import Mapa from '@/components/Mapa.vue';

import VueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FileponPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilepondPluginImagePreview from 'filepond-plugin-image-preview'


const filePond = VueFilePond(FileponPluginFileValidateType, FilepondPluginImagePreview)



const categorias = ref([])
const pond = ref(null)

const datos = reactive({
    nombre: '',
    descripcion: '',
    direccion: '',
    imagen: 'imag/imagen.png',
    telefono: '',
    email: '',
    website: '',
    horario_apertura: '',
    horario_cierre: '',
    latitud: '',
    longitud: '',
    estado: 'ACTIVO',
    categoria_id: 0,
})



const listarCategorias = async () => {


    const resultado = await getCategorias()

    categorias.value = resultado.data
}



const actualizarCoordenadas = (posicion) => {

    datos.latitud = posicion.lat
    datos.longitud = posicion.lng
}

const agregarArchivo = (error, file) => {

    if (error) {
        return
    }

    datos.imagen = file.file

}

const quitarArchivo = () => {
    datos.imagen = null
}



const procesarFormulario = async () => {

    const formData = new FormData()
    for (const key in datos){
        formData.append(key,datos[key])

    }



    try {


        const resultado = await registrarEstablecimiento(formData)




        console.log(resultado)

    }catch (error){

        console.warn("Error al registrar el establecimiento", error)

    }

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
                            <Form id="registerForm" 
                            v-slot="{errors}"
                            :validation-schema="establecimientosValidationSchema"
                            @submit="procesarFormulario"
                            >
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="nombre" class="form-label">Nombre del Establecimiento *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-building"></i></span>
                                            <Field type="text" class="form-control" name="nombre" id="nombre"
                                                v-model="datos.nombre" placeholder="Nombre del Establecimiento"
                                                required />
                                        </div>
                                        <ErrorMessage name="nombre" class="text-danger small" />
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="regLastName" class="form-label">Categoria *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-list"></i></span>

                                            <Field as="select" name="categoria_id" id="" v-model="datos.categoria_id"
                                                class="form-select">
                                                <option :value="0">Seleccione una categoría</option>
                                                <option v-for="categoria in categorias" :key="categoria.id"
                                                    :value="categoria.id">{{ categoria.nombre }}</option>

                                            </Field>

                                        </div>
                                        <ErrorMessage name="categoria_id" class="text-danger small" />
                                    </div>

                                    <div class="col-12 mb-3">
                                        <label for="direccion" class="form-label">Dirección *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                            <Field type="text" class="form-control" id="direccion" name="direccion"
                                                v-model="datos.direccion" placeholder="Dirección" required />
                                        </div>
                                        <ErrorMessage name="direccion" class="text-danger small" />
                                    </div>
                                    <div class="col-md-12">

                                        <Mapa @obtener-coordenadas="actualizarCoordenadas" />

                                        <Field type="hidden" name="latitud" v-model="datos.latitud" />
                                        <Field type="hidden" name="longitud" v-model="datos.longitud" />

                                        <ErrorMessage name="latitud" class="text-danger small" />
                                        <ErrorMessage name="longitud" class="text-danger small" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="mb-3 col-md-6">
                                        <label for="telefono" class="form-label">Numero de Teléfono </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                            <Field type="tel" class="form-control" id="telefono" name="telefono"
                                                v-model="datos.telefono" placeholder="(+591) 777 77 777" required />
                                        </div>
                                        <ErrorMessage name="telefono" class="text-danger small" />
                                    </div>
                                    <div class="mb-3 col-md-6">
                                        <label for="email" class="form-label">Correo Electrónico </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <Field type="email" class="form-control" id="email" name="email"
                                                v-model="datos.email" placeholder="ejemplo@empresa.com" />
                                        </div>

                                        <ErrorMessage name="email" class="text-danger small" />
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_apertura" class="form-label">Hora Apertura *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                            <Field type="time" class="form-control" id="horario_apertura"
                                                name="horario_apertura" v-model="datos.horario_apertura"
                                                placeholder="00:00" required />
                                        </div>
                                        <ErrorMessage name="horario_apertura" class="text-danger small" />

                                    </div>
                                    <div class="mb-3 col-md-3">
                                        <label for="horario_cierre" class="form-label">Hora Cierre *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                            <Field type="time" class="form-control" id="horario_cierre"
                                                name="horario_cierre" v-model="datos.horario_cierre" placeholder="00:00"
                                                required />
                                        </div>
                                        <ErrorMessage name="horario_cierre" class="text-danger small" />

                                    </div>

                                    <div class="col-md-6 mb-3">
                                        <label for="website" class="form-label">Sitio Web </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                            <Field type="text" class="form-control" id="website" name="website"
                                                v-model="datos.website" placeholder="https://www.ejemplo.com" />
                                        </div>
                                        <ErrorMessage name="website" class="text-danger small" />

                                    </div>

                                    <div class="col-md-12 mb-3">
                                        <label for="descripcion" class="form-label">Descripción </label>
                                        <div class="input-group border">
                                            <Field as="textarea" name="descripcion" v-model="datos.descripcion"
                                                id="descripcion" rows="4" class="form-control"></Field>
                                        </div>
                                        <ErrorMessage name="descripcion" class="text-danger small" />

                                    </div>

                                    <div class="col-md-12">
                                        <file-pond name="imagen" ref="pond" height="200px"
                                            label-idle="Arrastra y suelta tu imagen o haz clic para seleccionar"
                                            :allow-multiple="false" max-file-size="2MB" @addfile="agregarArchivo"
                                            @removefile="quitarArchivo" @init="() => console.log('filepond cargado')"
                                            accepted-file-types="image/jpeg, image/png, image/webp, image/avif, image/jpg" />
                                    </div>

                                </div>


                                <div class="form-check mb-4">
                                    <Field class="form-check-input" type="checkbox" id="agreeTerms"
                                        name="terminos_condiciones" required :value="true"
                                        :class="{'is-invalid': errors.terminos_condiciones}"
                                        />
                                    <label class="form-check-label" for="agreeTerms">
                                        Acepto los <a href="#" class="forgot-link">Terminos y condiciones</a> y <a
                                            href="#" class="forgot-link">Politica de Privacidad</a>
                                    </label>
                                    <br>
                                    <ErrorMessage name="terminos_condiciones" class="text-danger small" />

                                </div>
                                <button type="submit" class=" btn-auth-submit w-100">
                                    <i class="fas fa-save"></i>
                                    Guardar
                                </button>
                            </Form>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


</template>