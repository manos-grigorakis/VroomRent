<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 text-gray-900">Create a new Account</h2>
    </div>
    <span
      v-if="errorMessage"
      :class="[
        'text-center mt-8 rounded bg-transparent text-white font-medium py-2 sm:mx-auto sm:w-full sm:max-w-sm drop-shadow-sm',
        isSuccess ? 'bg-green' : 'bg-red-default'
      ]"
      >{{ errorMessage }}</span
    >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <form @submit.prevent="handleForm" class="space-y-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <BaseInput
            labelValue="First Name"
            inputType="text"
            inputId="firstName"
            v-model.trim="userData.firstName"
            :errorInput="errorFnameInput"
            :inputValidated="fNameValidated"
          />
          <BaseInput
            labelValue="Last Name"
            inputType="text"
            inputId="lastName"
            v-model.trim="userData.lastName"
            :errorInput="errorLnameInput"
            :inputValidated="lNameValidated"
          />
        </div>

        <BaseInput
          labelValue="Email Address"
          inputType="email"
          inputId="email"
          v-model.trim="userData.email"
          :errorInput="errorEmailInput"
          :inputValidated="emailValidated"
        />

        <BaseInput
          labelValue="Password"
          inputType="password"
          inputId="password"
          v-model.trim="userData.password"
          :errorInput="errorPasswordInput"
          :inputValidated="passwordValidated"
        />

        <AccentButton widthClass="w-full" :disabled="isLoading">Register</AccentButton>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink class="font-medium leading-6 hover:underline" to="/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/ui/BaseInput.vue'

const store = useStore()
const router = useRouter()

const userData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const errorMessage = ref('')
const errorFnameInput = ref(false)
const errorLnameInput = ref(false)
const errorEmailInput = ref(false)
const errorPasswordInput = ref(false)
const fNameValidated = ref(false)
const lNameValidated = ref(false)
const emailValidated = ref(false)
const passwordValidated = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  errorMessage.value = ''
  errorFnameInput.value = false
  errorLnameInput.value = false
  errorEmailInput.value = false
  errorPasswordInput.value = false

  if (!userData.firstName) {
    errorMessage.value = 'First name is required'
    errorFnameInput.value = true
    isValid = false
  }
  if (!userData.lastName) {
    errorMessage.value = 'Last name is required'
    errorLnameInput.value = true
    isValid = false
  }
  if (!userData.email) {
    errorMessage.value = 'Email is required'
    errorEmailInput.value = true
    isValid = false
  }
  if (!userData.password) {
    errorMessage.value = 'Password is required'
    errorPasswordInput.value = true
    isValid = false
  }
  if (!userData.firstName && !userData.lastName && !userData.email && !userData.password) {
    errorMessage.value = 'All fields are required'
    errorFnameInput.value = true
    errorLnameInput.value = true
    errorEmailInput.value = true
    errorPasswordInput.value = true
    isValid = false
  }
  return isValid
}

const handleForm = async () => {
  if (!validateForm()) {
    return
  }
  isLoading.value = true
  try {
    store.commit('setUserData', userData)
    await store.dispatch('registerUser', { password: userData.password }) // // passing password with payload, so we dont have to save it in our state

    errorMessage.value = 'Registration successfull!'
    isSuccess.value = true
    fNameValidated.value = true
    lNameValidated.value = true
    emailValidated.value = true
    passwordValidated.value = true

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    isSuccess.value = false
    if (error.response && error.response.status === 409) {
      errorMessage.value = 'User with this email already exists'
      errorEmailInput.value = true
    } else {
      errorMessage.value = 'Error during registration'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
