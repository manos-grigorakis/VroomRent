<template>
  <p class="text-center my-4">
    Total Price:
    <span class="font-Montserrat font-bold text-lg"> $ {{ displayPrice }} </span>
  </p>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { defineProps } from 'vue'

const props = defineProps({
  price: {
    type: Number,
    required: true
  },
  calculate: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const numberOfDays = ref(store.getters['bookings/numberOfDays'])

const displayPrice = computed(() => {
  if (props.calculate) {
    const sum = props.price * numberOfDays.value
    return sum.toFixed(2)
  }
  return props.price.toFixed(2)
})
</script>
