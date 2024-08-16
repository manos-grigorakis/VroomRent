<template>
  <section>
    <BaseSpinner v-if="isLoading" />
    <h2 class="text-xl font-semibold font-Montserrat mb-6 tracking-wide">
      Booking Number: {{ id }}
    </h2>
    <div v-if="!isLoading && Object.keys(bookingDetails).length > 0">
      <div class="bg-[#FAFAFA] rounded-lg shadow-md drop-shadow-sm p-4">
        <h3 class="mb-4 font-medium font-Montserrat text-lg">Booking Overview</h3>

        <div v-if="bookingDetails.bookDetails.dropoffLocation" class="grid grid-cols-2">
          <div class="flex flex-col">
            <p class="font-Montserrat text-[#999] text-sm">Pick Up Location</p>
            <p class="text-lg">
              {{ bookingDetails.bookDetails.pickupLocation }}
            </p>
          </div>
          <div class="flex flex-col">
            <p class="font-Montserrat text-[#999] text-sm">Drop Off Location</p>
            <p class="text-lg">{{ bookingDetails.bookDetails.dropoffLocation }}</p>
          </div>
        </div>
        <div v-else>
          <div class="flex flex-col">
            <p class="font-Montserrat text-[#999] text-sm">Pick Up - Drop Off Location</p>
            <p class="text-lg">
              {{ bookingDetails.bookDetails.pickupLocation }}
            </p>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2">
          <div class="flex flex-col gap-1">
            <p class="font-Montserrat text-[#999] text-sm">Pick Up Date</p>
            <p class="text-lg">{{ bookingDetails.bookDetails.pickupDate }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-Montserrat text-[#999] text-sm">Drop Off Date</p>
            <p class="text-lg">{{ bookingDetails.bookDetails.dropoffDate }}</p>
          </div>
        </div>

        <p class="font-Montserrat text-[#999] text-sm mt-4">Vehicle</p>
        <p class="text-lg">
          {{ bookingDetails.vehicleId.name }} or similar - $ {{ bookingDetails.vehicleId.price }} /
          day
        </p>
        <p class="font-Montserrat text-[#999] text-sm mt-4">Extras</p>
        <div v-if="bookingDetails.bookingExtras.selectedExtrasId.length === 0">
          <p class="mt-1">No extras</p>
        </div>
        <div v-else>
          <ul class="list-disc px-8 mt-1">
            <li v-if="bookingDetails.bookingExtras.fuelExtra">Prepaid Fuel: 70 /once</li>
            <li v-for="item in bookingDetails.bookingExtras.selectedExtrasId" :key="item._id">
              <p v-if="item.title === 'Child Safety Seats'">
                {{ item.title }}
                <small>({{ bookingDetails.bookingExtras.childSeatCount }} seats)</small>:
                {{ item.price }} /day
              </p>
              <p v-else>{{ item.title }}: {{ item.price }} /day</p>
            </li>
          </ul>
          <p class="font-Montserrat font-medium mt-4">Total: $ {{ bookingDetails.total }}</p>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="bg-[#FAFAFA] rounded-lg shadow-md drop-shadow-sm p-4 my-4">
        <h3 class="mb-4 font-medium font-Montserrat text-lg">Personal Information</h3>
        <div class="grid lg:grid-cols-2">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">First Name</p>
              <p class="text-lg">{{ bookingDetails.firstName }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">Email</p>
              <p class="text-lg">{{ bookingDetails.email }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">Last Name</p>
              <p class="text-lg">{{ bookingDetails.lastName }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">Phone</p>
              <p class="text-lg">+ {{ bookingDetails.phoneNumber }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Billings Information -->
      <div class="bg-[#FAFAFA] rounded-lg shadow-md drop-shadow-sm px-4 py-4">
        <h3 class="mb-4 font-medium font-Montserrat text-lg">Billings Information</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">Addresss</p>
              <p class="text-lg">{{ bookingDetails.billingDetails.address }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">Country</p>
              <p class="text-lg">{{ bookingDetails.billingDetails.country }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">City</p>
              <p class="text-lg">{{ bookingDetails.billingDetails.city }}</p>
            </div>
            <div class="flex flex-col gap-1">
              <p class="font-Montserrat text-[#999] text-sm">Zip Code</p>
              <p class="text-lg">{{ bookingDetails.billingDetails.zipCode }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!isLoading">
      <p>No booking details found.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import BaseSpinner from '../ui/BaseSpinner.vue'

const route = useRoute()

const id = route.params.id
const bookingDetails = ref({})
const isLoading = ref(false)

const fetchBookingDetails = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/bookings/booking/${id}`)
    bookingDetails.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBookingDetails()
  console.log(fetchBookingDetails)
})
</script>
