<script setup>

import { onMounted, ref, watch } from 'vue';

import L from 'leaflet';

const map = ref(null)

const latitud = ref(-16.492204)
const longitud = ref(-68.176485)

const props = defineProps({
    establecimientos: {
        type: Array,
        required: true
    }
})


const inicializarMapa = () => {

    if (map.value) {
        map.value.remove()
    }

    map.value = L.map('map-canvas').setView([latitud.value, longitud.value], 12)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map.value);

}


const agregarMarcadores = (listado) => {


    if (!map.value) return

    // console.log("en marcadores",listado);

    listado.forEach(item => {

        L.marker([item.latitud, item.longitud]).addTo(map.value)

    })
}

watch(() => props.establecimientos, (nuevoValor) =>{
    agregarMarcadores(nuevoValor)
},{immediate:true})


onMounted(() => {
    inicializarMapa()
    // obtenerUbicacion()
})


</script>

<template>

    <!-- ==================== MAP BANNER ==================== -->
    <section class="map-banner" id="mapBanner">

        <div id="map-canvas"></div>

        <button class="map-fullscreen-btn" id="mapToggleBtn" title="Toggle Fullscreen Map">
            <i class="fas fa-expand"></i>
        </button>
    </section>

</template>

<style scoped>
#map-canvas {
    width: 100%;
    min-height: 500px;
}
</style>