<template>
  <div class="mb-3">
    <h2 class="text-base font-semibold leading-7 mb-10">Payment Information</h2>
    <div id="payment-element" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from 'vuex'
import axios from 'axios'

const emit = defineEmits(['stripeLoaded'])

const store = useStore()

const totalPrice = computed(() => store.getters['bookings/calculateTotalPrice']) // Gets total Price
const amount = totalPrice.value * 100 // totalPrice in cents

const elements = ref(null)
const stripe = ref(null)
const clientSecret = ref(null)
const paymentIntentId = ref(null)

// Customizing stripe form
const appearance = {
  variables: { colorPrimary: '#000', fontWeightNormal: '500', borderRadius: '6px' }
}

onMounted(async () => {
  try {
    if (!stripe.value) {
      stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

      const { data } = await axios.post('http://localhost:3000/api/create-payment-intent', {
        amount: amount
      })
      clientSecret.value = data.clientSecret
      paymentIntentId.value = data.paymentIntentId

      elements.value = stripe.value.elements({ clientSecret: clientSecret.value, appearance })

      const paymentElement = elements.value.create('payment')
      paymentElement.mount('#payment-element')
      emit('stripeLoaded', { stripe: stripe.value, elements: elements.value })
    }
  } catch (error) {
    console.error(error)
  }
})

// Fix the cancel, because it tries to cancel every payment even if its successfully
onBeforeUnmount(async () => {
  if (paymentIntentId.value) {
    // Έλεγχος αν η πληρωμή ολοκληρώθηκε
    try {
      await axios.post('http://localhost:3000/api/cancel-payment-intent', {
        paymentIntentId: paymentIntentId.value
      })
    } catch (error) {
      console.error('Error cancelling payment intent:', error)
    }
  }
})
</script>
