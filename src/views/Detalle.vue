<script setup>

import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

import { getEstablecimientoPublicID } from '@/services/establecimientoService'
import Mapa from '@/components/Mapa.vue';

import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { serviciosValidationSchema } from '@/schemas/establecimientosValidationSchema'
import { Form, Field, ErrorMessage } from 'vee-validate';

import IconPicker from '@/components/IconPicker.vue'

import { registrarServicio, eliminarServicio, actualizarServicio } from '@/services/servicioService'

import { notificacionToast, notificarError, confirmarAccion } from '@/utils/alertUtil'

import useUserStore from '@/stores/userStore';

const establecimiento = ref({})

const route = useRoute()

const iconos = ref([])

const modal = ref(null)

const userStore = useUserStore()

const datosServicio = reactive({
    establecimiento_id: '',
    nombre_servicio: '',
    descripcion_servicio: '',
    precio: '',
    tipo: 'SERVICIO',
    icono: '',
    disponible: '',
})

const idServicioActualizar = ref(null)

const cargarEstablecimiento = async () => {

    const resultado = await getEstablecimientoPublicID(route.params.id)

    establecimiento.value = resultado.data


}

const horaInstate = ref(null)

const verificarHorario = computed(() => {

    if (!establecimiento.value.horario_cierre || !establecimiento.value.horario_cierre) return false

    return (horaInstate.value >= establecimiento.value.horario_apertura && horaInstate.value <= establecimiento.value.horario_cierre);
})

const intervaloHora = setInterval(() => {
    const ahora = new Date()

    const hora = ahora.getHours().toString().padStart(2, '0')
    const minuto = ahora.getMinutes().toString().padStart(2, '0')

    horaInstate.value = `${hora}:${minuto}`
}, 2000) // Actualiza cada 5 minutos


const mostrarFormulario = () => {

    Object.assign(datosServicio, {
        establecimiento_id: '',
        nombre_servicio: '',
        descripcion_servicio: '',
        precio: '',
        tipo: 'SERVICIO',
        icono: '',
        disponible: '',
    })
    idServicioActualizar.value = null

    if (!modal.value) {
        modal.value = new Modal(document.getElementById('modaServicios'))
    }

    modal.value.show()


}


const gardarServicio = async () => {

    let resultado = null
    datosServicio.establecimiento_id = route.params.id
    try {

        if (idServicioActualizar.value) {

            resultado = await  actualizarServicio(datosServicio,idServicioActualizar.value )
            const indice = establecimiento.value.servicios.findIndex(item => item.id == idServicioActualizar.value)
            establecimiento.value.servicios[indice] = resultado.data

        } else {
            resultado = await registrarServicio(datosServicio)
            establecimiento.value.servicios.push(resultado.data)
        }

        idServicioActualizar.value = null

        Object.assign(datosServicio, {
            establecimiento_id: '',
            nombre_servicio: '',
            descripcion_servicio: '',
            precio: '',
            tipo: 'SERVICIO',
            icono: '',
            disponible: '',
        })

        modal.value.hide()

        notificacionToast(resultado.message)

    } catch (error) {
        notificarError(error)
    }


}


const cargarIconos = () => {

    fetch('/fontawesome-icons.json')
        .then(response => response.json())
        .then(data => {
            iconos.value = data
        })
        .catch(error => {
            console.error('Error al cargar los iconos:', error);
        })
}

const actualizarIcono = (nuevoIcono) => {

    datosServicio.icono = nuevoIcono

}


const eliminar = async (idServicio) => {



    const confirmacion = await confirmarAccion("¿Deseas eliminar este servicio?")

    if (!confirmacion) return

    try {
        const resultado = await eliminarServicio(idServicio)

        establecimiento.value.servicios = establecimiento.value.servicios.filter(item => item.id != idServicio)

        notificacionToast(resultado.message)

    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
    }



}

const editar = (item) => {


    mostrarFormulario()
    Object.assign(datosServicio, item)
    idServicioActualizar.value = item.id

}


onMounted(() => {
    cargarEstablecimiento()
    cargarIconos()

    console.log(userStore.isLoggedIn);
    
})

onBeforeUnmount(() => {
    clearInterval(intervaloHora)
})

</script>

