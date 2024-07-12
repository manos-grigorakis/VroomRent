<template>
  <section class="flex flex-col gap-8 px-5 sm:justify-center items-center sm:px-8 mt-12 mb-20">
    <h2 class="text-lg sm:text-xl font-Montserrat font-semibold">
      Get Behind The Wheels in 4 Easy Steps
    </h2>
    <ol class="flex justify-between items-center max-w-4xl w-full mx-auto">
      <!-- Step 1 -->
      <li class="relative mb-6 flex-1">
        <div class="flex items-center">
          <div
            class="z-10 flex items-center justify-center w-6 h-6 bg-goldenYellow-default rounded-full ring-4 ring-white drop-shadow-md shrink-0"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </div>
          <transition name="stepper-line">
            <div v-if="isLoaded" class="flex w-full bg-goldenYellow-default h-1"></div
          ></transition>
        </div>
        <div class="mt-3">
          <h3 class="font-medium">Step 1</h3>
          <h4 class="font-light text-sm md:text-base">Choose Dates</h4>
        </div>
      </li>
      <!-- Step 2 -->
      <li class="relative mb-6 flex-1">
        <div class="flex items-center">
          <div
            class="z-10 flex items-center justify-center w-6 h-6 bg-goldenYellow-default rounded-full ring-4 ring-white shrink-0 drop-shadow-md"
          ></div>
          <div class="flex w-full bg-lightGray h-1"></div>
        </div>
        <div class="mt-3">
          <h3 class="font-medium">Step 2</h3>
          <h4 class="font-light text-sm md:text-base">Choose Vehicle</h4>
        </div>
      </li>
      <!-- Step 3 -->
      <li class="relative mb-6 flex-1">
        <div class="flex items-center">
          <div
            class="z-10 flex items-center justify-center w-6 h-6 bg-lightGray rounded-full ring-4 ring-white shrink-0 drop-shadow-md"
          ></div>
          <div class="flex w-full bg-lightGray h-1"></div>
        </div>
        <div class="mt-3">
          <h3 class="font-medium">Step 3</h3>
          <h4 class="font-light text-sm md:text-base">Choose Extras</h4>
        </div>
      </li>
      <!-- Step 4 -->
      <li class="relative mb-6">
        <div class="flex items-center">
          <div
            class="z-10 flex items-center justify-center w-6 h-6 bg-lightGray rounded-full ring-4 ring-white shrink-0 drop-shadow-md"
          ></div>
        </div>
        <div class="mt-3">
          <h3 class="font-medium">Step 4</h3>
          <h4 class="font-light text-sm md:text-base">Payment</h4>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isLoaded = ref(false)

onMounted(() => (isLoaded.value = true))
onUnmounted(() => (isLoaded.value = false))
</script>

<style scoped>
.stepper-line-enter-from {
  width: 0;
}
.stepper-line-enter-active {
  transition: all 0.8s ease-out;
}
.stepper-line-enter-to {
  width: 100%;
}
</style>
