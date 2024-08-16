<template>
  <FormWrapper>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 text-gray-900">Create a new Account</h2>
    </div>
    <span
      v-if="message"
      :class="[
        'text-center mt-8 rounded bg-transparent text-white font-medium py-2 sm:mx-auto sm:w-full sm:max-w-sm drop-shadow-sm',
        isSuccess ? 'bg-green' : 'bg-red-default'
      ]"
      >{{ message }}</span
    >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <form @submit.prevent="handleForm" class="space-y-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div class="">
            <BaseInput
              labelValue="First Name"
              inputType="text"
              inputId="firstName"
              v-model.trim="userData.firstName"
              :errorInput="invalidInput.firstName"
              :inputValidated="validInput.firstName"
            />
            <span v-if="errorMessage.firstName" class="text-red-default text-sm">{{
              errorMessage.firstName
            }}</span>
          </div>
          <div class="">
            <BaseInput
              labelValue="Last Name"
              inputType="text"
              inputId="lastName"
              v-model.trim="userData.lastName"
              :errorInput="invalidInput.lastName"
              :inputValidated="validInput.lastName"
            />
            <span v-if="errorMessage.lastName" class="text-red-default text-sm">{{
              errorMessage.lastName
            }}</span>
          </div>
        </div>

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

        <BaseInput
          labelValue="Password"
          inputType="password"
          inputId="password"
          v-model.trim="userData.password"
          :errorInput="invalidInput.password"
          :inputValidated="validInput.password"
        />
        <span v-if="errorMessage.password" class="text-red-default text-sm">{{
          errorMessage.password
        }}</span>

        <AccentButton widthClass="w-full" :disabled="isLoading">Register</AccentButton>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink class="font-medium leading-6 hover:underline" to="/login">Login</RouterLink>
      </p>
    </div>
  </FormWrapper>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import FormWrapper from '@/components/ui/FormWrapper.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const store = useStore()
const router = useRouter()

const userData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const errorMessage = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const invalidInput = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false
})
const validInput = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false
})
const isSuccess = ref(false)
const isLoading = ref(false)
const message = ref('')

const validateForm = () => {
  let isValid = true

  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = ''
  })

  Object.keys(invalidInput).forEach((key) => {
    invalidInput[key] = false
  })

  if (!userData.firstName) {
    errorMessage.firstName = 'First name is required'
    invalidInput.firstName = true
    isValid = false
  }
  if (!userData.lastName) {
    errorMessage.lastName = 'Last name is required'
    invalidInput.lastName = true
    isValid = false
  }
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
  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = ''
  })

  try {
    store.commit('setUserData', userData)

    // passing password with payload, so we dont have to save it in our state
    await store.dispatch('registerUser', { password: userData.password })

    message.value = 'Registration successfull!'
    isSuccess.value = true

    Object.keys(validInput).forEach((key) => {
      validInput[key] = true
    })

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    isSuccess.value = false

    if (error.message === 'User with this email already exists') {
      invalidInput.email = true
    }
    message.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>
