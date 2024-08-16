<template>
  <button
    class="py-2 px-3 font-semibold text-white rounded bg-vibrantOrange-default hover:bg-vibrantOrange-700 transition duration-200 drop-shadow-md shadow-sm hover:hover:drop-shadow-lg hover:cursor-pointer"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  widthClass: {
    type: String,
    default: 'w-auto'
  }
})

const buttonClasses = computed(() => {
  const disabledClasses = props.disabled ? ' cursor-not-allowed opacity-50 ' : ''
  const widthClasses = props.widthClass

  return ` ${disabledClasses} ${widthClasses}`
})
</script>
