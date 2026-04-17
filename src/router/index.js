import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'

export const isLoading = ref(false)


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: () => import('@/views/Inicio.vue')
    },
    {
      path: '/establecimiento/:id',
      name: 'DetalleEstablecimiento',
      component: () => import('@/views/Detalle.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      beforeEnter: () => {
        const token = localStorage.getItem('accesToken')
        const usuario = localStorage.getItem('usuario')

        if (token && usuario) {
          return '/admin/panel'
        }
      }
    },
    {
      path: '/registrarse',
      name: 'Registrarse',
      component: () => import('@/views/Registrarse.vue'),
      beforeEnter: () => {
        const token = localStorage.getItem('accesToken')
        const usuario = localStorage.getItem('usuario')

        if (token && usuario) {
          return '/admin/panel'
        }
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'establecimiento/crear',
          name: 'CrearEstablecimiento',
          component: () => import('@/views/admin/Formulario.vue')
        },
        {
          path: 'establecimiento/:id/editar',
          name: 'EditarEstablecimiento',
          component: () => import('@/views/admin/Formulario.vue')
        },
        {
          path: 'panel',
          name: 'Panel',
          component: () => import('@/views/admin/Panel.vue')

        },
        {
          path: 'perfil',
          name: 'Perfil',
          component: () => import('@/views/admin/Perfil.vue')

        }
      ],
      beforeEnter: () => {
        const token = localStorage.getItem('accesToken')
        const usuario = localStorage.getItem('usuario')

        if (!token || !usuario) {
          return '/'
        }
      }
    },



  ],
})

router.beforeEach(() => {
  isLoading.value = true
})
router.afterEach(() => {

  setTimeout(() => {
    isLoading.value = false

  }, 500)
})


export default router
