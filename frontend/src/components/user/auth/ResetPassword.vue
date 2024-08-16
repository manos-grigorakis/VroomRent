<template>
  <BaseSpinner v-if="isLoadingToken" />
  <FormWrapper v-else-if="isTokenValid">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-semibold">Change Password</h2>
    </div>
    <span
      v-if="message"
      class="text-center mt-8 rounded bg-transparent text-white font-medium py-2 sm:mx-auto sm:w-full sm:max-w-sm drop-shadow-sm bg-red-default"
      >{{ message }}</span
    >
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <BaseSpinner v-if="isLoading" />

      <form @submit.prevent="changePassword" class="space-y-6">
        <div class="">
          <BaseInput
            labelValue="Current Password"
            inputType="password"
            inputId="oldPassword"
            v-model.trim="oldPassword"
            :errorInput="invalidInput.oldPassword"
          /><span v-if="errorMessage.oldPassword" class="text-red-default text-sm">{{
            errorMessage.oldPassword
          }}</span>
        </div>
        <div class="">
          <BaseInput
            labelValue="New Password"
            inputType="password"
            inputId="newPassword"
            v-model.trim="newPassword"
            :errorInput="invalidInput.newPassword"
          /><span v-if="errorMessage.newPassword" class="text-red-default text-sm">{{
            errorMessage.newPassword
          }}</span>
        </div>
        <AccentButton widthClass="w-full" :disabled="isLoading">Change Password</AccentButton>
      </form>
    </div>
  </FormWrapper>
  <div
    v-else
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-16 lg:px-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto text-center"
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

  if (!oldPassword.value) {
    errorMessage.oldPassword = 'Old password is being required'
    invalidInput.oldPassword = true
    isValid = false
  }
  if (!newPassword.value) {
    errorMessage.newPassword = 'New password is being required'
    invalidInput.newPassword = true
    isValid = false
  }
  if (oldPassword.value && newPassword.value && oldPassword.value === newPassword.value) {
    message.value = 'You cant set the new password to the previous password'
    invalidInput.oldPassword = true
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
