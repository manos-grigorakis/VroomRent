<template>
  <section class="flex flex-col gap-10">
    <div
      v-for="extra in bookingExtras"
      :key="extra._id"
      class="relative flex flex-col gap-4 px-6 py-8 bg-white border-2 border-lightGray rounded-lg drop-shadow-sm"
    >
      <transition name="selected-card-bg">
        <div v-if="isExtraSelected(extra)" class="absolute inset-0 bg-lightGray opacity-70"></div>
      </transition>
      <div class="flex justify-between gap-2 md:gap-20">
        <div class="flex sm:items-center gap-1">
          <img :src="getImageUrl(extra.icon)" :alt="extra.icon" class="w-5 h-5" />
          <h4 class="text-lg font-Montserrat font-bold">{{ extra.title }}</h4>
        </div>
        <span v-if="extra.title === 'Prepaid Fuel'" class="text-md font-Montserrat font-semibold">
          $ {{ extra.price.toFixed(2) }} /once
        </span>
        <span v-else class="text-md font-Montserrat font-semibold">
          $ {{ extra.price.toFixed(2) }} /day
        </span>
      </div>
      <p class="max-w-md">{{ extra.description }}</p>
      <div v-if="extra.title === 'Child Safety Seats'" class="flex flex-col gap-2">
        <p>Number of Seats:</p>
        <div class="flex gap-2">
          <input
            type="radio"
            name="child-seat-capacity"
            :value="1"
            id="child-seat-1"
            @change="selectChildSeatCount(1)"
          />
          <label for="child-seat-1" class="mr-2">1</label>
          <input
            type="radio"
            :value="2"
            name="child-seat-capacity"
            id="child-seat-2"
            @change="selectChildSeatCount(2)"
          />
          <label for="child-seat-2" class="mr-2">2</label>
          <input
            type="radio"
            :value="3"
            name="child-seat-capacity"
            id="child-seat-3"
            @change="selectChildSeatCount(3)"
          />
          <label for="child-seat-3">3</label>
        </div>
        <p v-if="showChildSeatWarning" class="text-red">Please select the number of child seats.</p>
      </div>
      <div class="relative z-10">
        <button
          v-if="isExtraSelected(extra)"
          @click="handleRemove(extra)"
          class="py-2 px-8 font-semibold bg-red-default hover:bg-red-700 text-white rounded-md transition duration-200 drop-shadow-md hover:drop-shadow-lg hover:cursor-pointer"
        >
          Remove
        </button>
        <BaseButton v-else @click="handleSelect(extra)"> Select </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BaseButton from '../ui/BaseButton.vue'

const store = useStore()

const fetchBookingExtras = async () => {
  try {
    await store.dispatch('bookings/fetchBookingExtras')
  } catch (error) {
    console.error(error)
  }
}

const bookingExtras = computed(() => store.getters['bookings/bookingExtras'])
const selectedExtras = computed(() => store.getters['bookings/selectedExtras'])
const fuelExtraCharge = computed(() => store.getters['bookings/fuelExtraCharge'])
const childSeatCount = ref(0)
const showChildSeatWarning = ref(false)

const getImageUrl = (imageName) => {
  return new URL(`../../assets/icons/extras/${imageName}`, import.meta.url).href
}

const isExtraSelected = (extra) => {
  if (extra.title === 'Prepaid Fuel') {
    return fuelExtraCharge.value && fuelExtraCharge.value._id === extra._id
  }
  return selectedExtras.value.some((e) => e._id === extra._id)
}

const handleSelect = (extra) => {
  if (extra.title === 'Child Safety Seats') {
    if (childSeatCount.value === 0) {
      showChildSeatWarning.value = true
    } else {
      store.commit('bookings/setChildSeatCount', childSeatCount.value)
      store.commit('bookings/setChildSeatExtra', extra)
      store.commit('bookings/toggleExtra', extra)
    }
  } else if (extra.title === 'Prepaid Fuel') {
    store.commit('bookings/setFuelExtraCharge', extra)
  } else {
    store.commit('bookings/toggleExtra', extra)
  }
}

const handleRemove = (extra) => {
  if (extra.title === 'Child Safety Seats') {
    store.commit('bookings/setChildSeatCount', 0)
    store.commit('bookings/setChildSeatExtra', null)
  } else if (extra.title === 'Prepaid Fuel') {
    store.commit('bookings/setFuelExtraCharge', null)
  }
  store.commit('bookings/toggleExtra', extra)
}

const selectChildSeatCount = (count) => {
  childSeatCount.value = count
  showChildSeatWarning.value = false
}

onMounted(() => fetchBookingExtras())
</script>

<style scoped>
.selected-card-bg-enter-from,
.selected-card-bg-leave-to {
  opacity: 0.2;
  width: 0;
}

.selected-card-bg-enter-active {
  transition: all 0.5s ease-out;
}

.selected-card-bg-enter-to,
.selected-card-bg-leave-from {
  opacity: 1;

  width: 100%;
}

.selected-card-bg-leave-active {
  transition: all 0.3s ease-in;
}
</style>
