<template>
  <section class="flex flex-col gap-20 mb-20 tracking-wide px-8">
    <BaseSpinner v-if="isLoading" />
    <h2 class="text-3xl font-Montserrat font-semibold text-center">Choose Your Extras</h2>
    <div class="flex flex-col gap-8 items-center md:items-start justify-around md:flex-row">
      <!-- Div for divider! -->
      <div class="flex gap-10">
        <div class="flex flex-col gap-4 bg-white px-4 py-8 rounded-lg drop-shadow-md">
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
          <div class="">
            <div class="">
              <h2 class="text-xl font-Montserrat font-semibold mb-2">Extras</h2>
              <ul class="flex flex-col gap-2">
                <li class="flex justify-between">- Toll Pass <span>$ 10.00</span></li>
              </ul>
            </div>
          </div>
          <hr class="text-vibrantOrange-default" />
          <!-- Total -->
          <div class="mb-4">
            <p class="flex justify-between text-xl font-bold">
              Total <span class="text-xl font-bold">$ 330.00</span>
            </p>
          </div>

          <button
            class="flex w-full justify-center rounded bg-customBlue-default hover:bg-customBlue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Continue
          </button>
        </div>
        <div class="hidden w-0.5 h-screen bg-lightGray rounded-lg md:block"></div>
      </div>
      <!-- Extras -->
      <div class="flex flex-col gap-10">
        <div
          class="flex flex-col gap-4 px-6 py-8 bg-white border-2 border-lightGray rounded-lg drop-shadow-sm"
        >
          <div class="flex justify-between gap-20">
            <div class="flex sm:items-center gap-1">
              <box-icon name="shield-quarter" class="w-8"></box-icon>
              <h4 class="text-lg font-Montserrat font-bold">Additional insurance Coverage</h4>
            </div>
            <span class="text-md font-Montserrat font-semibold">$ 10.00 /day</span>
          </div>
          <p class="max-w-md">
            Enhance your peace of mind with additional coverage options like collision damage
            waiver, personal accident insurance, or supplemental liability protection.
          </p>
          <BaseButton>Select</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import BaseSpinner from '../ui/BaseSpinner.vue'
import BaseButton from '../ui/BaseButton.vue'

import VehicleDetails from '@/components/booking/VehicleDetails.vue'
import RentalDetails from '@/components/booking/RentalDetails.vue'

const store = useStore()
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

// const pickupLocation = computed(() => store.getters['bookings/pickupLocation'])
// const dropoffLocation = computed(() => store.getters['bookings/dropoffLocation'])
// const pickupDate = computed(() => store.getters['bookings/pickupDate'])
// const dropoffDate = computed(() => store.getters['bookings/dropoffDate'])

// const getImageUrl = (imageName) => {
//   return new URL(`../../assets/images/vehicles/${imageName}`, import.meta.url).href
// }

onMounted(() => {
  fetchSelectedVehicle()
})
</script>
