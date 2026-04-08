import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component:  ()=> import('@/views/Inicio.vue')
    },
    {
      path: '/establecimiento/crear',
      name: 'CrearEstablecimiento',
      component: () => import('@/views/admin/Formulario.vue')
    },
    {
      path: '/establecimiento/:id/editar',
      name: 'EditarEstablecimiento',
      component: () => import('@/views/admin/Formulario.vue')
    },


  ],
})

export default router
