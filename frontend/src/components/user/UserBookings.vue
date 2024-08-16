<template>
  <section>
    <BaseSpinner v-if="isLoading" />
    <h2 class="text-2xl font-semibold font-Montserrat mb-6 tracking-wide">Bookings</h2>

    <div class="flex flex-col gap-4" v-if="bookings.length > 0">
      <div
        v-for="booking in bookings"
        :key="booking._id"
        class="relative w-full bg-[#FAFAFA] rounded-md p-4 drop-shadow-md shadow-md"
      >
        <p class="text-sm">
          {{ booking.bookDetails.pickupDate }} - {{ booking.bookDetails.dropoffDate }}
        </p>
        <!-- If there is a dropoff location -->
        <div v-if="booking.bookDetails.dropoffLocation" class="font-medium font-Montserrat">
          {{ booking.bookDetails.pickupLocation }}
          -
          {{ booking.bookDetails.dropoffLocation }}
        </div>
        <p v-else class="font-medium font-Montserrat">
          {{ booking.bookDetails.pickupLocation }}
        </p>
        <p>{{ booking.vehicleId.name }} or similar</p>
        <p>$ {{ booking.total.toFixed(2) }}</p>

        <RouterLink
          :to="{ name: 'booking', params: { id: booking._id } }"
          class="absolute right-4 top-2 hover:underline hover:cursor-pointer"
          >View Details</RouterLink
        >
      </div>
    </div>
    <div v-else>
      <h3>You don't have any bookings yet.</h3>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import BaseSpinner from '../ui/BaseSpinner.vue'

const store = useStore()

const isLoading = ref(false)

const fetchBookings = async () => {
  try {
    isLoading.value = true
    await store.dispatch('users/fetchUserBookings')
    isLoading.value = false
  } catch (err) {
    isLoading.value = true
    console.error(err)
  }
}

const bookings = computed(() => store.getters['users/userData'])

onMounted(() => {
  fetchBookings()
})
</script>
