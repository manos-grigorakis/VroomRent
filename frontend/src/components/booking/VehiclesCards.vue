<template>
  <BaseWrapper>
    <BaseSpinnerVue v-if="isLoading" />
    <div class="flex flex-col justify-center gap-20 md:flex-row">
      <!-- Card -->
      <div
        v-for="vehicle in vehicles"
        :key="vehicle._id"
        class="bg-white max-w-sm drop-shadow-md rounded-md pt-14 pb-8 px-8"
      >
        <!-- Car details -->
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
          Total Price:
          <span class="font-Montserrat font-bold text-lg"
            >$ {{ calculateTotalPrice(vehicle.price) }}</span
          >
        </p>
        <!-- Card Button -->
        <div class="justify-center flex">
          <form @submit.prevent="chooseVehicle(vehicle._id)">
            <BaseButton>Choose Now</BaseButton>
          </form>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import BaseWrapper from '@/components/ui/BaseWrapper.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSpinnerVue from '../ui/BaseSpinner.vue'
import VehicleDetails from '@/components/booking/VehicleDetails.vue'

const store = useStore()
const router = useRouter()

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

const chooseVehicle = (id) => {
  store.commit('bookings/setVehicleId', id)
  router.push('/choose-extras')
}

// Calcuates price of vehicle with the selected days number user has selected
const calculateTotalPrice = (price) => {
  const numberOfDays = store.getters['bookings/numberOfDays']
  const sum = price * numberOfDays
  return sum.toFixed(2)
}

// Check this before removing them!!!!
// const updatePickupDate = (date) => {
//   store.commit('bookings/setPickupDate', date)
// }

// const updateDropoffDate = (date) => {
//   store.commit('bookings/setDropoffDate', date)
// }

onMounted(() => {
  fetchVehicle()
})
</script>
