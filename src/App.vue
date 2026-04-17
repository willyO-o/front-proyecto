<script setup>

import { onMounted, nextTick, watch } from 'vue';
import { iniciarAnimaciones } from '@/assets/js/animations';
import Navegacion from '@/components/layouts/Navegacion.vue';
import Footer from '@/components/layouts/Footer.vue';

import { isLoading } from '@/router';

onMounted(() => {

  nextTick(() => {

    iniciarAnimaciones()

  })


})

watch(isLoading, () => {
  nextTick(() => {

    iniciarAnimaciones()

  })
})



</script>

<template>

  <div id="preloader" class='preloader' v-show="isLoading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <Navegacion />

  <RouterView />

  <Footer />

</template>

<style scoped>

#preloader {
  position:fixed;
  width:100%;
  height:100%;
  z-index:9999;
  background-color : white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
