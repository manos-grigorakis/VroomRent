<template>
  <div class="flex flex-col gap-4 bg-white px-8 py-8 rounded-lg drop-shadow-md">
    <!-- Header -->
    <div class="flex justify-between">
      <h2 class="text-2xl font-Montserrat font-semibold">My Vehicle</h2>
      <!-- <router-link class="flex items-center text-xs font-light hover:underline"
        ><box-icon name="edit-alt" class="w-5 h-5"></box-icon>Change Vehicle</router-link
      > -->
    </div>
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

    <hr class="text-[#ccc] w-[60%] mx-auto" />
    <!-- Rental Details -->
    <RentalDetails noLink />

    <hr class="text-[#ccc] w-[60%] mx-auto" />
    <!-- Selected Extras -->
    <SelectedExtras />
    <hr class="text-goldenYellow-default" />
    <div>
      <h4 class="flex justify-between">
        Reservation Cost <span>$ {{ calculateVehiclePrice(vehicle.price) }}</span>
      </h4>
    </div>

    <hr class="text-vibrantOrange-default" />
    <!-- Total -->
    <div class="mb-4">
      <p class="flex justify-between text-xl font-bold">
        Total <span class="text-xl font-bold">$ {{ calculateTotalPrice }}</span>
      </p>
    </div>
    <BaseButton v-if="showContinueButton" @click="handleContinueButton" widthClass="w-full"
      >Continue</BaseButton
    >
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import VehicleDetails from '@/components/shared/VehicleDetails.vue'
import RentalDetails from '@/components/booking/RentalDetails.vue'
import SelectedExtras from './SelectedExtras.vue'

defineProps({
  showContinueButton: {
    type: Boolean,
    default: true
  }
})

const store = useStore()
const router = useRouter()
const isLoading = ref(false)

const fetchSelectedVehicle = async () => {
  try {
    isLoading.value = true
    await store.dispatch('bookings/fetchSelectedVehicle')
    isLoading.value = false
  } catch (error) {
    console.error(error)
  }
}

const vehicle = computed(() => store.getters['bookings/selectedVehicle'])
const calculateTotalPrice = computed(() => store.getters['bookings/calculateTotalPrice'])

// Calcuates price of vehicle with the selected days number user has selected
const calculateVehiclePrice = (price) => {
  const numberOfDays = store.getters['bookings/numberOfDays']
  const sum = price * numberOfDays
  return sum.toFixed(2)
}

const handleContinueButton = () => {
  router.push('/booking/checkout')
}

onMounted(() => fetchSelectedVehicle())
</script>
