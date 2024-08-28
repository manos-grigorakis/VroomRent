<template>
  <BaseWrapper>
    <BaseSpinner v-if="isLoading" />
    <div
      v-if="filteredVehicles.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <VehicleCard
        v-for="vehicle in filteredVehicles"
        :key="vehicle._id"
        :vehicle="vehicle"
        :calculatePrice="true"
        showVehicleButtton
      />
    </div>
    <div v-else>
      <h2 class="text-lg font-Montserrat font-semibold">
        No vehicles available, with the selected filters.
      </h2>
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

const filteredVehicles = computed(() => store.getters['vehicles/filteredVehicles'])

onMounted(() => {
  fetchVehicle()
})
</script>
