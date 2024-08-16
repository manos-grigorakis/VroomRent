<template>
  <FormWrapper>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-semibold">Forgot Password</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <form @submit.prevent="forgotPassword" class="space-y-6">
        <BaseInput
          labelValue="Please enter your email to change your password"
          inputType="email"
          inputId="email"
          v-model.trim="email"
          :errorInput="invalidEmailInput"
        />
        <span v-if="errorMessage" class="text-red-default text-sm">{{ errorMessage }}</span>
        <AccentButton widthClass="w-full" :disabled="isLoading">Request Email</AccentButton>
      </form>
    </div>
  </FormWrapper>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

import FormWrapper from '@/components/ui/FormWrapper.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const toast = useToast()
const router = useRouter()

const email = ref('')
const invalidEmailInput = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formValidation = () => {
  invalidEmailInput.value = false
  errorMessage.value = ''

  if (!email.value) {
    errorMessage.value = 'Email is required'
    invalidEmailInput.value = true
    return false
  } else if (!emailPattern.test(email.value)) {
    errorMessage.value = 'Invalid email format'
    invalidEmailInput.value = true
    return false
  }
  return true
}

const forgotPassword = async () => {
  if (!formValidation()) {
    return
  }

  isLoading.value = true
  try {
    await axios.post('http://localhost:3000/auth/request-reset-password', {
      email: email.value
    })
    toast('Password reset email sent', { type: 'success' })
    router.push('/login')
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return toast("User with this email address doesn't exist", { type: 'error' })
    }
    console.error('Error sending password reset email: ', error)
    toast('Error sending password reset email', { type: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>
