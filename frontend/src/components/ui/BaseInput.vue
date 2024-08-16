<template>
  <section>
    <div>
      <div class="flex items-center justify-between">
        <label :for="inputId" class="block text-sm font-medium leading-6">
          {{ labelValue }}
        </label>
        <div class="text-sm" v-if="forgotPassword">
          <RouterLink to="/forgot-password" class="font-light hover:underline"
            >Forgot password?</RouterLink
          >
        </div>
      </div>
      <div class="mt-2">
        <input
          :id="inputId"
          :type="inputType"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="block w-full rounded border-1 py-1.5 shadow-sm ring-1 ring-[#ccc] sm:text-sm sm:leading-6 pl-2"
          :class="{
            'border-2 border-red-default': errorInput,
            'border-2 border-green': inputValidated
          }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  labelValue: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  forgotPassword: {
    type: Boolean,
    default: false
  },
  inputId: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  errorInput: {
    type: Boolean,
    default: false
  },
  inputValidated: {
    type: Boolean,
    default: false
  }
})
</script>
