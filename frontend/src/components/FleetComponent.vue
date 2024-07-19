<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    <!-- Card -->
    <div
      v-for="vehicle in vehicles"
      :key="vehicle._id"
      class="bg-white max-w-sm drop-shadow-md rounded-md pt-14 pb-8"
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
        class="px-8"
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
