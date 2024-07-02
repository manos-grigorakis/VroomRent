<template>
  <form class="flex flex-col gap-4 bg-white rounded-md px-4 py-6 drop-shadow-md">
    <div class="flex items-center gap-2">
      <label for="different-location">I will drop off, in a different location: </label>
      <input type="checkbox" id="different-location" @click="handleCheckbox" />
    </div>
    <div class="flex flex-col lg:flex-row items-strech lg:items-center gap-6 lg:gap-10">
      <div class="flex flex-col">
        <label for="pickup-location">Pick Up:</label>
        <input
          type="text"
          id="pickup-location"
          placeholder="Location"
          class="border-2 rounded-md px-2 py-1 border-lightGray w-72"
        />
      </div>
      <Transition>
        <div
          v-if="isCheckboxActive"
          class="flex flex-col"
          :class="{ hidden: !isCheckboxActive, flex: isCheckboxActive }"
        >
          <label for="dropoff-location">Drop Off:</label>
          <input
            type="text"
            id="dropoff-location"
            placeholder="Location"
            class="border-2 rounded-md px-2 py-1 border-lightGray w-72"
          />
        </div>
      </Transition>
      <div class="flex flex-col">
        <label for="pickup-date">Pick Up:</label>
        <input
          type="date"
          id="pickup-date"
          class="border-2 rounded-md px-2 py-1 border-lightGray text-[#ccc] focus:text-[#000000]"
        />
      </div>
      <div class="flex flex-col">
        <label for="dropoff-date">Drop Off:</label>
        <input
          type="date"
          id="dropoff-date"
          class="border-2 rounded-md px-2 py-1 border-lightGray text-[#ccc] focus:text-[#000000]"
        />
      </div>

      <button
        class="bg-vibrantOrange-default text-white font-medium md:mt-4 px-4 py-2 rounded-md drop-shadow-sm hover:bg-vibrantOrange-700 hover:drop-shadow-md"
      >
        Find Car
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const isCheckboxActive = ref(false)

const handleCheckbox = () => {
  isCheckboxActive.value = !isCheckboxActive.value
}
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateX(-300px) scale(0.5);
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-to,
.v-leave-from {
  transform: translateX(0) scale(1);
}
.v-leave-active {
  transition: all 0.3s ease-in;
}
</style>
