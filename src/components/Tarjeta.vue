<script setup>

defineProps({
    establecimiento: {
        type: Object,
        required: true
    }
})

</script>



<template>

    <div class="col-md-4 col-sm-6">
        <a href="" class="listing-card-link">
            <div class="listing-card">
                <div class="card-img-wrapper">
                    <img :src="establecimiento.url_imagen" :alt="establecimiento.nombre">
                </div>
                <div class="card-body">
                    <div class="card-category cat-automotive">{{ establecimiento.categoria.nombre }}</div>
                    <h5 class="card-title">{{ establecimiento.nombre }}</h5>
                    <p class="card-address">
                        <i class="fas fa-map-marker-alt"></i>
                        {{ establecimiento.direccion }}
                    </p>
                </div>
            </div>
        </a>
    </div>


</template>