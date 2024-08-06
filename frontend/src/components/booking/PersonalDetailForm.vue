<template>
  <section class="pb-12">
    <h2 class="text-base font-semibold leading-7">Personal Information</h2>

    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <BaseInput
          labelValue="First Name"
          inputType="text"
          inputId="first-name"
          v-model.trim="firstName"
          :errorInput="invalidInput.firstName"
        />
        <span v-if="errorMsg.firstName" class="text-red-default text-sm">{{
          errorMsg.firstName
        }}</span>
      </div>

      <div class="sm:col-span-3">
        <BaseInput
          labelValue="Last Name"
          inputType="text"
          inputId="last-name"
          v-model.trim="lastName"
          :errorInput="invalidInput.lastName"
        />
        <span v-if="errorMsg.lastName" class="text-red-default text-sm">{{
          errorMsg.lastName
        }}</span>
      </div>

      <div class="col-span-full">
        <BaseInput
          labelValue="Email Address"
          inputType="email"
          inputId="email"
          v-model.trim="email"
          :errorInput="invalidInput.email"
        />
        <span v-if="errorMsg.email" class="text-red-default text-sm">{{ errorMsg.email }}</span>
      </div>

      <transition name="password-reveal">
        <div v-if="isCheckbox" class="sm:col-span-3">
          <BaseInput
            labelValue="Password"
            inputType="password"
            inputId="password"
            v-model.trim="password"
            :errorInput="invalidInput.password"
          />
          <span v-if="errorMsg.password" class="text-red-default text-sm">
            {{ errorMsg.password }}</span
          >
        </div>
      </transition>

      <transition name="confirm-password-reveal">
        <div v-if="isCheckbox" class="sm:col-span-3">
          <BaseInput
            labelValue="Confirm Password"
            inputType="password"
            inputId="confirm-password"
            v-model.trim="confirmPassword"
            :errorInput="invalidInput.confirmPassword"
          />
          <span v-if="errorMsg.confirmPassword" class="text-red-default text-sm">
            {{ errorMsg.confirmPassword }}</span
          >
        </div>
      </transition>

      <div class="sm:col-span-3">
        <BaseInput
          labelValue="Phone Number"
          inputType="text"
          inputId="phone-number"
          v-model.trim="phoneNumber"
          :errorInput="invalidInput.phoneNumber"
        />
        <span v-if="errorMsg.phoneNumber" class="text-red-default text-sm">{{
          errorMsg.phoneNumber
        }}</span>
      </div>

      <!-- Checkbox -->
      <!-- If there is a session with a user it wont be shown -->
      <div v-if="!user" class="col-span-full">
        <input type="checkbox" id="create-account" class="mr-2" @click="handleCheckBox" />
        <label for="create-account" class="text-sm leading-6"
          >Create an account for faster bookings in the future.</label
        >
      </div>

      <div class="col-span-full">
        <BaseInput
          labelValue="Street Address"
          inputType="text"
          inputId="street-address"
          v-model.trim="address"
          :errorInput="invalidInput.address"
        />
        <span v-if="errorMsg.address" class="text-red-default text-sm">{{ errorMsg.address }}</span>
      </div>

      <div class="sm:col-span-2 sm:col-start-1">
        <BaseInput
          labelValue="Country"
          inputType="text"
          inputId="country"
          v-model.trim="country"
          :errorInput="invalidInput.country"
        />
        <span v-if="errorMsg.country" class="text-red-default text-sm">{{ errorMsg.country }}</span>
      </div>

      <div class="sm:col-span-2">
        <BaseInput
          labelValue="City"
          inputType="text"
          inputId="city"
          v-model.trim="city"
          :errorInput="invalidInput.city"
        />
        <span v-if="errorMsg.city" class="text-red-default text-sm">{{ errorMsg.city }}</span>
      </div>

      <div class="sm:col-span-2">
        <BaseInput
          labelValue="ZIP / Postal Code"
          inputType="text"
          inputId="postal-code"
          v-model.trim="postalCode"
          :errorInput="invalidInput.postalCode"
        />
        <span v-if="errorMsg.postalCode" class="text-red-default text-sm">{{
          errorMsg.postalCode
        }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import BaseInput from '@/components/ui/BaseInput.vue'

const store = useStore()

const emit = defineEmits(['handleCheckbox', 'validationResult'])

defineProps({
  errorMsg: Object,
  invalidInput: Object
})

const isCheckbox = ref(false)
const user = sessionStorage.getItem('user')

const createComputedProperty = (field) => {
  return computed({
    get() {
      return store.state.bookings.billingFormData[field]
    },
    set(value) {
      store.dispatch('bookings/updateField', { field, value })
    }
  })
}

const firstName = createComputedProperty('firstName')
const lastName = createComputedProperty('lastName')
const email = createComputedProperty('email')
const password = createComputedProperty('password')
const confirmPassword = createComputedProperty('confirmPassword')
const phoneNumber = createComputedProperty('phoneNumber')
const address = createComputedProperty('address')
const country = createComputedProperty('country')
const city = createComputedProperty('city')
const postalCode = createComputedProperty('postalCode')

const handleCheckBox = () => {
  isCheckbox.value = !isCheckbox.value
  emit('handleCheckbox', isCheckbox.value)
}
</script>

<style scoped>
.password-reveal-enter-from,
.password-reveal-leave-to,
.confirm-password-reveal-enter-from,
.confirm-password-reveal-leave-to {
  opacity: 0.2;
  transform: scale(0.4);
}
.password-reveal-enter-active,
.confirm-password-reveal-enter-active {
  transition: all 0.3s ease-out;
}
.password-reveal-enter-to,
.password-reveal-leave-from,
.confirm-password-reveal-enter-to,
.confirm-password-reveal-leave-from {
  opacity: 1;
  transform: scale(1);
}

.password-reveal-leave-active,
.confirm-password-reveal-leave-active {
  transition: all 0.3s ease-in;
}
</style>
