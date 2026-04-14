<script setup>

import { onMounted, ref, watch } from 'vue';

import L from 'leaflet';

const map = ref(null)

const latitud = ref(-16.492204)
const longitud = ref(-68.176485)


const popupsMarcadores = ref({})

const props = defineProps({
    establecimientos: {
        type: Array,
        required: true
    },
    coordenadas: {
        type: Object,
        required: false
    }
})



const grupoMarcadores = ref(null)


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

    if (!grupoMarcadores.value) {
        //verificamos si el grupo de marcadores ya esta inicializado
        grupoMarcadores.value = L.layerGroup().addTo(map.value)
    } else {
        //si esta iniclizado, lo limpiamos para agregar los nuevos marcadores
        grupoMarcadores.value.clearLayers()
    }

    listado.forEach(item => {

        const myIcon = L.divIcon({
            className: 'mi-icono',
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            html: /*html*/`
                    <div style="backgroud-color: aqua; " class="pin-marcador" >
                    <i class="${item.categoria.icono}" ></i>
                    </div>
                    `
        });

        const pupup = `
            <b>${item.nombre}</b><br>
            <span>${item.direccion}</span>
    
        `

        //agregamos los marcadores al grupo de marcadores
        const marcador=L.marker([item.latitud, item.longitud], { icon: myIcon })
            .addTo(grupoMarcadores.value)
            .bindPopup(pupup)

        popupsMarcadores.value[item.id] = marcador

    })
}

const enfocar = (coordenas) => {

    if (!coordenas.lat || !coordenas.lng) return

    map.value.flyTo([coordenas.lat, coordenas.lng], 16)

    popupsMarcadores.value[coordenas.id].openPopup()
}

watch(() => props.establecimientos, (nuevoValor) => {
    agregarMarcadores(nuevoValor)

}, { immediate: true })

watch(() => props.coordenadas, (nuevasCoordenadas) => {

    enfocar(nuevasCoordenadas)
})


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