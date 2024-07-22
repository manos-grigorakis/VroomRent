import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/fleet',
      component: () => import('@/views/FleetView.vue')
    },
    {
      path: '/choose-vehicle',
      component: () => import('@/views/booking/ChooseVehicleView.vue')
    },
    {
      path: '/choose-extras',
      component: () => import('@/views/booking/ChooseExtrasView.vue')
    },
    {
      path: '/checkout',
      component: () => import('@/views/booking/CheckoutView.vue')
    },
    {
      path: '/receipt',
      component: () => import('@/views/booking/ReceiptView.vue')
    },
    {
      path: '/contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/about-us',
      component: () => import('@/views/AboutUsView.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue')
    }
  ],
  scrollBehavior() {
    // always scroll on top
    return { top: 0 }
  }
})

export default router
