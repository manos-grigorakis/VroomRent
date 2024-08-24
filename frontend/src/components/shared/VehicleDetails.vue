<template>
  <!-- Car details -->
  <div class="flex flex-col gap-2 tracking-wide">
    <img :src="getImageUrl(image)" :alt="image" loading="lazy" />

    <h2 class="text-lg font-medium">{{ name }} or similar</h2>
    <small class="text-sm font-light">{{ category.join(' | ') }}</small>
    <div class="flex justify-between items-center gap-2">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <box-icon name="user"></box-icon>
          <span>{{ passengers }} Passengers</span>
        </div>
        <div class="flex items-center gap-2">
          <box-icon name="briefcase-alt"></box-icon>
          <span>x {{ bigCase }}</span>
          <box-icon name="briefcase"></box-icon>
          <span>x {{ smallCase }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <box-icon name="car"></box-icon>
          <span>{{ transmission }}</span>
        </div>
        <div class="flex items-center gap-2">
          <box-icon name="gas-pump"></box-icon>
          <span>{{ fuel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: { type: String },
  name: { type: String },
  category: { type: String },
  passengers: { type: String },
  bigCase: { type: String },
  smallCase: { type: String },
  transmission: { type: String },
  fuel: { type: String }
})

const getImageUrl = (imageName) => {
  return new URL(`../../assets/images/vehicles/${imageName}`, import.meta.url).href
}
</script>
