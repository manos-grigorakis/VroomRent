<template>
  <section class="flex flex-col items-center mb-20 tracking-wide px-6">
    <h2 class="text-2xl font-Montserrat font-semibold mb-10">
      {{ heading }}
    </h2>

    <slot></slot>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  heading: {
    type: String
  }
})
</script>
