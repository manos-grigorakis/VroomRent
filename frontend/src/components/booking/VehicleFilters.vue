<template>
  <div class="flex flex-col justify-around mb-8 md:flex-row px-8 gap-4">
    <div class="flex flex-col gap-4 md:gap-10 md:flex-row">
      <!-- Category -->
      <select
        v-model="category"
        @change="applyCategoryFilter"
        class="shadow-md drop-shadow-sm hover:cursor-pointer"
      >
        <option value="" disabled>Category</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="suv">SUV</option>
        <option value="luxurious">Luxurious</option>
        <option value="4x4">4x4</option>
      </select>
      <!-- Transmittion -->
      <select
        v-model="transmission"
        @change="applyTransmissionFilter"
        class="shadow-md drop-shadow-sm hover:cursor-pointer"
      >
        <option value="" disabled>Transmittion</option>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>
      <!-- Fuel -->
      <select
        v-model="fuel"
        @change="applyFuelFilter"
        class="shadow-md drop-shadow-sm hover:cursor-pointer"
      >
        <option value="" disabled>Fuel</option>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>
      </select>
    </div>
    <!-- Sort By -->
    <select
      v-model="sortOrder"
      @change="applySortOrder"
      class="shadow-md drop-shadow-sm hover:cursor-pointer"
    >
      <option value="" disabled>Sort By</option>
      <option value="ascending">Ascending Price</option>
      <option value="descending">Descending Price</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const category = ref('')
const transmission = ref('')
const fuel = ref('')
const sortOrder = ref('')

const applyCategoryFilter = () => {
  store.commit('vehicles/setCategoryFilter', category.value)
}

const applyTransmissionFilter = () => {
  store.commit('vehicles/setTransmissionFilter', transmission.value)
}

const applyFuelFilter = () => {
  store.commit('vehicles/setFuelFilter', fuel.value)
}

const applySortOrder = () => {
  store.commit('vehicles/setSortOrderFilter', sortOrder.value)
}
</script>

<style scoped>
select {
  padding: 0.7rem 1rem;
  border-radius: 5px;
}
</style>
