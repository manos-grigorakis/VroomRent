<template>
  <BaseWrapper>
    <div class="flex flex-col justify-center gap-20 md:flex-row">
      <!-- Card -->
      <div
        v-for="vehicle in vehicles"
        :key="vehicle._id"
        class="bg-white max-w-sm drop-shadow-md rounded-md pt-14 pb-8"
      >
        <!-- Card Image -->
        <img :src="getImageUrl(vehicle.image)" alt="" class="w-[380px] h-[180px] mb-10" />
        <!-- Card Body -->
        <div class="flex flex-col gap-4 px-12">
          <!-- Cart Title -->
          <div class="">
            <h2 class="text-lg font-medium">{{ vehicle.name }} or similar</h2>
            <small class="text-sm font-light">{{ vehicle.category.join(' | ') }}</small>
          </div>
          <!-- Card Content -->
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <box-icon name="user"></box-icon>
                <span>{{ vehicle.details.passengers }} Passengers</span>
              </div>
              <div class="flex items-center gap-2">
                <box-icon name="briefcase-alt"></box-icon>
                <span>x {{ vehicle.details.storage.bigCase }}</span>
                <box-icon name="briefcase"></box-icon>
                <span>x {{ vehicle.details.storage.smallCase }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <box-icon name="car"></box-icon>
                <span>{{ vehicle.details.transmission }}</span>
              </div>
              <div class="flex items-center gap-2">
                <box-icon name="gas-pump"></box-icon>
                <span>{{ vehicle.details.fuel }}</span>
              </div>
            </div>
          </div>
          <!-- Card Button -->
          <div class="justify-center flex mt-4">
            <form @submit.prevent="chooseVehicle(vehicle._id)">
              <BaseButton>Choose Now</BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </BaseWrapper>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import BaseWrapper from '@/components/ui/BaseWrapper.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useStore()
const router = useRouter()

const fetchVehicle = () => {
  store.dispatch('vehicles/fetchVehicles')
}

const vehicles = computed(() => store.getters['vehicles/allVehicles'])

const getImageUrl = (imageName) => {
  return new URL(`../../assets/images/vehicles/${imageName}`, import.meta.url).href
}

const chooseVehicle = (id) => {
  store.commit('bookings/setVehicleId', id)
  console.log(store.getters['bookings/vehicleId'])
  router.push('/choose-extras')
}

onMounted(() => {
  fetchVehicle()
})
</script>
