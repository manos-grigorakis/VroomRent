<template>
  <BaseWrapper heading="Featured Vehicles">
    <Carousel class="w-full lg:max-w-7xl">
      <CarouselContent class="-ml-1">
        <CarouselItem
          v-for="vehicle in vehicles"
          :key="vehicle._id"
          class="lg:pl-10 md:basis-1/2 lg:basis-1/3"
        >
          <VehicleCard :vehicle="vehicle" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </BaseWrapper>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import VehicleCard from '../shared/VehicleCard.vue'
import BaseWrapper from '../ui/BaseWrapper.vue'

const store = useStore()

const fetchVehicle = () => {
  store.dispatch('vehicles/fetchVehicles')
}

const vehicles = computed(() => store.getters['vehicles/allVehicles'])

onMounted(() => {
  fetchVehicle()
})
</script>
