<template>
  <BaseWrapper heading="Featured Vehicles">
    <div class="flex flex-col justify-center gap-20 md:flex-row">
      <!-- Card -->
      <div
        v-for="vehicle in vehicles"
        :key="vehicle._id"
        class="bg-white max-w-sm drop-shadow-md rounded-md pt-14 pb-8 px-8"
      >
        <VehicleDetails
          :image="vehicle.image"
          :name="vehicle.name"
          :category="vehicle.category"
          :passengers="vehicle.details.passengers"
          :big-case="vehicle.details.storage.bigCase"
          :small-case="vehicle.details.storage.smallCase"
          :transmission="vehicle.details.transmission"
          :fuel="vehicle.details.fuel"
        />
        <!-- Card price -->
        <p class="text-center my-4">
          <span class="font-Montserrat font-bold text-lg">$ {{ vehicle.price.toFixed(2) }} </span>
          /day
        </p>
        <!-- Card Button -->
        <div class="justify-center flex">
          <BaseButton>Choose Now</BaseButton>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BaseWrapper from '@/components/ui/BaseWrapper.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import VehicleDetails from '@/components/booking/VehicleDetails.vue'

const store = useStore()

const fetchVehicle = () => {
  store.dispatch('vehicles/fetchVehicles')
}

const vehicles = computed(() => store.getters['vehicles/allVehicles'])

onMounted(() => {
  fetchVehicle()
})
</script>
