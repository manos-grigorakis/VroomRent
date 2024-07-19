<template>
  <div class="relative p-2 z-50">
    <header class="inset-x-0">
      <nav class="flex items-center justify-between xl:justify-evenly gap-10 px-2">
        <!-- Company Logo -->
        <div>
          <RouterLink to="/"
            ><img
              src="@/assets/images/logo.svg"
              class="w-[250px] sm:w-[300px] h-[55px]"
              alt="company-logo"
          /></RouterLink>
        </div>
        <!-- Open mobile navbar -->
        <button
          type="button"
          class="-m-2.5 xl:hidden inline-flex items-center justify-center rounded-md p-2.5"
          @click="toggleNavbar"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <!-- Nav links -->
        <div class="hidden xl:flex xl:gap-x-20">
          <ul class="flex gap-10 text-xl font-Montserrat">
            <li class="inline-block cursor-pointer hover:text-vibrantOrange-default">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="inline-block cursor-pointer hover:text-vibrantOrange-default">
              <RouterLink to="/fleet">Our Fleet</RouterLink>
            </li>
            <li class="inline-block cursor-pointer hover:text-vibrantOrange-default">
              <RouterLink to="/contact">Contact</RouterLink>
            </li>
            <li class="inline-block cursor-pointer hover:text-vibrantOrange-default">
              <RouterLink to="/about-us">About Us</RouterLink>
            </li>
          </ul>
        </div>
        <div class="hidden xl:flex xl:gap-x-4">
          <BaseButton link="/login">Login</BaseButton>
          <BaseButton outline link="/register">Register</BaseButton>
        </div>
      </nav>

      <!-- Mobile menu, show/hide based on menu open state. -->
      <div :class="{ hidden: !isNavbarOpen, block: isNavbarOpen }">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="absolute inset-0 z-50"></div>

        <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-linen px-6 py-6">
          <!-- Mobile company logo -->
          <div class="flex items-center justify-between">
            <RouterLink to="/"
              ><img src="@/assets/images/logo.svg" class="w-[200px] h-[40px]" alt="company-logo"
            /></RouterLink>
            <!-- Mobile close button navbar -->
            <button @click="closeNavbar" type="button" class="-m-2.5 rounded-md p-2.5">
              <span class="sr-only">Close menu</span>
              <svg
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Mobile links -->
          <Transition name="mobileNav">
            <div v-show="isNavbarOpen" class="mt-6 flow-root">
              <div class="-my-6">
                <div class="py-6">
                  <ul
                    class="flex flex-col gap-2 font-Montserrat text-xl text-center sm:items-center"
                  >
                    <li class="px-6 py-2 cursor-pointer rounded-lg hover:bg-lightGray">
                      <RouterLink to="/" @click="closeNavbar">Home</RouterLink>
                    </li>
                    <li class="px-6 py-2 cursor-pointer rounded-lg hover:bg-lightGray">
                      <RouterLink to="/fleet" @click="closeNavbar">Our Fleet</RouterLink>
                    </li>
                    <li class="px-6 py-2 cursor-pointer rounded-lg hover:bg-lightGray">
                      <RouterLink to="/contact" @click="closeNavbar">Contact</RouterLink>
                    </li>
                    <li class="px-6 py-2 cursor-pointer rounded-lg hover:bg-lightGray">
                      <RouterLink to="/about-us" @click="closeNavbar">About Us</RouterLink>
                    </li>
                  </ul>
                </div>
                <div class="flex flex-col w-40 gap-8 justify-center items-center mx-auto">
                  <BaseButton @click="closeNavbar" link="/login">Login</BaseButton>
                  <BaseButton @click="closeNavbar" outline link="/register">Register</BaseButton>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const isNavbarOpen = ref(false)

const closeNavbar = () => {
  isNavbarOpen.value = false
}

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value
}

const handleResize = () => {
  if (window.innerWidth >= 1280) {
    isNavbarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.mobileNav-enter-from,
.mobileNav-leave-to {
  transform: translateY(-80px);
  opacity: 0;
}
.mobileNav-enter-active {
  transition: all 0.4s ease-out;
}
.mobileNav-enter-to,
.mobileNav-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.mobileNav-leave-active {
  transition: all 0.4s ease-in;
}
</style>
