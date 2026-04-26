<template>
  <footer>
    <div class="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
      <hr class="mx-auto my-6 border-lightGray lg:my-8" />

      <div
        class="flex flex-col justify-center gap-8 md:items-center lg:flex-row lg:justify-between lg:gap-20"
      >
        <div class="flex-col mb-6">
          <RouterLink to="/">
            <img
              src="../../assets/images/logo.svg"
              alt="VroomRent Logo"
              loading="lazy"
              class="w-[250px] h-auto mx-auto lg:mx-0"
          /></RouterLink>
          <p
            class="max-w-lg mx-auto mt-4 text-sm leading-relaxed tracking-wider text-center md:max-w-sm md:text-left"
          >
            VroomRent is dedicated to fueling journeys that matter. With a wide selection of
            vehicles and a commitment to exceptional service, we're here to ensure your rental
            experience is smooth, affordable, and tailored to your travel needs.
          </p>
        </div>

        <div>
          <div class="flex flex-wrap justify-center gap-12 text-sm md:pb-4 md:gap-12 md:flex-row">
            <div>
              <h2 class="mb-6 font-medium font-Montserrat">Quick Links</h2>
              <ul class="flex flex-col gap-4">
                <li>
                  <RouterLink to="/" class="hover:underline">Home</RouterLink>
                </li>
                <li>
                  <RouterLink to="/fleet" class="hover:underline">Our Fleet</RouterLink>
                </li>
                <li>
                  <RouterLink to="/contact" class="hover:underline">Contact</RouterLink>
                </li>
                <li>
                  <RouterLink to="/about-us" class="hover:underline">About Us</RouterLink>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 font-medium font-Montserrat">Account</h2>
              <ul v-if="!user" class="flex flex-col gap-4">
                <li>
                  <RouterLink to="/login" class="hover:underline">Log In</RouterLink>
                </li>
                <li>
                  <RouterLink to="/register" class="hover:underline">Register</RouterLink>
                </li>
              </ul>
              <ul v-else class="flex flex-col gap-4">
                <li>
                  <RouterLink to="/user/profile" class="hover:underline">Profile</RouterLink>
                </li>
                <li>
                  <RouterLink to="/user/edit-profile" class="hover:underline"
                    >Edit Profile</RouterLink
                  >
                </li>
                <li>
                  <RouterLink to="/user/bookings" class="hover:underline">My Bookings</RouterLink>
                </li>
                <li>
                  <RouterLink to="/user/settings" class="hover:underline">Settings</RouterLink>
                </li>
              </ul>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="mb-6 font-medium font-Montserrat">Contact Information</h2>
              <ul class="flex flex-col gap-4">
                <li>
                  <a
                    href="mailto:vroomrentcomp@gmail.com"
                    class="flex items-center gap-4 cursor-pointertext-sm hover:underline"
                    >vroomrentcomp@gmail.com</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-6 border-lightGray sm:mx-auto lg:my-8" />
      <div
        class="flex flex-col items-center gap-2 text-sm text-center lg:flex-row lg:justify-between"
      >
        <span class="text-center">
          © {{ currentYear }} | All rights reserved by
          <RouterLink to="/" class="hover:underline">VroomRent</RouterLink>
        </span>
        <div class="flex gap-2">
          <RouterLink to="/terms-of-service" class="hover:underline">Terms of Service</RouterLink>
          <span>|</span>
          <RouterLink to="/privacy-policy" class="hover:underline">Privacy Policy</RouterLink>
        </div>
      </div>

      <p class="mt-4 text-sm text-center">
        Built by
        <a href="https://manosgrigorakis.com" target="_blank" class="hover:underline"
          >Manos Grigorakis</a
        >
      </p>
    </div>
    <div class="w-full bg-vibrantOrange-default h-1.5"></div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currentYear = new Date().getFullYear()
const user = computed(() => store.getters.user)
</script>
