<template>
  <section class="flex items-center w-full min-h-screen py-6 -mt-[26px] md:-mt-16">
    <!-- Background Image -->
    <div
      class="absolute bg-hero-image bg-center bg-no-repeat bg-cover w-full h-full top-0 pointer-events-none z-0"
    ></div>

    <div class="flex flex-col items-start gap-10 md:gap-20 relative z-10 px-4 lg:px-32">
      <div class="flex flex-col gap-4 text-white" ref="heroText">
        <h1 class="text-4xl md:text-5xl font-semibold">
          Find Your <span class="text-vibrantOrange-default font-bold">Perfect</span> Ride
        </h1>
        <p class="text-lg md:text-2xl font-medium max-w-[600px]">
          From economy to luxury, choose from a wide selection of top-quality vehicles.
        </p>
      </div>
      <HeroForm ref="heroForm" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import HeroForm from '@/components/home/HeroForm.vue'

const heroText = ref(null)
const heroForm = ref(null)

onMounted(() => {
  gsap.from(heroText.value, {
    x: '-100%',
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: heroText.value,
      toggleActions: 'play none none none',
      once: true
    }
  })
  gsap.from(heroForm.value.$el, {
    x: '100%',
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: heroForm.value.$el,
      toggleActions: 'play none none none',
      once: true
    }
  })
})
</script>
