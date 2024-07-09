<template>
  <section class="flex flex-col items-center gap-10 mb-20 tracking-wide px-6">
    <h2 class="text-2xl font-Montserrat font-semibold">{{ heading }}</h2>
    <slot></slot>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  heading: {
    type: String
  }
})
</script>
