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
        isSuccess ? 'bg-green' : 'bg-red'
      ]"
      >{{ errorMessage }}</span
    >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <form @submit.prevent="handleForm" class="space-y-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900"
              >First Name</label
            >
            <div class="mt-2">
              <input
                id="firstName"
                v-model.trim="userData.firstName"
                type="text"
                autocomplete="current-firstName"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
                :class="{
                  'border-2 border-red': errorFnameInput,
                  'border-2 border-green': fNameValidated
                }"
              />
            </div>
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900"
              >Last Name</label
            >
            <div class="mt-2">
              <input
                id="lastName"
                v-model.trim="userData.lastName"
                type="text"
                autocomplete="current-lastName"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
                :class="{
                  'border-2 border-red': errorLnameInput,
                  'border-2 border-green': lNameValidated
                }"
              />
            </div>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model.trim="userData.email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
              :class="{
                'border-2 border-red': errorEmailInput,
                'border-2 border-green': emailValidated
              }"
            />
          </div>
        </div>

        <div>
          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                v-model.trim="userData.password"
                type="password"
                autocomplete="current-password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
                :class="{
                  'border-2 border-red': errorPasswordInput,
                  'border-2 border-green': passwordValidated
                }"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-vibrantOrange-default hover:bg-vibrantOrange-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            :disabled="isLoading"
          >
            Register
          </button>
        </div>
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

import BaseSpinner from '@/components/ui/BaseSpinner.vue'

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
    await store.dispatch('registerUser')

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
