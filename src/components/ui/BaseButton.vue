<template>
  <button :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  outline: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'customBlue'
  }
})

const buttonClasses = computed(() => {
  const baseClasses =
    'py-2 px-8 font-semibold rounded-md transition duration-200 drop-shadow-md hover:hover:drop-shadow-lg'
  const outlineClasses = props.outline
    ? `border-2 border-${props.color} bg-transparent hover:bg-${props.color} hover:text-white `
    : `bg-${props.color} text-white hover:bg-${props.color}-700`

  return `${baseClasses} ${outlineClasses}`
})
</script>
