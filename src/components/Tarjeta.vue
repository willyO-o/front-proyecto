<script setup>

defineProps({
    establecimiento: {
        type: Object,
        required: true
    },
    grid: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits(['ver-en-mapa'])

</script>



<template>

    <div :class="grid ? 'col-md-4 col-sm-6' : ''">
        <a v-if="grid" class="listing-card-link">
            <div class="listing-card">
                <div class="card-img-wrapper">
                    <img :src="establecimiento.url_imagen" :alt="establecimiento.nombre">
                </div>
                <div class="card-body">
                    <div class="card-category cat-automotive">{{ establecimiento.categoria.nombre }}</div>
                    <h5 class="card-title"><a href="#" class="text-decoration-none text-dark">{{ establecimiento.nombre
                    }}</a></h5>
                    <p class="card-address">
                        <i class="fas fa-map-marker-alt"></i>
                        {{ establecimiento.direccion }}
                    </p>
                    <a @click="emits('ver-en-mapa', { lat: establecimiento.latitud, lng: establecimiento.longitud })"
                        class="text-decoration-none text-primary" href="javascript:void(0)">
                        <i class="fas fa-map-marker-alt"></i>
                        Ver en el mapa
                    </a>
                </div>
            </div>
        </a>
        <a v-else class="listing-list-item-link">
            <div class="listing-list-item">
                <div class="listing-list-img">
                    <img :src="establecimiento.url_imagen" :alt="establecimiento.nombre">
                </div>
                <div class="listing-list-content">
                    <div class="listing-list-category cat-automotive">{{ establecimiento.categoria.nombre }}</div>
                    <h5 class="listing-list-title"><a href="#" class="text-decoration-none text-dark">{{
                        establecimiento.nombre }}</a></h5>
                    <p class="listing-list-address">
                        {{ establecimiento.direccion }}
                        <span class="listing-list-phone"><i class="fas fa-phone-alt"></i> {{ establecimiento.telefono
                        }}</span>
                    </p>
                    <a @click="emits('ver-en-mapa', { lat: establecimiento.latitud, lng: establecimiento.longitud })"
                        class="text-decoration-none text-primary" href="javascript:void(0)">
                        <i class="fas fa-map-marker-alt"></i>
                        Ver en el mapa
                    </a>

                </div>
            </div>
        </a>
    </div>



</template>