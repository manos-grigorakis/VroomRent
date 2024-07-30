<template>
  <div>
    <RouterLink v-if="link" :to="link" :class="buttonClasses">
      <slot></slot>
    </RouterLink>
    <button v-else :class="buttonClasses" :disabled="disabled">
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
  link: {
    type: String,
    default: null
  },
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
  const baseClasses =
    'py-2 px-8 font-semibold rounded-md transition duration-200 drop-shadow-md hover:hover:drop-shadow-lg hover:cursor-pointer'

  const outlineClasses = props.outline
    ? `border-2 border-customBlue-default bg-transparent  hover:bg-customBlue-700 hover:border-customBlue-700 hover:text-white `
    : `bg-customBlue-default text-white hover:bg-customBlue-700`

  const disabledClasses = props.disabled ? 'bg-gray-400 cursor-not-allowed opacity-50 ' : ''
  const widthClasses = props.widthClass

  return `${baseClasses} ${outlineClasses} ${disabledClasses} ${widthClasses}`
})
</script>
