<script setup>

import { onMounted, ref } from 'vue';

import L from 'leaflet';

const map = ref(null)

const latitud = ref(-16.492204)
const longitud = ref(-68.176485)

const marker = ref(null)


const emit = defineEmits(['obtener-coordenadas'])

const inicializarMapa = () => {

    if (map.value) {
        map.value.remove()
    }

    map.value = L.map('map-canvas').setView([latitud.value, longitud.value], 12)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map.value);

    marker.value = L.marker([latitud.value, longitud.value], {
        draggable: true
    }).addTo(map.value)

    marker.value.on('dragend', function (evento) {

        const posision = evento.target.getLatLng()

        emit('obtener-coordenadas', posision)
        // console.log(posision)

    })



}

const obtenerUbicacion = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((ubicacion) => {
            latitud.value = ubicacion.coords.latitude
            longitud.value = ubicacion.coords.longitude
            map.value.setView([latitud.value, longitud.value], 15)
            if (marker.value) {

                marker.value.setLatLng([latitud.value, longitud.value])
                emit('obtener-coordenadas', { lat: latitud.value, lng: longitud.value })

            }

        })
    } else {
        alert('Tu navegador no soporta la geolocalización')
    }

}


onMounted(() => {
    inicializarMapa()
    emit('obtener-coordenadas', { lat: latitud.value, lng: longitud.value })
    obtenerUbicacion()
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