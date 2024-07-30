<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    <VehicleCard v-for="vehicle in vehicles" :key="vehicle._id" :vehicle="vehicle" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import VehicleCard from '@/components/shared/VehicleCard.vue'

const store = useStore()

const fetchVehicle = () => {
  store.dispatch('vehicles/fetchVehicles')
}

const vehicles = computed(() => store.getters['vehicles/allVehicles'])

onMounted(() => {
  fetchVehicle()
})
</script>
