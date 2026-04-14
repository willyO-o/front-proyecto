<script setup>

import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

import { getEstablecimientoPublicID } from '@/services/establecimientoService'
import Mapa from '@/components/Mapa.vue';

const establecimiento = ref({})

const route = useRoute()

const cargarEstablecimiento = async () => {

    const resultado = await getEstablecimientoPublicID(route.params.id)

    establecimiento.value = resultado.data
    console.log("establecimiento: ", establecimiento.value);


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

onMounted(() => {
    cargarEstablecimiento()
})

onBeforeUnmount(()=>{
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
                        <img src="../assets/img/placeholder.png" alt="Ridenow Sports" class="detail-main-img">
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
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-motorcycle"></i></div>
                                <div class="service-info">
                                    <h6>Motorcycle Sales</h6>
                                    <p>Wide selection of new and pre-owned motorcycles from top brands.</p>
                                    <span class="service-price">From $3,500</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-tools"></i></div>
                                <div class="service-info">
                                    <h6>Repair & Maintenance</h6>
                                    <p>Professional service center with certified technicians for all makes.</p>
                                    <span class="service-price">From $75/hr</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-hard-hat"></i></div>
                                <div class="service-info">
                                    <h6>Parts & Accessories</h6>
                                    <p>Genuine OEM parts, helmets, jackets, gloves and riding gear.</p>
                                    <span class="service-price">From $15</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-file-signature"></i></div>
                                <div class="service-info">
                                    <h6>Financing Options</h6>
                                    <p>Flexible financing plans with competitive rates and easy approvals.</p>
                                    <span class="service-price">0% APR Available</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-exchange-alt"></i></div>
                                <div class="service-info">
                                    <h6>Trade-In Program</h6>
                                    <p>Get top dollar for your current vehicle with our trade-in evaluation.</p>
                                    <span class="service-price">Free Appraisal</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-shipping-fast"></i></div>
                                <div class="service-info">
                                    <h6>Delivery Service</h6>
                                    <p>Nationwide delivery available for all purchased vehicles.</p>
                                    <span class="service-price">From $199</span>
                                </div>
                            </div>
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
                        <li><span>Lunes</span><span>{{ establecimiento.horario_apertura }} AM - {{ establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Martes</span><span>{{ establecimiento.horario_apertura }} AM - {{ establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Miércoles</span><span>{{ establecimiento.horario_apertura }} AM - {{ establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Jueves</span><span>{{ establecimiento.horario_apertura }} AM - {{ establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Viernes</span><span>{{ establecimiento.horario_apertura }} AM - {{ establecimiento.horario_cierre }} PM</span></li>
                        <li><span>Sábado</span><span>{{ establecimiento.horario_apertura }} AM - {{ establecimiento.horario_cierre }} PM</span></li>
                        <li class="closed"><span>Domingo</span><span>Cerrado</span></li>
                    </ul>
                </div>

                <!-- Location Map -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-map-marked-alt me-2"></i>Location</h5>
                    <div class="sidebar-map">
   
                        <Mapa :latitude="establecimiento.latitud" :longitude="establecimiento.longitud" :isDraggable="false" />
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

</template>