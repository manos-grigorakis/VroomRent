<template>
  <form @submit.prevent="handleForm">
    <BaseModal
      :show="open"
      :title="modalTitle"
      :message="paymentError"
      singleButton
      @close="open = false"
    />
    <!-- Custom modal, informing users that payments are in test mode -->
    <BaseModal
      :show="openCustomModal"
      :title="modalTitle"
      singleButton
      customContent
      isInformationIcon
      @close="openCustomModal = false"
    >
      <p>
        This website is currently operating in <strong>test mode</strong>. Any payment information
        entered here will not be processed for real transactions, and no actual charges will occur.
      </p>
      <p>Please do not use your real card number information in the form below.</p>
      <p>Instead, use the test card details provided by Stripe:</p>
      <div class="my-1">
        <p class="mb-1"><em>For example:</em></p>
        <ul class="text-sm">
          <li>Card Number: <strong>4242 4242 4242 4242</strong></li>
          <li>Expiry Date: <strong>Any future date</strong></li>
          <li>CVC: <strong>Any 3 digits</strong></li>
        </ul>
      </div>
      <span class="pt-8"
        >For more test cards, visit
        <a
          href="https://docs.stripe.com/testing"
          target="_blank"
          class="text-vibrantOrange-default hover:underline hover:text-vibrantOrange-700"
          >Stripe Test Cards</a
        >.
      </span></BaseModal
    >
    <BaseSpinner v-if="isLoading" />
    <PersonalDetailForm
      @handleCheckbox="handleCheckbox"
      :errorMsg="errorMessage"
      :invalidInput="invalidInput"
    />
    <StripeForm @stripeLoaded="onStripeLoaded" />
    <div class="mb-4">
      <input type="checkbox" id="terms-checkbox" v-model="isTermsAccepted" />
      <label for="terms-checkbox">
        I have read and agree to
        <a
          href="/terms-of-service"
          target="_blank"
          class="text-vibrantOrange-default hover:underline hover:text-vibrantOrange-700"
          >Terms of Service</a
        >
        and
        <a
          href="/privacy-policy"
          target="_blank"
          class="text-vibrantOrange-default hover:underline hover:text-vibrantOrange-700"
          >Privacy Policy</a
        >
      </label>
    </div>
    <BaseButton id="submit" type="submit" :disabled="isLoading" widthClass="w-full"
      >Complete Reservation</BaseButton
    >
  </form>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

import PersonalDetailForm from '@/components/booking/PersonalDetailForm.vue'
import StripeForm from '@/components/booking/StripeForm.vue'

const store = useStore()
const router = useRouter()

const isLoading = ref(true)
const isCheckbox = ref(false)
const errorMessage = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  address: '',
  country: '',
  city: '',
  postalCode: ''
})
const invalidInput = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
  phoneNumber: false,
  address: false,
  country: false,
  city: false,
  postalCode: false
})
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const open = ref(false)
const modalTitle = ref('')
const isTermsAccepted = ref(false)
const paymentError = ref('')
const user = sessionStorage.getItem('user')
const openCustomModal = ref(false)

let elements = null
let stripe = null

const billingFormData = computed(() => store.getters['bookings/billingFormData'])
const pickupLocation = computed(() => store.getters['bookings/pickupLocation'])
const dropoffLocation = computed(() => store.getters['bookings/dropoffLocation'])
const pickupDate = computed(() => store.getters['bookings/pickupDate'])
const dropoffDate = computed(() => store.getters['bookings/dropoffDate'])
const vehicleId = computed(() => store.getters['bookings/vehicleId'])
const totalPrice = computed(() => store.getters['bookings/calculateTotalPrice'])
const selectedExtras = computed(() => store.getters['bookings/selectedExtras'])
const fuelExtraCharge = computed(() => store.getters['bookings/fuelExtraCharge'])
const childSeatCount = computed(() => store.getters['bookings/childSeatCount'])

const onStripeLoaded = ({ stripe: loadedStripe, elements: loadedElements }) => {
  stripe = loadedStripe
  elements = loadedElements
  isLoading.value = false
}

const handleCheckbox = (value) => {
  isCheckbox.value = value
}

