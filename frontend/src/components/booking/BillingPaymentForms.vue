<template>
  <form @submit.prevent="handleForm">
    <PersonalDetailForm />
    <StripeForm @stripeLoaded="onStripeLoaded" />
    <button
      id="submit"
      type="submit"
      :disabled="isLoading"
      class="flex justify-center rounded w-full bg-customBlue-default hover:cursor-pointer hover:bg-customBlue-700 px-3 py-3 mt-6 font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Complete Reservation
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

import PersonalDetailForm from '@/components/booking/PersonalDetailForm.vue'
import StripeForm from '@/components/booking/StripeForm.vue'

const store = useStore()
const router = useRouter()
const isLoading = ref(false)

const billingFormData = computed(() => store.getters['bookings/billingFormData'])

// Getters from Vuex store
const pickupLocation = computed(() => store.getters['bookings/pickupLocation'])
// const dropoffLocation = computed(() => store.getters['dropoffLocation'])
const pickupDate = computed(() => store.getters['bookings/pickupDate'])
const dropoffDate = computed(() => store.getters['bookings/dropoffDate'])
const vehicleId = computed(() => store.getters['bookings/vehicleId'])
const totalPrice = computed(() => store.getters['bookings/calculateTotalPrice'])

let elements = null
let stripe = null

const onStripeLoaded = ({ stripe: loadedStripe, elements: loadedElements }) => {
  stripe = loadedStripe
  elements = loadedElements
}

const handleForm = async () => {
  const formData = billingFormData.value

  if (!stripe || !elements) {
    isLoading.value = true
    return
  }

  isLoading.value = false
  try {
    // Create booking data
    const bookingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      total: totalPrice.value,
      billingDetails: {
        address: formData.address,
        country: formData.country,
        city: formData.city,
        zipCode: formData.postalCode
      },
      bookDetails: {
        pickupLocation: `${pickupLocation.value.iso_country}, ${pickupLocation.value.name}, ${pickupLocation.value.municipality}`,
        pickupDate: pickupDate.value,
        dropoffDate: dropoffDate.value
      },
      stripeTranscactionId: 'temp-id',
      vehicleId: vehicleId.value
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phoneNumber,
            address: {
              line1: formData.address,
              country: formData.country,
              city: formData.city,
              postal_code: formData.postalCode
            }
          }
        },
        return_url: 'http://localhost:5173/home'
      },
      redirect: 'if_required'
    })

    if (error) {
      console.error('Error confirming payment:', error)
    } else {
      console.log('Payment confirmed!')

      // Update booking data with real transaction ID
      bookingData.stripeTranscactionId = paymentIntent.id

      try {
        const response = await axios.post('http://localhost:3000/api/create-booking', bookingData)
        console.log('Booking response:', response.data)

        // Redirect manually after successful booking creation
        router.push('/home')
      } catch (postError) {
        console.error('Error posting booking data to database', postError)
      }
    }
    isLoading.value = false
  } catch (error) {
    console.error('Error crating payment:', error)
    isLoading.value = true
  }
}
</script>
