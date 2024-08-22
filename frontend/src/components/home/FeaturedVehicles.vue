<template>
  <BaseWrapper heading="Featured Vehicles" class="min-h-screen justify-center">
    <Carousel class="w-full lg:max-w-7xl min-h-full" ref="carousel">
      <CarouselContent class="-ml-1">
        <CarouselItem
          v-for="vehicle in vehicles"
          :key="vehicle._id"
          class="lg:pl-10 md:basis-1/2 lg:basis-1/3 mx-auto"
        >
          <VehicleCard :vehicle="vehicle" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </BaseWrapper>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import VehicleCard from '../shared/VehicleCard.vue'
import BaseWrapper from '../ui/BaseWrapper.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = useStore()
const carousel = ref(null)

const fetchVehicle = () => {
  store.dispatch('vehicles/fetchVehicles')
}

const vehicles = computed(() => store.getters['vehicles/allVehicles'])

onMounted(() => {
  fetchVehicle()
  gsap.from(carousel.value.$el, {
    scale: 0.8,
    duration: 1,
    ease: 'back.out',
    scrollTrigger: {
      trigger: carousel.value.$el,
      start: 'top 90%',
      toggleActions: 'play none play reverse'
    }
  })
  ScrollTrigger.refresh()
})
</script>
