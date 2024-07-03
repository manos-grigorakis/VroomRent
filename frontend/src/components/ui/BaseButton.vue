<template>
  <div>
    <RouterLink v-if="link" :to="link" :class="buttonClasses">
      <slot></slot>
    </RouterLink>
    <button v-else :class="buttonClasses">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  outline: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'customBlue'
  },
  link: {
    type: String,
    default: null
  }
})

const buttonClasses = computed(() => {
  const baseClasses =
    'py-2 px-8 font-semibold rounded-md transition duration-200 drop-shadow-md hover:hover:drop-shadow-lg'
  const outlineClasses = props.outline
    ? `border-2 border-${props.color}-default bg-transparent hover:bg-${props.color}-700 hover:border-${props.color}-700 hover:text-white `
    : `bg-${props.color}-default text-white hover:bg-${props.color}-700`

  return `${baseClasses} ${outlineClasses}`
})
</script>
