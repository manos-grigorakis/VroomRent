<template>
  <section>
    <TheHero />
    <FeaturedVehicles class="py-[200px]" />
    <WhyChooseUs class="mb-[520px]" />
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import TheHero from '@/components/home/TheHero.vue'

const FeaturedVehicles = defineAsyncComponent(
  () => import('@/components/home/FeaturedVehicles.vue')
)
const WhyChooseUs = defineAsyncComponent(() => import('@/components/home/WhyChooseUs.vue'))
</script>
