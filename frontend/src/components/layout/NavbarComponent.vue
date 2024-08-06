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

        <div v-if="!user" class="hidden xl:flex xl:gap-x-4">
          <BaseButton link="/login">Login</BaseButton>
          <BaseButton outline link="/register">Register</BaseButton>
        </div>
        <div v-else class="hidden xl:flex xl:gap-x-4 xl:items-center">
          <img
            src="data:image/png;base64,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"
            class="rounded-full w-9 h-9"
            alt="user-avatar"
          />
          <div class="flex flex-col relative">
            <p class="flex hover:cursor-pointer" @click="toggleDropDown">
              {{ user.firstName }}
              <span class="flex items-center"> <box-icon name="chevron-down"></box-icon></span>
            </p>
            <!-- Dropdown menu -->
            <transition name="dropdown">
              <div
                id="dropdown"
                class="z-10 bg-white rounded-lg shadow w-44 mt-8 absolute"
                v-if="isDropDownOpen"
                @click.stop
              >
                <ul class="text-sm" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <RouterLink
                      :to="{ name: 'profile' }"
                      class="block px-4 py-2 rounded hover:bg-lightGray"
                      @click="toggleDropDown"
                      >My Account</RouterLink
                    >
                  </li>

                  <li>
                    <RouterLink
                      to="/"
                      @click="handleLogout"
                      class="block px-4 py-2 rounded hover:bg-lightGray"
                      >Logout</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </transition>
          </div>
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
          <transition name="mobileNav">
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
                <div v-if="!user" class="flex w-40 gap-8 justify-center items-center mx-auto">
                  <BaseButton @click="closeNavbar" link="/login">Login</BaseButton>
                  <BaseButton @click="closeNavbar" outline link="/register">Register</BaseButton>
                </div>
                <div v-else class="">
                  <hr />
                  <div class="flex items-center justify-center gap-4 my-8">
                    <img
                      src="data:image/png;base64,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"
                      class="rounded-full w-9 h-9"
                      alt="user-avatar"
                    />
                    <p class="font-Montserrat text-xl">{{ user.firstName }}</p>
                  </div>

                  <ul
                    class="flex flex-col gap-2 font-Montserrat text-xl text-center sm:items-center"
                  >
                    <li @click="closeNavbar">
                      <RouterLink
                        :to="{ name: 'profile' }"
                        class="block px-6 py-2 cursor-pointer rounded-lg hover:bg-lightGray"
                        >My Account</RouterLink
                      >
                    </li>

                    <li @click="closeNavbar">
                      <RouterLink
                        to="/"
                        @click="handleLogout"
                        class="block px-4 py-2 rounded hover:bg-lightGray"
                        >Logout</RouterLink
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isNavbarOpen = ref(false)
const isDropDownOpen = ref(false)

// close navbar
const closeNavbar = () => {
  isNavbarOpen.value = false
}

// toggles navbar
const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value
}

// Make sures navbar will be closed in a certain window size and above
const handleResize = () => {
  if (window.innerWidth >= 1280) {
    isNavbarOpen.value = false
  }
}

// Toggles dropdown menu when user is registered
const toggleDropDown = () => {
  isDropDownOpen.value = !isDropDownOpen.value
}

// closes dropdown when user click somewhere else
const handleClickOutside = (event) => {
  if (!event.target.closest('#dropdown') && !event.target.closest('p')) {
    isDropDownOpen.value = false
  }
}

// Closes dropdown on scroll
const handleScroll = () => {
  isDropDownOpen.value = false
}

// Removes user session
const handleLogout = () => {
  sessionStorage.removeItem('user')

  setTimeout(() => {
    router.go()
  }, 100)
}

const user = computed(() => store.getters.user)

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  store.dispatch('fetchUser')
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
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

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-active {
  transition: all 0.5s ease-out;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-active {
  transition: all 0.5s ease-in;
}
</style>
