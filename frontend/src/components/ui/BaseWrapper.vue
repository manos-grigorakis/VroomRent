<template>
  <section class="mb-20 flex flex-col items-center gap-10 tracking-wide">
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
