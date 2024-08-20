<template>
  <section>
    <TheHero />
    <!-- class="mb-[200px] mt-[100px]" -->
    <FeaturedVehicles class="py-[200px]" />
    <WhyChooseUs />
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
