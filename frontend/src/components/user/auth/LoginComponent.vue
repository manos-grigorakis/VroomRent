<template>
  <FormWrapper>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-semibold">Login to your account</h2>
    </div>
    <span
      v-if="message"
      :class="[
        'text-center mt-8 rounded bg-transparent text-white font-medium py-2 sm:mx-auto sm:w-full sm:max-w-sm drop-shadow-sm',
        isSuccess ? 'bg-green' : 'bg-red-default'
      ]"
      >{{ message }}</span
    >
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <form @submit.prevent="handleForm" class="space-y-6">
        <div class="">
          <BaseInput
            labelValue="Email Address"
            inputType="email"
            inputId="email"
            v-model.trim="userData.email"
            :errorInput="invalidInput.email"
            :inputValidated="validInput.email"
          />
          <span v-if="errorMessage.email" class="text-red-default text-sm">{{
            errorMessage.email
          }}</span>
        </div>
        <div class="">
          <BaseInput
            labelValue="Password"
            inputType="password"
            inputId="password"
            v-model.trim="userData.password"
            :errorInput="invalidInput.password"
            :inputValidated="validInput.password"
            forgotPassword
          />
          <span v-if="errorMessage.password" class="text-red-default text-sm">{{
            errorMessage.password
          }}</span>
        </div>
        <AccentButton widthClass="w-full" :disabled="isLoading">Login</AccentButton>
      </form>
      <p class="mt-10 text-center text-sm">
        Don't have an account?
        <RouterLink class="font-medium leading-6 hover:underline" to="/register">
          Register
        </RouterLink>
      </p>
    </div>
  </FormWrapper>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

import FormWrapper from '@/components/ui/FormWrapper.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const store = useStore()

const userData = reactive({
  email: '',
  password: ''
})
const errorMessage = reactive({
  email: '',
  password: ''
})
const invalidInput = reactive({
  email: false,
  password: false
})
const validInput = reactive({
  email: false,
  password: false
})
const message = ref('')
const isSuccess = ref(false)
const isLoading = ref(false)

const validateForm = () => {
  let isValid = true

  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = ''
  })

  Object.keys(invalidInput).forEach((key) => {
    invalidInput[key] = false
  })

  if (!userData.email) {
    errorMessage.email = 'Email is required'
    invalidInput.email = true
    isValid = false
  }
  if (!userData.password) {
    errorMessage.password = 'Password is required'
    invalidInput.password = true
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

    message.value = 'Login successfully!'
    isSuccess.value = true
    Object.keys(validInput).forEach((key) => {
      validInput[key] = true
    })

    setTimeout(() => {
      window.location.href = '/home'
    }, 200)
  } catch (error) {
    isSuccess.value = false
    // message.value = error.message
    if (error.message === 'User not found') {
      message.value = error.message
      invalidInput.email = true
    } else if (error.message === 'Wrong Password') {
      message.value = error.message
      invalidInput.password = true
    }
    message.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>
