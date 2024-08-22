<template>
  <div class="relative p-2 z-50">
    <header class="inset-x-0">
      <nav ref="desktopNav" class="flex items-center justify-between xl:justify-evenly gap-10 px-2">
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
          <img :src="avatar" class="rounded-full w-9 h-9" alt="user-avatar" />
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
            <div v-if="isNavbarOpen" class="mt-6 flow-root">
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
                <div v-else>
                  <hr />
                  <div class="flex items-center justify-center gap-4 my-8">
                    <img :src="avatar" class="rounded-full w-9 h-9" alt="user-avatar" />
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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const store = useStore()
const router = useRouter()

const isNavbarOpen = ref(false)
const isDropDownOpen = ref(false)
const desktopNav = ref(null)

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

const avatar = computed(() => {
  if (user.value && user.value.avatar) {
    return `${import.meta.env.VITE_API_URL}/uploads/${user.value.avatar}`
  } else {
    return `${import.meta.env.VITE_API_URL}/uploads/default-avatar.png`
  }
})

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  store.dispatch('fetchUser')
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)

  gsap.fromTo(
    desktopNav.value,
    { y: '-100%' },
    {
      y: 0,
      duration: 1,
      ease: 'back.out',
      scrollTrigger: {
        trigger: desktopNav.value,
        toggleActions: 'play none none none',
        once: true
      }
    }
  )
  ScrollTrigger.refresh()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Navbar transition */
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

/* Dropdown animation when user is logged in */
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
