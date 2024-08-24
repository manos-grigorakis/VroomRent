<template>
  <section>
    <TheHero />
    <FeaturedVehicles />
    <WhyChooseUs />
    <OurOffers />
    <FAQS />
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import TheHero from '@/components/home/TheHero.vue'

const FeaturedVehicles = defineAsyncComponent(
  () => import('@/components/home/FeaturedVehicles.vue')
)
const WhyChooseUs = defineAsyncComponent(() => import('@/components/home/WhyChooseUs.vue'))
const OurOffers = defineAsyncComponent(() => import('@/components/home/OurOffers.vue'))
const FAQS = defineAsyncComponent(() => import('@/components/home/FAQS.vue'))
</script>
