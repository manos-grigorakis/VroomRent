<template>
  <section class="mb-4">
    <h2 class="text-base font-semibold leading-7 mb-10">Payment Information</h2>

    <div id="payment-element" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-payment-intent`,
        {
          amount: amount
        }
      )
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
</script>
