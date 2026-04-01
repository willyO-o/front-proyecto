<script setup>

import { onMounted, ref } from 'vue';

import L from 'leaflet';

const map = ref(null)

const inicializarMapa = () => {

    if (map.value) {
        map.value.remove()
    }

    map.value = L.map('map-canvas').setView([-16.492204, -68.176485], 12)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map.value);

    const marker = L.marker([-16.492204, -68.176485], {
        draggable:true
    }).addTo(map.value)

    marker.on('dragend', function (evento){

        const posision = evento.target.getLatLng()

        console.log(posision)

    })



}


onMounted(() => {
    inicializarMapa()
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
    min-height: 400px;
}

</style>