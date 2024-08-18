import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import bookingRoutes from './bookingRoutes'
import userRoutes from './userRoutes'

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
      path: '/contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/about-us',
      component: () => import('@/views/AboutUsView.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { hideFooter: true }
    },
    {
      path: '/reset-password',
      component: () => import('@/components/user/auth/ResetPassword.vue'),
      props: (route) => ({ token: route.query.token }),
      meta: { hideFooter: true }
    },
    ...userRoutes,
    ...bookingRoutes,
    {
      path: '/terms-of-service',
      component: () => import('@/views/TermsofService.vue')
    },
    {
      path: '/privacy-policy',
      component: () => import('@/views/PrivacyPolicy.vue')
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
