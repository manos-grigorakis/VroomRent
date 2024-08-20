<template>
  <div
    ref="formWrapper"
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 mt-16 lg:px-8 bg-white drop-shadow-md rounded-lg max-w-sm md:max-w-lg mx-auto"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const formWrapper = ref(null)

onMounted(() => {
  gsap.from(formWrapper.value, { scale: 0.7, duration: 0.7 })
})
</script>
