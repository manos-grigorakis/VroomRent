<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-16 lg:px-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-semibold">Login to your account</h2>
    </div>
    <span
      v-if="errorMessage"
      :class="[
        'text-center mt-8 rounded bg-transparent text-white font-medium py-2 sm:mx-auto sm:w-full sm:max-w-sm drop-shadow-sm',
        isSuccess ? 'bg-green' : 'bg-red-default'
      ]"
      >{{ errorMessage }}</span
    >
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <form @submit.prevent="handleForm" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6"> Email address </label>
          <div class="mt-2">
            <input
              id="email"
              v-model.trim="userData.email"
              type="email"
              autocomplete="email"
              class="block w-full rounded border-1 py-1.5 shadow-sm ring-1 ring-[#ccc] sm:text-sm sm:leading-6 pl-2"
              :class="{
                'border-2 border-red-default': errorEmailInput,
                'border-2 border-green': emailValidated
              }"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6"> Password </label>
            <div class="text-sm">
              <a href="#" class="font-light hover:underline">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model.trim="userData.password"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded border-0 py-1.5 shadow-sm ring-1 ring-[#ccc] sm:text-sm sm:leading-6 pl-2"
              :class="{
                'border-2 border-red-default': errorPasswordInput,
                'border-2 border-green': passwordValidated
              }"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded bg-vibrantOrange-default hover:bg-vibrantOrange-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Login
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm">
        Don't have an account?
        <RouterLink class="font-medium leading-6 hover:underline" to="/register">
          Register
        </RouterLink>
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
  email: '',
  password: ''
})

const errorMessage = ref('')
const errorEmailInput = ref(false)
const errorPasswordInput = ref(false)
const emailValidated = ref(false)
const passwordValidated = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  errorMessage.value = ''
  errorEmailInput.value = false
  errorPasswordInput.value = false

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
  if (!userData.email && !userData.password) {
    errorMessage.value = 'Both fields required'
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
    store.commit('setUserDataLogin', userData)
    await store.dispatch('loginUser', userData)

    errorMessage.value = 'Login successful!'
    isSuccess.value = true
    emailValidated.value = true
    passwordValidated.value = true

    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    isSuccess.value = false
    emailValidated.value = false
    passwordValidated.value = false

    if (error.response && error.response.data && error.response.data.message) {
      const message = error.response.data.message

      if (message === 'User not found') {
        errorMessage.value = message
        errorEmailInput.value = true
      } else if (message === 'Wrong Password') {
        errorMessage.value = message
        errorPasswordInput.value = true
      } else {
        errorMessage.value = 'Login failed, please check your credentials.'
        errorEmailInput.value = true
        errorPasswordInput.value = true
      }
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again later.'
    }
  } finally {
    isLoading.value = false
  }
}

// const isLoggedIn = computed(() => store.getters.isLoggedIn)
</script>
