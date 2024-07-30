<template>
  <section class="flex flex-col gap-20 mb-20 tracking-wide px-4 md:px-8">
    <BaseSpinner v-if="isLoading" />
    <h2 class="block lg:hidden text-3xl font-Montserrat font-semibold text-center">
      Choose Your Extras
    </h2>
    <div
      class="flex flex-col gap-8 items-center lg:items-start justify-center md:gap-20 lg:flex-row"
    >
      <div class="flex gap-10">
        <MyVehicle />
        <div class="hidden w-0.5 h-screen bg-lightGray rounded-lg lg:block"></div>
      </div>
      <!-- Extras -->
      <div class="flex flex-col gap-8">
        <h2 class="hidden lg:block text-3xl font-Montserrat font-semibold">Choose Your Extras</h2>
        <ExtrasList />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

import MyVehicle from './MyVehicle.vue'
import ExtrasList from '@/components/booking/ExtrasList.vue'

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

onMounted(() => fetchSelectedVehicle())
</script>