<template>
    <!-- ==================== DETAIL CONTENT ==================== -->
    <div class="container detail-page py-5">
        <div class="row">

            <!-- ===== MAIN CONTENT ===== -->
            <div class="col-lg-8 mb-4">

                <!-- Listing Header Card -->
                <div class="detail-header-card anim scale-in">
                    <div class="detail-gallery">
                        <img :src="establecimiento.url_imagen" alt="Ridenow Sports" class="detail-main-img">
                    </div>
                    <div class="detail-header-body">
                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                                <span class="detail-category cat-automotive">
                                    <i :class="establecimiento.categoria?.icono" class="text-primary"> </i>
                                    {{ establecimiento.categoria?.nombre }}
                                </span>
                                <h2 class="detail-title">
                                    {{ establecimiento.nombre }}
                                </h2>
                            </div>
                            <span v-if="verificarHorario" class="badge bg-success"><i class="fas fa-clock me-1"></i>
                                Abierto Ahora
                            </span>
                            <span v-else class="badge bg-danger"><i class="fas fa-clock me-1"></i>
                                Cerrado
                            </span>
                            <!-- <span class="badge bg-warning"><i class="fas fa-clock me-1"></i>
                                Cierra pronto
                            </span> -->
                        </div>
                        <p class="detail-address">
                            <i class="fas fa-map-marker-alt"></i>
                            {{ establecimiento.direccion }}
                        </p>
                        <div class="detail-contact-row">
                            <span><i class="fas fa-phone-alt"></i> (591) {{ establecimiento.telefono }}</span>
                            <span v-if="establecimiento.email"><i class="fas fa-envelope"></i> {{ establecimiento.email
                            }}</span>
                            <span v-if="establecimiento.website"><i class="fas fa-globe"></i> {{ establecimiento.website
                            }}</span>
                        </div>
                        <div class="detail-rating mt-2 d-none">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span class="rating-text">4.5 (28 Reviews)</span>
                        </div>
                    </div>
                </div>

                <!-- About Section -->
                <div class="detail-section anim fade-up">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle me-2"></i> Descripcion</h4>
                    <p>{{ establecimiento.descripcion }}</p>

                </div>

                <!-- Services & Products Section -->
                <div class="detail-section anim fade-up anim-d1">
                    <h4 class="detail-section-title"><i class="fas fa-concierge-bell me-2"></i>
                        Servicios/Productos
                    </h4>
                    <div class="row">

                        <div v-for="serv in establecimiento.servicios" :key="serv.id" class="col-md-6 mb-3">
                            <div class="service-card">
                                <span 
                                     v-if="userStore.isLoggedIn"
                                class=" position-absolute top-0 end-0 me-2 mt-2" >
                                    <a href="javascript:void(0)" class="  text-muted me-2">
                                        <i class=" fas fa-pencil" @click="editar(serv)"></i>

                                    </a>
                                    <a href="javascript:void(0)" class="  text-muted ">
                                        <i class=" fas fa-trash" @click="eliminar(serv.id)"></i>

                                    </a>
                                </span>

                                <div class="service-icon"><i :class="serv.icono"></i></div>
                                <div class="service-info">
                                    <h6>{{ serv.nombre_servicio }}</h6>
                                    <p>{{ serv.descripcion_servicio }}</p>
                                    <span class="service-price">Bs. {{ serv.precio }}</span>
                                </div>
                            </div>
                        </div>


                        <div 
                        v-if="userStore.isLoggedIn"
                        class="col-md-6 mb-3">
                            <a href="javascript:void(0)" class="text-decoration-none " @click="mostrarFormulario">
                                <div class="service-card d-flex align-items-center">
                                    <div class="service-icon"><i class="fas fa-plus"></i></div>
                                    <div class="service-info ">
                                        <h6>Agregar Servicio / Producto</h6>
                                    </div>
                                </div>
                            </a>
                        </div>


                    </div>
                </div>

                <!-- Photo Gallery -->
                <div class="detail-section anim fade-up anim-d2 d-none">
                    <h4 class="detail-section-title"><i class="fas fa-images me-2"></i>Photo Gallery</h4>
                    <div class="detail-gallery-grid">
                        <div class="gallery-thumb"><img src="../assets/img/placeholder.png" alt="Gallery 1"></div>
                        <div class="gallery-thumb"><img src="../assets/img/placeholder.png" alt="Gallery 2"></div>
                        <div class="gallery-thumb"><img src="../assets/img/placeholder.png" alt="Gallery 3"></div>
                        <div class="gallery-thumb"><img src="../assets/img/placeholder.png" alt="Gallery 4"></div>
                        <div class="gallery-thumb"><img src="../assets/img/placeholder.png" alt="Gallery 5"></div>
                        <div class="gallery-thumb"><img src="../assets/img/placeholder.png" alt="Gallery 6"></div>
                    </div>
                </div>

                <!-- Reviews -->
                <div class="detail-section anim fade-up anim-d3 d-none">
                    <h4 class="detail-section-title"><i class="fas fa-comments me-2"></i>Reviews (3)</h4>

                    <div class="review-item">
                        <div class="review-avatar"><i class="fas fa-user"></i></div>
                        <div class="review-body">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>John Doe</strong>
                                <span class="review-date">Feb 15, 2026</span>
                            </div>
                            <div class="review-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p>Excellent service! The team was very professional and helped me find exactly what I
                                needed. Highly recommended for anyone looking for quality motorcycles.</p>
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-avatar"><i class="fas fa-user"></i></div>
                        <div class="review-body">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>Jane Smith</strong>
                                <span class="review-date">Jan 28, 2026</span>
                            </div>
                            <div class="review-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="far fa-star"></i>
                            </div>
                            <p>Great selection of vehicles and accessories. The financing process was smooth and
                                straightforward. Would definitely visit again.</p>
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-avatar"><i class="fas fa-user"></i></div>
                        <div class="review-body">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>Mike Johnson</strong>
                                <span class="review-date">Dec 10, 2025</span>
                            </div>
                            <div class="review-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                            </div>
                            <p>Brought my bike in for maintenance and was impressed by the quality of work. Fair pricing
                                and they completed everything on time as promised.</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ===== SIDEBAR ===== -->
            <div class="col-lg-4 anim fade-right anim-d2">

                <!-- Business Hours -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-clock me-2"></i>Horarios de Atención</h5>
                    <ul class="business-hours">
                        <li><span>Lunes</span><span>{{ establecimiento.horario_apertura }} AM - {{
                            establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Martes</span><span>{{ establecimiento.horario_apertura }} AM - {{
                            establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Miércoles</span><span>{{ establecimiento.horario_apertura }} AM - {{
                            establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Jueves</span><span>{{ establecimiento.horario_apertura }} AM - {{
                            establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Viernes</span><span>{{ establecimiento.horario_apertura }} AM - {{
                            establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Sábado</span><span>{{ establecimiento.horario_apertura }} AM - {{
                            establecimiento.horario_cierre }} PM</span></li>
                        <li class="closed"><span>Domingo</span><span>Cerrado</span></li>
                    </ul>
                </div>

                <!-- Location Map -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-map-marked-alt me-2"></i>Location</h5>
                    <div class="sidebar-map">

                        <Mapa :latitude="establecimiento.latitud" :longitude="establecimiento.longitud"
                            :isDraggable="false" />
                    </div>
                </div>

                <!-- Contact -->
                <div class="detail-sidebar-card d-none">
                    <h5 class="sidebar-card-title"><i class="fas fa-envelope me-2"></i>Send a Message</h5>
                    <form class="sidebar-contact-form">
                        <input type="text" class="form-control" placeholder="Your Name">
                        <input type="email" class="form-control" placeholder="Your Email">
                        <textarea class="form-control" rows="3" placeholder="Your Message"></textarea>
                        <button type="submit" class="btn btn-send-message w-100">
                            <i class="fas fa-paper-plane me-1"></i> SEND MESSAGE
                        </button>
                    </form>
                </div>

                <!-- Social Share -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-share-alt me-2"></i>Share This Listing</h5>
                    <div class="detail-social-share">
                        <a href="#" class="share-btn share-facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="share-btn share-twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="share-btn share-google"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="share-btn share-linkedin"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="share-btn share-pinterest"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
    </button> -->

    <!-- Modal -->
    <div class="modal fade" id="modaServicios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="modaServiciosLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modaServiciosLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <Form :validation-schema="serviciosValidationSchema" @submit="gardarServicio" id="registerForm">

                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label for="nombre_servicio" class="form-label"> Servicio / Producto *</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-tag"></i></span>
                                    <Field type="text" v-model="datosServicio.nombre_servicio" name="nombre_servicio"
                                        class="form-control" id="nombre_servicio" placeholder="" required />
                                </div>
                                <ErrorMessage name="nombre_servicio" class="small text-danger" />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="regLastName" class="form-label">Precio *</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
                                    <Field type="number" v-model="datosServicio.precio" name="precio"
                                        class="form-control" id="regLastName" step="0.01" required />
                                </div>
                                <ErrorMessage name="precio" class="small text-danger" />

                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="tipo" class="form-label">Tipo *</label>
                                <div class="input-group">
                                    <Field as="select" class="form-select" id="tipo" name="tipo"
                                        v-model="datosServicio.tipo" required>
                                        <option value="SERVICIO">Servicio</option>
                                        <option value="PRODUCTO"> Producto</option>
                                    </Field>
                                </div>
                                <ErrorMessage name="tipo" class="small text-danger" />

                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="descripcion_servicio" class="form-label">Descripción *</label>
                            <div class="input-group">
                                <Field as="textarea" class="form-control" id="descripcion_servicio"
                                    v-model="datosServicio.descripcion_servicio" name="descripcion_servicio" required />
                            </div>
                            <ErrorMessage name="descripcion_servicio" class="small text-danger" />

                        </div>

                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="">Estado:</label>

                                <div class="form-check form-switch">
                                    <Field class="form-check-input" type="checkbox" role="switch"
                                        v-model="datosServicio.disponible" id="switchCheckDefault" :value="true"
                                        name="disponible" />
                                    <label class="form-check-label" for="switchCheckDefault">
                                        Disponible / No Disponible
                                    </label>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <IconPicker :icons="iconos" :modelValue="datosServicio.icono"
                                    @update:modelValue="actualizarIcono" />
                            </div>

                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-warning">
                            <i class="fas fa-save"> </i>
                            Guardar
                        </button>
                    </div>
                </Form>

            </div>
        </div>
    </div>

</template>