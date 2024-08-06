<template>
  <section>
    <h2 class="text-xl font-Montserrat font-semibold mb-2">Extras</h2>
    <transition-group name="selected-extra" tag="ul" class="flex flex-col gap-2">
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
        <p v-else class="flex justify-between">
          <span>
            - {{ extra.title }} <small>({{ numberOfDays }} days)</small>
          </span>
          <span>$ {{ (extra.price * numberOfDays).toFixed(2) }}</span>
        </p>
      </li>
    </transition-group>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const numberOfDays = computed(() => store.getters['bookings/numberOfDays'])
const childSeatCount = computed(() => store.getters['bookings/childSeatCount'])
const selectedExtras = computed(() => {
  const fuelCharge = store.state.bookings.fuelExtraCharge
    ? [store.state.bookings.fuelExtraCharge]
    : []
  return [...store.state.bookings.selectedExtras, ...fuelCharge]
})
</script>

<style scoped>
.selected-extra-enter-from,
.selected-extra-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.selected-extra-enter-active {
  transition: all 0.4s ease-out;
}
.selected-extra-enter-to,
.selected-extra-leave-from {
  opacity: 1;
  transform: scale(1);
}

.selected-extra-leave-active {
  transition: all 0.3s ease-in;
}
</style>
