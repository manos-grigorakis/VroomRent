<template>
  <BaseWrapper>
    <BaseSpinner v-if="isLoading" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle._id"
        :vehicle="vehicle"
        :calculatePrice="true"
        showVehicleButtton
      />
    </div>
  </BaseWrapper>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import VehicleCard from '../shared/VehicleCard.vue'

const store = useStore()

const isLoading = ref(false)

const fetchVehicle = async () => {
  try {
    isLoading.value = true
    await store.dispatch('vehicles/fetchVehicles')
    isLoading.value = false
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
}

const vehicles = computed(() => store.getters['vehicles/allVehicles'])

onMounted(() => {
  fetchVehicle()
})

// Check this before removing them!!!!
// const updatePickupDate = (date) => {
//   store.commit('bookings/setPickupDate', date)
// }

// const updateDropoffDate = (date) => {
//   store.commit('bookings/setDropoffDate', date)
// }
</script>
