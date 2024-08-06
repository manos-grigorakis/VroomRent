<template>
  <section class="flex flex-col items-center gap-20 mb-20 tracking-wide px-4 mt-8">
    <BaseSpinner v-if="isLoading" />
    <!-- Header text -->
    <div class="text-center font-Montserrat tracking-wide">
      <transition name="fade-in">
        <box-icon
          v-if="!isLoading"
          type="solid"
          name="check-circle"
          color="#84cc16"
          class="w-10 h-10"
        ></box-icon>
      </transition>
      <h2 class="text-center gap-2 text-lg md:text-2xl font-bold mb-2">
        Thank you for choosing VroomRent!
      </h2>

      <h3 class="text-base md:text-xl font-semibold mb-2">
        Your booking has been successfully placed.
      </h3>
      <h4 class="text-base md:text-lg font-medium">
        A confirmation email with all the details of your booking has been sent to
        <span class="text-vibrantOrange-default font-semibold">{{ formData.email }}</span>
      </h4>
    </div>

    <!-- Container -->
    <div
      class="flex flex-col justify-center gap-4 xl:flex-row lg:gap-10 bg-white px-8 py-8 rounded-lg drop-shadow-md"
    >
      <!-- Rental Details -->
      <RentalDetails noLink />
      <div class="w-0.5 min-h-full bg-lightGray"></div>
      <!-- Vehicle -->
      <div class="flex flex-col">
        <h2 class="text-xl font-Montserrat font-semibold mb-2">My Vehicle</h2>

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
      </div>

      <div class="w-0.5 min-h-full bg-lightGray"></div>

      <!-- Extras -->
      <div>
        <h2 class="text-xl font-Montserrat font-semibold mb-2">Extras</h2>

        <ul class="flex flex-col gap-2">
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
            <p v-else class="flex justify-between gap-2">
              <span>
                - {{ extra.title }} <small>({{ numberOfDays }} days)</small>
              </span>
              <span>$ {{ (extra.price * numberOfDays).toFixed(2) }}</span>
            </p>
          </li>
        </ul>
        <div class="w-full h-0.5 bg-lightGray mt-2"></div>
        <h4 class="flex justify-between mt-4 gap-8">
          Reservation Cost <span>$ {{ calculateVehiclePrice(vehicle.price) }}</span>
        </h4>
        <div class="w-full h-0.5 bg-vibrantOrange-default mt-2"></div>
        <!-- Total -->
        <p class="flex justify-between text-xl font-bold mt-4">
          Total <span class="text-xl font-bold">$ {{ calculateTotalPrice }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import VehicleDetails from '@/components/shared/VehicleDetails.vue'
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

const numberOfDays = computed(() => store.getters['bookings/numberOfDays'])
const childSeatCount = computed(() => store.getters['bookings/childSeatCount'])
const formData = computed(() => store.getters['bookings/billingFormData'])

// const selectedExtras = computed(() => {
//   return [...store.state.bookings.selectedExtras, ...store.state.bookings.fuelExtraCharge]
// })
const selectedExtras = computed(() => {
  const fuelCharge = store.state.bookings.fuelExtraCharge
    ? [store.state.bookings.fuelExtraCharge]
    : []
  return [...store.state.bookings.selectedExtras, ...fuelCharge]
})
const calculateTotalPrice = computed(() => store.getters['bookings/calculateTotalPrice'])

// Calcuates price of vehicle with the selected days number user has selected
const calculateVehiclePrice = (price) => {
  const numberOfDays = store.getters['bookings/numberOfDays']
  const sum = price * numberOfDays
  return sum.toFixed(2)
}

const sendReceiptMail = () => {
  store.dispatch('bookings/sendReceipt')
}

onMounted(() => {
  fetchSelectedVehicle()
  sendReceiptMail()
})
</script>

<style>
.fade-in-enter-from,
.fade-in-leave-to {
  transform: scale(0.3);
}

.fade-in-enter-active {
  transition: all 0.6s ease-out;
}

.fade-in-enter-to,
.fade-in-leave-from {
  transform: scale(1);
}

.fade-in-leave-active {
  transition: all 0.5s ease-in;
}
</style>
