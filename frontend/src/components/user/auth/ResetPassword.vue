<template>
  <BaseSpinner v-if="isLoadingToken" />
  <FormWrapper v-else-if="isTokenValid">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-2xl font-semibold text-center">Change Password</h2>
    </div>
    <span
      v-if="message"
      class="py-2 mt-8 font-medium text-center text-white bg-transparent rounded sm:mx-auto sm:w-full sm:max-w-sm drop-shadow-sm bg-red-default"
      >{{ message }}</span
    >
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />

      <form @submit.prevent="changePassword" class="space-y-6">
        <div class="">
          <BaseInput
            labelValue="New Password"
            inputType="password"
            inputId="newPassword"
            v-model.trim="newPassword"
            :errorInput="invalidInput.newPassword"
          /><span v-if="errorMessage.newPassword" class="text-sm text-red-default">{{
            errorMessage.newPassword
          }}</span>
        </div>
        <AccentButton widthClass="w-full" :disabled="isLoading">Change Password</AccentButton>
      </form>
    </div>
  </FormWrapper>
  <div
    v-else
    class="flex flex-col justify-center flex-1 max-w-sm min-h-full px-6 py-12 mx-auto mt-16 text-center bg-white rounded-lg lg:px-8 drop-shadow-md md:max-w-lg"
  >
    <h2 class="text-2xl font-semibold text-red-default">Token has expired!</h2>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

import FormWrapper from '@/components/ui/FormWrapper.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const oldPassword = ref('')
const newPassword = ref('')

const isLoading = ref(false)
const isTokenValid = ref(false)
const isLoadingToken = ref(true)
const message = ref('')
const errorMessage = reactive({
  oldPassword: '',
  newPassword: ''
})
const invalidInput = reactive({
  oldPassword: false,
  newPassword: false
})

const validation = () => {
  let isValid = true
  message.value = ''

  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = ''
  })

  Object.keys(invalidInput).forEach((key) => {
    invalidInput[key] = false
  })

  if (!newPassword.value) {
    errorMessage.newPassword = 'New password is being required'
    invalidInput.newPassword = true
    isValid = false
  }
  return isValid
}

const changePassword = async () => {
  if (!validation()) {
    return
  }

  const token = route.query.token
  // errorMessage.value = ''
  isLoading.value = true

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
      token: token,
      newPassword: newPassword.value
    })

    toast('Password changed successfully', { type: 'success' })
    router.push('/login')
  } catch (error) {
    if (error.response) {
      console.log('Error response from server: ', error.response.data)
      message.value = error.response.data.message || 'Error resetting password'
    } else {
      console.error('Unexpected error occured', error)
      message.value = 'Unexpected error occured'
    }
  } finally {
    isLoading.value = false
  }
}

const checkTokenValidity = async () => {
  const token = route.query.token

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/check-token`, {
      token: token
    })
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
