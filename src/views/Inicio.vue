<script setup>
import MapaBanner from '@/components/MapaBanner.vue';

import { ref, onMounted, nextTick } from 'vue';

import { getCategoriasPublic } from '@/services/categoriaService'
import { getEstablecimientosPublic } from '@/services/establecimientoService'

import Tarjeta from '@/components/Tarjeta.vue';

import { useStorage } from '@vueuse/core'


const categorias = ref([])

const establecimientos = ref([])

const cordenadasEnfocar = ref({})


const parametros = ref({
    busqueda: '',
    categoria_id: 0,
    porPagina: 9,
    pagina: 1,
    orden: '',

})

const cargando = ref(false)
const totalResultados = ref(0)

const esGrid = useStorage('esgrid', true)


const cargarCategorias = async () => {

    const resultado = await getCategoriasPublic()
    categorias.value = resultado.data
}

const cargarEstablecimientos = async () => {

    cargando.value = true
    establecimientos.value = []
    const resultado = await getEstablecimientosPublic(parametros.value)
    establecimientos.value = resultado.data

    console.log(establecimientos.value)
    totalResultados.value = resultado.total
    cargando.value = false
}

const filtrarPorCategoria = (id = 0) => {
    parametros.value.categoria_id = id
    cargarEstablecimientos()
}

const limpiarFiltros = () => {
    parametros.value.busqueda = ''
    parametros.value.categoria_id = 0
}

const enfocarMapa=  (coord) =>{

    cordenadasEnfocar.value = {}

    cordenadasEnfocar.value.lat = coord.lat
    cordenadasEnfocar.value.lng = coord.lng
    cordenadasEnfocar.value.id = coord.id

    const mapa = document.getElementById('mapBanner')
    if(mapa){
        mapa.scrollIntoView({ behavior: 'smooth' , block: 'center'})
    }
    
}



onMounted(() => {

    cargarCategorias()
    cargarEstablecimientos()
})






</script>

<template>


    <MapaBanner :establecimientos="establecimientos"  :coordenadas="cordenadasEnfocar" />

    <!-- ==================== RESERVATION / SEARCH SECTION ==================== -->
    <section class="reservation-section">
        <div class="container">
            <h2 class="anim fade-down">Encuentra tu lugar ideal</h2>
            <div class="search-bar-wrapper anim fade-up anim-d2">
                <select class="form-select" style="flex:1; min-width:160px;" v-model="parametros.categoria_id">
                    <option :value="0">Seleccionar categoría</option>
                    <option v-for="itemCat in categorias" :value="itemCat.id"  :key="itemCat.id">{{ itemCat.nombre  }}</option>
      
                </select>
                <div class="input-with-icon">
                    <input type="text" v-model="parametros.busqueda" class="form-control" placeholder="¿Qué estás buscando?">
                    <i class="fas fa-map-marker-alt icon-right"></i>
                </div>
                <select class="form-select d-none" style="flex:1; min-width:140px;">
                    <option>- All Time -</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Night</option>
                </select>
                <button class=" btn-find" @click="cargarEstablecimientos">Buscar</button>
                <button class="btn btn-danger" @click="limpiarFiltros">Limpiar</button>
            </div>
        </div>
    </section>

    <!-- ==================== LISTING HEADER ==================== -->
    <div class="listing-header">
        <h3> Establecimientos   <span>[{{ totalResultados }}]</span></h3>
    </div>

    <!-- ==================== MAIN CONTENT ==================== -->
    <div class="container pb-5">
        <div class="row">
            <!-- ===== SIDEBAR ===== -->
            <div class="col-lg-3 mb-4 anim fade-left">
                <!-- Results bar (above sidebar on mobile) -->
                <div class="results-bar d-lg-none">
                    <div class="result-count">Tu busqueda retorno <strong>{{ totalResultados }}</strong> resultados</div>
                </div>
                <ul class="sidebar-categories">
                    <li>
                        <a href="javascript:void(0)" @click="filtrarPorCategoria(0)" class="cat-all "
                            :class="{ 'active': parametros.categoria_id == 0 }">
                            <i class="fas fa-th-large"></i> Todas las categorías
                        </a>
                    </li>

                    <li v-for="categoria in categorias" :key="categoria.id">
                        <a href="javascript:void(0)" @click="filtrarPorCategoria(categoria.id)"
                            class="cat-accommodation" :class="{ 'active': parametros.categoria_id == categoria.id }">
                            <i :class="categoria.icono"></i> {{ categoria.nombre }}
                        </a>
                    </li>
                </ul>
            </div>

            <!-- ===== LISTINGS ===== -->
            <div class="col-lg-9 anim fade-right anim-d2">
                <!-- Results bar -->
                <div class="results-bar d-none d-lg-flex">
                    <div class="result-count">Tu busqueda retorno <strong>{{ totalResultados }}</strong> resultados</div>
                    <div class="d-flex align-items-center gap-2">
                        <select class="sort-select" v-model="parametros.orden"  @change="cargarEstablecimientos" >
                            <option value="">Ordenar resultados por</option>
                            <option value="reciente">Recientes</option>
                            <option value="antiguo">Antiguos</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                        <div class="view-options btn-group">
                            <a href="javascript:void(0)"  @click="esGrid = true" class="btn " :class="{'active':esGrid}" ><i class="fas fa-th"></i></a>
                            <a href="javascript:void(0)"  @click="esGrid = false"  class="btn" :class="{'active':!esGrid}"><i class="fas fa-list"></i></a>
                        </div>
                    </div>
                </div>

                <!-- ROW 1 -->
                <div class="row">


                    <Tarjeta v-for="item in establecimientos" :key="item.id" 
                    :establecimiento="item" 
                     :grid="esGrid"
                     @ver-en-mapa="enfocarMapa"
                     />


                    <div v-if="cargando && establecimientos.length == 0" class="text-center py-5">

                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                    </div>

                    <div v-if="establecimientos.length == 0  && !cargando" class="text-center py-5">
                        <h4>No se encontraron establecimientos</h4>
                        
                    </div>





                </div>




                <!-- LOAD MORE -->
                <div class="text-center mt-3 mb-4">
                    <button class="btn-load-more" id="loadMoreBtn">LOAD MORE</button>
                </div>
            </div>
        </div>
    </div>



</template>
