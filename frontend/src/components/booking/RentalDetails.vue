<template>
  <section class="flex flex-col gap-4">
    <div class="flex justify-between">
      <h2 class="text-xl font-Montserrat font-semibold">Rental Details</h2>
      <router-link v-if="!noLink" class="flex items-center text-xs font-light hover:underline"
        ><box-icon name="edit-alt" class="w-5 h-5"></box-icon>Change Dates</router-link
      >
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <p class="mb-2">Pick Up:</p>
        <p
          class="flex items-center pl-2 py-2 max-w-md bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
        >
          <span class="flex items-center mr-2"
            ><box-icon name="current-location" color="#000" class="w-5 h-5"></box-icon
          ></span>
          {{ pickupLocation }}
        </p>
      </div>
      <div v-if="dropoffLocation">
        <p class="mb-2">Drop Off:</p>
        <p
          class="flex items-center pl-2 py-2 max-w-md bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
        >
          <span class="flex-shrink-0 flex items-center mr-2"
            ><box-icon name="current-location" color="#000" class="w-5 h-5"></box-icon
          ></span>
          {{ dropoffLocation }}
        </p>
      </div>
      <div class="flex justify-between gap-4">
        <div>
          <p class="mb-2">Pick Up:</p>
          <p
            class="flex items-center justify-between gap-2 px-4 py-2 bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
          >
            <span class="flex items-center"
              ><box-icon name="calendar" color="#000" class="w-5 h-5"></box-icon
            ></span>
            {{ pickupDate }}
          </p>
        </div>
        <div>
          <p class="mb-2">Drop Off:</p>
          <p
            class="flex items-center justify-between gap-2 px-4 py-2 bg-white border-2 border-lightGray rounded-md drop-shadow-sm"
          >
            <box-icon name="calendar" color="#000" class="w-5 h-5"></box-icon>
            {{ dropoffDate }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

defineProps({
  noLink: {
    type: Boolean,
    default: false
  }
})

const pickupLocation = computed(() => store.getters['bookings/pickupLocation'])
const dropoffLocation = computed(() => store.getters['bookings/dropoffLocation'])
const pickupDate = computed(() => store.getters['bookings/pickupDate'])
const dropoffDate = computed(() => store.getters['bookings/dropoffDate'])
</script>