// Validation for personal details form
const formValidation = () => {
  let isValid = true
  // Looping through object and initiallizing its values
  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = ''
  })

  Object.keys(invalidInput).forEach((key) => {
    invalidInput[key] = false
  })

  if (!billingFormData.value.firstName) {
    errorMessage.firstName = 'First name is required'
    invalidInput.firstName = true
    isValid = false
  }
  if (!billingFormData.value.lastName) {
    errorMessage.lastName = 'Last name is required'
    invalidInput.lastName = true
    isValid = false
  }
  if (!billingFormData.value.email) {
    errorMessage.email = 'Email is required'
    invalidInput.email = true
    isValid = false
  } else if (!emailPattern.test(billingFormData.value.email)) {
    errorMessage.email = 'Invalid email format'
    invalidInput.email = true
    return false
  }
  if (!billingFormData.value.phoneNumber) {
    errorMessage.phoneNumber = 'Phone number is required'
    invalidInput.phoneNumber = true
    isValid = false
  }
  if (!billingFormData.value.address) {
    errorMessage.address = 'Streer address is required'
    invalidInput.address = true
    isValid = false
  }
  if (!billingFormData.value.country) {
    errorMessage.country = 'Country is required'
    invalidInput.country = true
    isValid = false
  }
  if (!billingFormData.value.city) {
    errorMessage.city = 'City is required'
    invalidInput.city = true
    isValid = false
  }
  if (!billingFormData.value.postalCode) {
    errorMessage.postalCode = 'Postal code is required'
    invalidInput.postalCode = true
    isValid = false
  }

  // Password validation only if checkbox is checked
  if (isCheckbox.value) {
    console.log('Checkbox is checked. Validating passwords...')
    if (!billingFormData.value.password) {
      errorMessage.password = 'Password is required'
      invalidInput.password = true
      isValid = false
    }
    if (!billingFormData.value.confirmPassword) {
      errorMessage.confirmPassword = 'Password confirmation is required'
      invalidInput.confirmPassword = true
      isValid = false
    }
    if (
      billingFormData.value.password &&
      billingFormData.value.confirmPassword &&
      billingFormData.value.password !== billingFormData.value.confirmPassword
    ) {
      errorMessage.password = 'Passwords are not the same'
      errorMessage.confirmPassword = 'Passwords are not the same'
      invalidInput.password = true
      invalidInput.confirmPassword = true
      isValid = false
    }
  }

  return isValid
}

const handleForm = async () => {
  const formData = billingFormData.value
  open.value = false
  modalTitle.value = 'Payment Failed'
  paymentError.value = ''

  if (!formValidation()) {
    return
  }

  if (!stripe || !elements) {
    isLoading.value = true
    return
  }

  if (!isTermsAccepted.value) {
    open.value = true
    modalTitle.value = 'Agreement Required'
    paymentError.value =
      'In order to proceed with the payment, you must agree to the Terms of Service and Privacy Policy.'
    return
  }

  isLoading.value = false

  try {
    // if user hasn't select a different dropofflocation set it to null
    if (!dropoffLocation.value) {
      dropoffLocation.value = null
    }

    isLoading.value = true

    // if user is logged in retrieve his id,
    // otherwise it will be changed if user creates an account in the code below
    let foundedUserId = user

    // If user wants to create an account, register him and retrieve its id
    if (isCheckbox.value) {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }

      try {
        store.commit('setUserData', userData)
        foundedUserId = await store.dispatch('registerUser', { password: formData.password })
      } catch (error) {
        // If email already exists in the database show error in user
        if (error.message === 'Email already exists') {
          errorMessage.email = error.message
          invalidInput.email = true
        }
        console.error('Error registering user: ', error)
        isLoading.value = false
        return
      }
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
        return_url: 'http://localhost:5173/booking/receipt'
      },
      redirect: 'if_required'
    })

    // If there is an error with the payment
    if (error) {
      console.error('Error confirming payment:', error)
      open.value = true
      paymentError.value = error.message
      isLoading.value = false
      return
    }

    console.log('Payment confirmed!')

    // Data that will be added in the database
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
        pickupLocation: pickupLocation.value,
        dropoffLocation: dropoffLocation.value,
        pickupDate: pickupDate.value,
        dropoffDate: dropoffDate.value
      },
      stripeTranscactionId: paymentIntent.id,
      userId: foundedUserId,
      vehicleId: vehicleId.value,
      bookingExtras: {
        selectedExtrasId: selectedExtras.value.map((extra) => extra._id),
        // error
        fuelExtra: fuelExtraCharge.value > 0,
        childSeatCount: childSeatCount.value
      }
    }

    // Adds data to database
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-booking`,
        bookingData
      )
      console.log('Booking response:', response.data)

      // Redirect manually after successful booking creation
      router.push('/booking/receipt')
    } catch (postError) {
      console.error('Error posting booking data to database', postError)
      open.value = true
      paymentError.value = 'There was an error creating your booking. Please try again.'

      // If data cant be written in the database cancel the payment too
      try {
        await stripe.paymentIntents.cancel(paymentIntent.id)
        console.log('Payment canceled due to booking creation failure')
      } catch (cancelError) {
        console.error('Error canceling payment:', cancelError)
      }
    }

    isLoading.value = false
  } catch (error) {
    console.error('Error creating payment:', error)
    open.value = true
    paymentError.value = 'There was an error processing your payment. Please try again.'
    isLoading.value = false
  }
}

const warningDialog = () => {
  openCustomModal.value = true
  modalTitle.value = 'Important Notice'
}

onMounted(() => warningDialog())
</script>
