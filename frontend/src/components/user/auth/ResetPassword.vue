<template>
  <BaseSpinner v-if="isLoadingToken" />
  <div
    v-else-if="isTokenValid"
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-16 lg:px-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-semibold">Change Password</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />
      <span class="text-red-default flex justify-center mb-4">{{ errorMessage }}</span>
      <form @submit.prevent="changePassword" class="space-y-6">
        <BaseInput
          labelValue="Current Password"
          inputType="password"
          inputId="oldPassword"
          v-model.trim="oldPassword"
        />
        <BaseInput
          labelValue="New Password"
          inputType="password"
          inputId="newPassword"
          v-model.trim="newPassword"
        />
        <AccentButton widthClass="w-full" :disabled="isLoading">Change Password</AccentButton>
      </form>
    </div>
  </div>
  <div
    v-else
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-16 lg:px-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto text-center"
  >
    <h2 class="text-2xl font-semibold text-red-default">Token has expired!</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

import BaseInput from '@/components/ui/BaseInput.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const oldPassword = ref('')
const newPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const isTokenValid = ref(false)
const isLoadingToken = ref(true)

const validation = () => {
  errorMessage.value = ''

  if (!oldPassword.value) {
    errorMessage.value = 'Old password is being required'
    return false
  }
  if (!newPassword.value) {
    errorMessage.value = 'New password is being required'
    return false
  }
  if (oldPassword.value === newPassword.value) {
    errorMessage.value = 'You cant set the new password to the previous password'
    return false
  }
  return true
}

const changePassword = async () => {
  if (!validation()) {
    return
  }

  const token = route.query.token
  errorMessage.value = ''
  isLoading.value = true

  try {
    await axios.post('http://localhost:3000/auth/reset-password', {
      token: token,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })

    toast('Password changed successfully', { type: 'success' })
    router.push('/login')
  } catch (error) {
    if (error.response) {
      console.log('Error response from server: ', error.response.data)
      errorMessage.value = error.response.data.message || 'Error resetting password'
    } else {
      console.error('Unexpected error occured', error)
      errorMessage.value = 'Unexpected error occured'
    }
  } finally {
    isLoading.value = false
  }
}

const checkTokenValidity = async () => {
  const token = route.query.token

  try {
    const response = await axios.post('http://localhost:3000/auth/check-token', { token: token })
    if (response.data.valid) {
      isTokenValid.value = true
    } else {
      isTokenValid.value = false
    }
  } catch (error) {
    console.error('Error checking token validity: ', error)
    isTokenValid.value = false
  } finally {
    isLoadingToken.value = false
  }
}

onMounted(() => checkTokenValidity())
</script>
