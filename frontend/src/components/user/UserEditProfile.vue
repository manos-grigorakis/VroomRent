<template>
  <section>
    <BaseSpinner v-if="isLoading" />
    <h2 class="text-2xl font-semibold font-Montserrat mb-6 tracking-wide">Edit Profile</h2>

    <div class="bg-[#FAFAFA] p-4 rounded-md drop-shadow-md shadow-md">
      <h3 class="font-medium font-Montserrat mb-4 tracking-wide">Personal Information</h3>
      <div class="grid gap-4 md:grid-cols-2 md:gap-10">
        <div>
          <div class="flex flex-col gap-1 mb-4">
            <label for="firstName" class="font-Montserrat text-[#999] text-sm">First Name</label>
            <input
              type="text"
              id="firstName"
              :value="user.firstName"
              class="rounded-md px-2 py-1 drop-shadow-sm shadow-sm"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email" class="font-Montserrat text-[#999] text-sm">Email</label>
            <input
              type="text"
              id="email"
              :value="user.email"
              class="rounded-md px-2 py-1 drop-shadow-sm shadow-sm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="lastName" class="font-Montserrat text-[#999] text-sm">Last Name</label>
          <input
            type="text"
            id="lastName"
            :value="user.lastName"
            class="rounded-md px-2 py-1 drop-shadow-sm shadow-sm"
          />
        </div>
        <AccentButton widthClass="max-w-[50%]">Save Changes</AccentButton>
      </div>
    </div>

    <!-- Request password change -->
    <div class="bg-[#FAFAFA] p-4 rounded-md drop-shadow-md shadow-md mt-6">
      <h3 class="font-medium font-Montserrat mb-4 tracking-wide">Change Password</h3>
      <button @click="requestResetPassword" class="underline hover:text-vibrantOrange-700">
        Request password reset
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const store = useStore()
const toast = useToast()

const user = computed(() => store.getters.user)

const isLoading = ref(false)

const requestResetPassword = async () => {
  isLoading.value = true
  try {
    await axios.post('http://localhost:3000/auth/request-reset-password', {
      email: user.value.email
    })
    toast('Password reset email sent', { type: 'success' })
  } catch (error) {
    console.error('Error sending password reset email: ', error)
    toast('Error sending password reset email', { type: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>
