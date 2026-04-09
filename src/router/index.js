import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: () => import('@/views/Inicio.vue')
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
    {
      path: '/establecimiento/:id',
      name: 'DetalleEstablecimiento',
      component: () => import('@/views/Detalle.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')

    },
    {
      path: '/registrarse',
      name: 'Registrarse',
      component: () => import('@/views/Registrarse.vue')

    },
    {
      path: '/panel',
      name: 'Panel',
      component: () => import('@/views/admin/Panel.vue')

    }


  ],
})

export default router
