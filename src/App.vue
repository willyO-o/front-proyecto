<script setup>

import { onMounted, nextTick } from 'vue';
import { iniciarAnimaciones } from '@/assets/js/animations';
import Navegacion from '@/components/layouts/Navegacion.vue';
import Footer from '@/components/layouts/Footer.vue';


onMounted(() => {

  // import('@/assets/js/animations')

  nextTick(() => {

    iniciarAnimaciones()

  })
})



</script>

<template>

   <Navegacion />

  <RouterView />

  <Footer />

</template>

<style scoped></style>
