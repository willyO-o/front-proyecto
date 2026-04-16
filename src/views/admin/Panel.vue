<script setup>
import useUserStore from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import {confirmarAccion, notificacionToast} from '@/utils/alertUtil'
import { getEstablecimientos ,eliminarEstablecimiento} from '@/services/establecimientoService'

const userStore = useUserStore()

const establecimientos = ref([])


const cargarEstablecimientos = async () => {

    const resultado = await getEstablecimientos()

    establecimientos.value = resultado.data

}

const eliminar = async (id) => {

    const confirmacion = await confirmarAccion('¿Estás seguro de eliminar este establecimiento?')


    if(!confirmacion) return

    const resultado = await eliminarEstablecimiento(id)

    establecimientos.value = establecimientos.value.filter(item => item.id !== id)

    notificacionToast(resultado.message)

}

onMounted(() =>{
    cargarEstablecimientos()
})

</script>

<template>

    <div class="container py-5">

        <div class="row">
            <div class="col-12">
                <div class="detail-section anim fade-up text-center">
                    <h4 class="detail-section-titles card-title"><i class="fas fa-info-circle me-2"></i>
                        Bienvenido {{ userStore.usuario?.name }} a tu panel de administración
                    </h4>

                    <p> Aqui encontrarás todas las herramientas necesarias para gestionar tus establecimientos.</p>

                </div>

                <div class="detail-section anim fade-up position-relative ">
                    <h4 class="detail-section-title"> Listado de Establecimientos</h4>
                    <RouterLink :to="{name: 'CrearEstablecimiento'}" class="btn btn-primary btn-sm position-absolute top-0 end-0 me-2 mt-2"> 
                        <i class="fas fa-plus me-1"></i>
                        Registrar Nuevo
                    </RouterLink>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Establecimiento</td>
                                <td>Categoría</td>
                                <td> Estado</td>
                                <td></td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in establecimientos" :key="item.id">    
                                <td>
                                    {{ index + 1 }}
                                </td>
                                <td>
                                    {{ item.nombre }}
                                </td>
                                <td>
                                    <i :class="item.categoria.icono" class="text-muted"></i>
                                    {{ item.categoria.nombre }}</td>
                                <td>
                                    <span :class="item.estado  == 'ACTIVO' ? 'bg-success': 'bg-danger' " class="badge">
                                        {{ item.estado }}
                                    </span>

                                </td>
                                <td>
                                    <RouterLink :to="{name:'EditarEstablecimiento',params:{id:item.id}}" class="text-muted me-2">
                                        <i class="fas fa-pencil"></i>
                                    </RouterLink>
                                    <a href="javascript:void(0)" @click="eliminar(item.id)" class="text-muted">
                                        <i class="fas fa-trash"></i>
                                    </a>

                                </td>


                            </tr>


                        </tbody>
                    </table>


                </div>
            </div>
        </div>

    </div>


</template>