<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-16 lg:px-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-semibold">Login to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleForm" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6"> Email address </label>
          <div class="mt-2">
            <input
              id="email"
              v-model.trim="userData.email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded border-0 py-1.5 shadow-sm ring-1 ring-[#ccc] sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6"> Password </label>
            <div class="text-sm">
              <a href="#" class="font-light hover:underline">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model.trim="userData.password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded border-0 py-1.5 shadow-sm ring-1 ring-[#ccc] sm:text-sm sm:leading-6 pl-2"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded bg-vibrantOrange-default hover:bg-vibrantOrange-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Login
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm">
        Don't have an account?
        <RouterLink class="font-medium leading-6 hover:underline" to="/register">
          Register
        </RouterLink>
      </p>
    </div>
  </div>
 
  
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const store = useStore()
const route = useRouter()

const userData = reactive({
  email: '',
  password: ''
})

const handleForm = async () => {
  try {
    console.log('Form submitted with data:', userData)
    store.commit('setUserDataLogin', userData)
    await store.dispatch('loginUser', userData)
    route.push('/')
  } catch (error) {
    console.error('Error during login:', error)
  }
}

// const isLoggedIn = computed(() => store.getters.isLoggedIn)
</script>
