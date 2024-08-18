<template>
  <section>
    <NavbarComponent />
    <RouterView />
    <FooterComponent v-if="showFooter" />
  </section>
</template>

<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavbarComponent from '@/components/layout/NavbarComponent.vue'
// import FooterComponent from './components/layout/FooterComponent.vue'

const FooterComponent = defineAsyncComponent(
  () => import('@/components/layout/FooterComponent.vue')
)

const route = useRoute()

// Shows footer in there is no meta tag in router with hideFooter to true
const showFooter = computed(() => {
  return !route.meta.hideFooter
})
</script>
