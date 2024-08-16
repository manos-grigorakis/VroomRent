<template>
  <section>
    <BaseSpinner v-if="isLoading" />
    <h2 class="text-2xl font-semibold font-Montserrat mb-6 tracking-wide">Edit Profile</h2>

    <div class="bg-[#FAFAFA] p-4 rounded-md drop-shadow-md shadow-md">
      <h3 class="font-medium font-Montserrat mb-4 tracking-wide">Personal Information</h3>
      <form @submit.prevent="updateProfile" class="grid gap-4 md:grid-cols-2 md:gap-10 mt-4">
        <div>
          <div class="flex flex-col gap-1 mb-4">
            <BaseInput
              labelValue="First Name"
              inputType="text"
              inputId="firstName"
              v-model="firstName"
              :errorInput="invalidInput.firstName"
            />
            <span v-if="errorMessage.firstName" class="text-red-default text-sm">{{
              errorMessage.firstName
            }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <BaseInput
              labelValue="Email"
              inputType="email"
              inputId="email"
              v-model="email"
              :errorInput="invalidInput.email"
            />
            <span v-if="errorMessage.email" class="text-red-default text-sm">{{
              errorMessage.email
            }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <BaseInput
            labelValue="Last Name"
            inputType="text"
            inputId="lastName"
            v-model="lastName"
            :errorInput="invalidInput.lastName"
          />
          <span v-if="errorMessage.lastName" class="text-red-default text-sm">{{
            errorMessage.lastName
          }}</span>
        </div>

        <AccentButton widthClass="max-w-[50%]" :disabled="!isFormChanged || isLoading"
          >Save Changes</AccentButton
        >
      </form>
    </div>

    <!-- Request password change -->
    <div class="bg-[#FAFAFA] p-4 rounded-md drop-shadow-md shadow-md mt-6">
      <h3 class="font-medium font-Montserrat mb-4 tracking-wide">Change Password</h3>
      <button @click="requestResetPassword" class="underline hover:text-vibrantOrange-700">
        Request password reset
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import axios from 'axios'

import BaseInput from '@/components/ui/BaseInput.vue'

const store = useStore()
const toast = useToast()

const user = computed(() => store.getters.user)
// Values from database so we can check is user has made changes
const retrievedFirstName = ref(user.value.firstName)
const retrievedLastName = ref(user.value.lastName)
const retrievedEmail = ref(user.value.email)

const firstName = ref(user.value.firstName)
const lastName = ref(user.value.lastName)
const email = ref(user.value.email)
const isLoading = ref(false)
const errorMessage = reactive({
  firstName: '',
  lastName: '',
  email: ''
})
const invalidInput = reactive({
  firstName: false,
  lastName: false,
  email: false
})
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formValidation = () => {
  let isValid = true
  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = ''
  })

  Object.keys(invalidInput).forEach((key) => {
    invalidInput[key] = false
  })

  if (!firstName.value) {
    errorMessage.firstName = 'First name is required'
    invalidInput.firstName = true
    isValid = false
  }
  if (!lastName.value) {
    errorMessage.lastName = 'Last name is required'
    invalidInput.lastName = true
    isValid = false
  }
  if (!email.value) {
    errorMessage.email = 'Email is required'
    invalidInput.email = true
    isValid = false
  } else if (!emailPattern.test(email.value)) {
    errorMessage.email = 'Invalid email format'
    invalidInput.email = true
    isValid = false
  }
  return isValid
}

// Checks if user has made any changes on the form
const isFormChanged = computed(() => {
  return (
    firstName.value !== retrievedFirstName.value ||
    lastName.value !== retrievedLastName.value ||
    email.value !== retrievedEmail.value
  )
})

const updateProfile = async () => {
  if (!formValidation()) {
    return
  }

  isLoading.value = true

  try {
    const updatedProfile = {
      _id: user.value._id,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    }

    await store.dispatch('updateProfile', updatedProfile)

    // Updates values with the new one
    retrievedFirstName.value = firstName.value
    retrievedLastName.value = lastName.value
    retrievedEmail.value = email.value

    toast('Changes updated successfully', { type: 'success' })
  } catch (error) {
    console.error('Error updating profile changes', error)
    toast('Error updating profile changes', { type: 'error' })
  } finally {
    isLoading.value = false
  }
}

const requestResetPassword = async () => {
  isLoading.value = true
  try {
    await axios.post('http://localhost:3000/auth/request-reset-password', {
      email: user.value.email
    })
    toast('Password reset email sent', { type: 'success' })
  } catch (error) {
    console.error('Error sending password reset email: ', error)
    toast('Error sending password reset email', { type: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>
