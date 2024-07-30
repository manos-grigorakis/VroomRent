<template>
  <form @submit.prevent="chooseVehicle(vehicle._id)" class="flex justify-center">
    <BaseButton>Choose Now</BaseButton>
  </form>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

defineProps({
  vehicle: {
    type: Object,
    required: true
  }
})

const store = useStore()
const router = useRouter()

const chooseVehicle = (id) => {
  store.commit('bookings/setVehicleId', id)
  router.push('/booking/choose-extras')
}
</script>
