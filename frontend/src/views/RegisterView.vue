<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9  text-gray-900">
        Create a new Account
      </h2>
    </div>
 
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleForm" class="space-y-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <div class="mt-2">
            <input
              id="firstName"
              v-model.trim="userData.firstName"
              type="text"
              autocomplete="current-firstName"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900"
            >Last Name</label
          >
          <div class="mt-2">
            <input
              id="lastName"
              v-model.trim="userData.lastName"
              type="text"
              autocomplete="current-lastName"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              
              v-model.trim="userData.email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>

        <div>
          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                v-model.trim="userData.password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-[#ccc] placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-vibrantOrange-default hover:bg-vibrantOrange-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Alread have an account?
        <RouterLink class="font-medium leading-6 hover:underline" to="/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const userData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const handleForm = () => {
  console.log('Form submitted with data:', userData)
  store.commit('setUserData', userData)
  store.dispatch('registerUser')
}
</script>
