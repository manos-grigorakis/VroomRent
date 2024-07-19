<template>
  <section class="flex flex-col gap-20 mb-20 tracking-wide px-4 md:px-8">
    <BaseSpinner v-if="isLoading" />
    <h2 class="block lg:hidden text-3xl font-Montserrat font-semibold text-center">
      Choose Your Extras
    </h2>
    <div
      class="flex flex-col gap-8 items-center lg:items-start justify-center md:gap-20 lg:flex-row"
    >
      <!-- Div for divider! -->
      <div class="flex gap-10">
        <div class="flex flex-col gap-4 bg-white px-8 py-8 rounded-lg drop-shadow-md">
          <!-- Header -->
          <div class="flex justify-between">
            <h2 class="text-2xl font-Montserrat font-semibold">My Vehicle</h2>
            <router-link class="flex items-center text-xs font-light hover:underline"
              ><box-icon name="edit-alt" class="w-5 h-5"></box-icon>Change Vehicle</router-link
            >
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
          <RentalDetails />
          <hr class="text-[#ccc] w-[60%] mx-auto" />
          <!-- Extras -->
          <div>
            <h2 class="text-xl font-Montserrat font-semibold mb-2">Extras</h2>
            <transition-group name="selected-extra" tag="ul" class="flex flex-col gap-2">
              <li v-for="extra in selectedExtras" :key="extra._id">
                <p v-if="extra.title === 'Prepaid Fuel'" class="flex justify-between">
                  - {{ extra.title }} <span>$ {{ extra.price.toFixed(2) }}</span>
                </p>
                <p
                  v-else-if="extra.title === 'Child Safety Seats'"
                  class="flex justify-between items-center"
                >
                  <span>
                    - {{ extra.title }}
                    <small>({{ numberOfDays }} days, {{ childSeatCount }} seats)</small>
                  </span>
                  <span>$ {{ (extra.price * numberOfDays * childSeatCount).toFixed(2) }}</span>
                </p>
                <p v-else class="flex justify-between">
                  <span>
                    - {{ extra.title }} <small>({{ numberOfDays }} days)</small>
                  </span>
                  <span>$ {{ (extra.price * numberOfDays).toFixed(2) }}</span>
                </p>
              </li>
            </transition-group>
          </div>
          <hr class="text-goldenYellow-default" />
          <div class="">
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

          <button
            @click="handleContinueButton"
            class="flex w-full justify-center rounded bg-customBlue-default hover:bg-customBlue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Continue
          </button>
        </div>
        <div class="hidden w-0.5 h-screen bg-lightGray rounded-lg lg:block"></div>
      </div>
      <!-- Extras -->
      <section class="flex flex-col gap-8">
        <h2 class="hidden lg:block text-3xl font-Montserrat font-semibold">Choose Your Extras</h2>
        <ExtrasDetails />
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import BaseSpinner from '../ui/BaseSpinner.vue'
import VehicleDetails from '@/components/booking/VehicleDetails.vue'
import RentalDetails from '@/components/booking/RentalDetails.vue'
import ExtrasDetails from '@/components/booking/ExtrasDetails.vue'

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

const numberOfDays = computed(() => store.getters['bookings/numberOfDays'])
const childSeatCount = computed(() => store.getters['bookings/childSeatCount'])

// const selectedExtras = computed(() => store.state.bookings.selectedExtras)
const selectedExtras = computed(() => {
  return [...store.state.bookings.selectedExtras, ...store.state.bookings.fuelExtraCharge]
})
const calculateTotalPrice = computed(() => store.getters['bookings/calculateTotalPrice'])

// Calcuates price of vehicle with the selected days number user has selected
const calculateVehiclePrice = (price) => {
  const numberOfDays = store.getters['bookings/numberOfDays']
  const sum = price * numberOfDays
  return sum.toFixed(2)
}

const handleContinueButton = () => {
  router.push('/checkout')
}

onMounted(() => fetchSelectedVehicle())
</script>

<style scoped>
.selected-extra-enter-from,
.selected-extra-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.selected-extra-enter-active {
  transition: all 0.4s ease-out;
}
.selected-extra-enter-to,
.selected-extra-leave-from {
  opacity: 1;
  transform: scale(1);
}

.selected-extra-leave-active {
  transition: all 0.3s ease-in;
}
</style>
