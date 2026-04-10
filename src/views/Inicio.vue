<script setup>
import MapaBanner from '@/components/MapaBanner.vue';

import { ref, onMounted } from 'vue';

import { getCategoriasPublic } from '@/services/categoriaService'
import { getEstablecimientosPublic } from '@/services/establecimientoService'

import  Tarjeta from '@/components/Tarjeta.vue';

const categorias = ref([])

const establecimientos = ref([])


const parametros = ref({
    busqueda : '',
    categoria_id: 0,
    porPagina: 9,
    pagina: 1
})


const cargarCategorias = async () => {

    const resultado = await getCategoriasPublic()
    categorias.value = resultado.data
}

const cargarEstablecimientos = async () => {

    const resultado = await getEstablecimientosPublic(parametros.value)
    establecimientos.value = resultado.data

    console.log(establecimientos.value)

}

const filtrarPorCategoria = (id = 0 ) =>{
    parametros.value.categoria_id = id
    cargarEstablecimientos()
}



onMounted(() => {

    cargarCategorias()
    cargarEstablecimientos()
})






</script>

<template>


    <MapaBanner  :establecimientos="establecimientos" />

    <!-- ==================== RESERVATION / SEARCH SECTION ==================== -->
    <section class="reservation-section">
        <div class="container">
            <h2 class="anim fade-down">Make a Free Reservation</h2>
            <div class="search-bar-wrapper anim fade-up anim-d2">
                <span class="menu-icon"><i class="fas fa-bars"></i></span>
                <select class="form-select" style="flex:1; min-width:160px;">
                    <option>Business Services</option>
                    <option>Accommodation</option>
                    <option>Education & Learning</option>
                    <option>Automotive</option>
                    <option>Fitness & Health</option>
                    <option>Technology</option>
                </select>
                <div class="input-with-icon">
                    <input type="text" class="form-control" placeholder="New York, USA">
                    <i class="fas fa-map-marker-alt icon-right"></i>
                </div>
                <select class="form-select" style="flex:1; min-width:140px;">
                    <option>- All Time -</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Night</option>
                </select>
                <button class="btn btn-find">FIND MY TABLE</button>
            </div>
        </div>
    </section>

    <!-- ==================== LISTING HEADER ==================== -->
    <div class="listing-header">
        <h3>BUSINESS SERVICES \ INSURANCE <span>[52]</span></h3>
    </div>

    <!-- ==================== MAIN CONTENT ==================== -->
    <div class="container pb-5">
        <div class="row">
            <!-- ===== SIDEBAR ===== -->
            <div class="col-lg-3 mb-4 anim fade-left">
                <!-- Results bar (above sidebar on mobile) -->
                <div class="results-bar d-lg-none">
                    <div class="result-count">Your search returned <strong>52</strong> results</div>
                </div>
                <ul class="sidebar-categories">
                    <li>
                        <a href="javascript:void(0)"  @click="filtrarPorCategoria(0)" class="cat-all " :class="{'active':parametros.categoria_id == 0 }">
                            <i class="fas fa-th-large"></i> Todas las categorías
                        </a>
                    </li>

                    <li v-for="categoria in categorias" :key="categoria.id">
                        <a href="javascript:void(0)" @click="filtrarPorCategoria(categoria.id)" class="cat-accommodation"
                        :class="{'active': parametros.categoria_id == categoria.id}">
                            <i :class="categoria.icono"></i> {{ categoria.nombre }}
                        </a>
                    </li>
                </ul>
            </div>

            <!-- ===== LISTINGS ===== -->
            <div class="col-lg-9 anim fade-right anim-d2">
                <!-- Results bar -->
                <div class="results-bar d-none d-lg-flex">
                    <div class="result-count">Your search returned <strong>52</strong> results</div>
                    <div class="d-flex align-items-center gap-2">
                        <select class="sort-select">
                            <option>SORT RESULTS BY</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                        </select>
                        <div class="view-options btn-group">
                            <a href="index.html" class="btn active"><i class="fas fa-th"></i></a>
                            <a href="listings-list.html" class="btn"><i class="fas fa-list"></i></a>
                        </div>
                    </div>
                </div>

                <!-- ROW 1 -->
                <div class="row">


                    <Tarjeta v-for="item in establecimientos" :key="item.id" :establecimiento="item"/>


       

                    
     
                </div>

  
    

                <!-- LOAD MORE -->
                <div class="text-center mt-3 mb-4">
                    <button class="btn-load-more" id="loadMoreBtn">LOAD MORE</button>
                </div>
            </div>
        </div>
    </div>



</template>
