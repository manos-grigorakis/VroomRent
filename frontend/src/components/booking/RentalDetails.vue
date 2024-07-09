<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <h2 class="text-xl font-Montserrat font-semibold">Rental Details</h2>
      <router-link class="flex items-center text-xs font-light hover:underline"
        ><box-icon name="edit-alt" class="w-5 h-5"></box-icon>Change Dates</router-link
      >
    </div>
    <!-- Dates -->
    <div class="flex flex-col gap-4">
      <div class="">
        <p class="mb-2">Pick Up:</p>
        <p
          class="flex items-center justify-between px-4 py-2 bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
        >
          {{ pickupLocation.name
          }}<box-icon name="current-location" color="#000" class="w-5 h-5"></box-icon>
        </p>
      </div>
      <div class="flex justify-between">
        <div>
          <p class="mb-2">Pick Up:</p>
          <p
            class="flex items-center justify-between gap-6 px-4 py-2 bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
          >
            {{ pickupDate }}<box-icon name="calendar" color="#000" class="w-5 h-5"></box-icon>
          </p>
        </div>
        <div>
          <p class="mb-2">Drop Off:</p>
          <p
            class="flex items-center justify-between gap-6 px-4 py-2 bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
          >
            {{ dropoffDate }}<box-icon name="calendar" color="#000" class="w-5 h-5"></box-icon>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const pickupLocation = computed(() => store.getters['bookings/pickupLocation'])
// const dropoffLocation = computed(() => store.getters['bookings/dropoffLocation'])
const pickupDate = computed(() => store.getters['bookings/pickupDate'])
const dropoffDate = computed(() => store.getters['bookings/dropoffDate'])
</script>
