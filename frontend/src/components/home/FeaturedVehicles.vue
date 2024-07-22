<template>
  <BaseWrapper heading="Featured Vehicles">
    <Carousel class="w-full lg:max-w-7xl">
      <CarouselContent class="-ml-1">
        <CarouselItem
          v-for="vehicle in vehicles"
          :key="vehicle._id"
          class="lg:pl-10 md:basis-1/2 lg:basis-1/3"
        >
          <div class="bg-white drop-shadow-md rounded-md pt-14 pb-8">
            <VehicleDetails
              :image="vehicle.image"
              :name="vehicle.name"
              :category="vehicle.category"
              :passengers="vehicle.details.passengers"
              :big-case="vehicle.details.storage.bigCase"
              :small-case="vehicle.details.storage.smallCase"
              :transmission="vehicle.details.transmission"
              :fuel="vehicle.details.fuel"
              class="px-8"
            />

            <p class="text-center my-4">
              <span class="font-Montserrat font-bold text-lg"
                >$ {{ vehicle.price.toFixed(2) }}
              </span>
              /day
            </p>

            <div class="justify-center flex">
              <BaseButton>Choose Now</BaseButton>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </BaseWrapper>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import BaseButton from '@/components/ui/BaseButton.vue'
import VehicleDetails from '@/components/booking/VehicleDetails.vue'
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
