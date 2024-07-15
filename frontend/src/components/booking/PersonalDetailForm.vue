<template>
  <div class="pb-12">
    <h2 class="text-base font-semibold leading-7">Personal Information</h2>

    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label for="first-name" class="block text-sm font-medium leading-6">First name</label>
        <div class="mt-2">
          <input
            type="text"
            name="first-name"
            id="first-name"
            autocomplete="given-name"
            v-model.trim="firstName"
            class="block w-full rounded-md border-0 border-lightGray py-1.5 px-2 ring-1 ring-inset ring-lightGray shadow-sm sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-3">
        <label for="last-name" class="block text-sm font-medium leading-6">Last name</label>
        <div class="mt-2">
          <input
            type="text"
            name="last-name"
            id="last-name"
            v-model.trim="lastName"
            class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="col-span-full">
        <label for="email" class="block text-sm font-medium leading-6">Email address</label>
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            v-model="email"
            class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <transition name="password-reveal">
        <div v-if="isCheckbox" class="sm:col-span-3">
          <label for="password" class="block text-sm font-medium leading-6">Password</label>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              class="block w-full rounded-md border-0 border-lightGray py-1.5 px-2 ring-1 ring-inset ring-lightGray shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </transition>

      <transition name="confirm-password-reveal">
        <div v-if="isCheckbox" class="sm:col-span-3">
          <label for="confirm-password" class="block text-sm font-medium leading-6"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              v-model="confirmPassword"
              class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </transition>

      <div class="sm:col-span-3">
        <label for="phone-number" class="block text-sm font-medium leading-6">Phone Number</label>
        <div class="mt-2">
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            autocomplete="tel"
            v-model="phoneNumber"
            class="block w-full rounded-md border-0 border-lightGray py-1.5 px-2 ring-1 ring-inset ring-lightGray shadow-sm sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <!-- Checkbox -->
      <div class="col-span-full">
        <input type="checkbox" id="create-account" class="mr-2" @click="handleCheckBox" />
        <label for="create-account" class="text-sm leading-6"
          >Create an account for faster bookings in the future.</label
        >
      </div>

      <div class="col-span-full">
        <label for="street-address" class="block text-sm font-medium leading-6"
          >Street address</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="street-address"
            id="street-address"
            autocomplete="street-address"
            v-model="address"
            class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-2 sm:col-start-1">
        <label for="country" class="block text-sm font-medium leading-6">Country</label>
        <div class="mt-2">
          <input
            type="text"
            name="country"
            id="country"
            autocomplete="country-name"
            v-model.trim="country"
            class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="city" class="block text-sm font-medium leading-6">City</label>
        <div class="mt-2">
          <input
            type="text"
            name="city"
            id="city"
            autocomplete="address-level1"
            v-model.trim="city"
            class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="postal-code" class="block text-sm font-medium leading-6"
          >ZIP / Postal code</label
        >
        <div class="mt-2">
          <input
            type="text"
            name="postal-code"
            id="postal-code"
            autocomplete="postal-code"
            v-model="postalCode"
            class="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-lightGray sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

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

const isCheckbox = ref(false)

const handleCheckBox = () => {
  isCheckbox.value = !isCheckbox.value
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
