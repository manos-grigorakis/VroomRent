<template>
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
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

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
