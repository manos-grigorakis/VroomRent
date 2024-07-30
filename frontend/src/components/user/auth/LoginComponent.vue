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
          forgotPassword
        />
        <AccentButton widthClass="w-full" :disabled="isLoading">Login</AccentButton>
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

import BaseInput from '@/components/ui/BaseInput.vue'

const store = useStore()

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
    await store.dispatch('loginUser', userData)

    errorMessage.value = 'Login successful!'
    isSuccess.value = true
    emailValidated.value = true
    passwordValidated.value = true

    setTimeout(() => {
      window.location.href = '/home'
    }, 200)
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
