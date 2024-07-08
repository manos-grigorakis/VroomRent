<template>
  <form class="flex flex-col gap-4 bg-white rounded-md px-4 py-6 drop-shadow-md">
    <div class="flex items-center gap-2">
      <label for="different-location">I will drop off, in a different location: </label>
      <input type="checkbox" id="different-location" @click="handleCheckbox" />
    </div>
    <div class="flex flex-col lg:flex-row items-strech lg:items-center gap-6 lg:gap-10">
      <div class="flex flex-col">
        <label for="pickup-location">Pick Up:</label>
        <multiselect
          id="pickup-location"
          v-model="selectedPickupAirport"
          :options="filteredAirports"
          :custom-label="nameWithLang"
          placeholder="Select airport"
          searchable="true"
          selectLabel=""
          deselectLabel=""
          selectedLabel=""
          label="name"
          track-by="name"
          open-direction="bottom"
          optionsLimit="100"
          maxHeight="900"
          class="border-2 border-lightGray rounded-md multiselect-custom"
        ></multiselect>
      </div>
      <Transition>
        <div
          v-if="isCheckboxActive"
          class="flex flex-col"
          :class="{ hidden: !isCheckboxActive, flex: isCheckboxActive }"
        >
          <label for="dropoff-location">Drop Off:</label>
          <multiselect
            id="dropoff-location"
            v-model="selectedDropoffAirport"
            :options="filteredAirports"
            :custom-label="nameWithLang"
            placeholder="Select airport"
            searchable="true"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
            label="name"
            track-by="name"
            open-direction="bottom"
            optionsLimit="100"
            maxHeight="300"
            class="border-2 border-lightGray rounded-md"
          ></multiselect>
        </div>
      </Transition>
      <div class="flex flex-col">
        <label for="pickup-date">Pick Up:</label>
        <input
          type="date"
          id="pickup-date"
          v-model="pickupDate"
          class="border-2 rounded-md px-2 py-2 border-lightGray"
          :class="pickupDate ? 'text-black' : 'text-lightGray'"
        />
      </div>
      <div class="flex flex-col">
        <label for="dropoff-date">Drop Off:</label>
        <input
          type="date"
          id="dropoff-date"
          v-model="dropoffDate"
          class="border-2 rounded-md px-2 py-2 border-lightGray"
          :class="dropoffDate ? 'text-black' : 'text-lightGray'"
        />
      </div>

      <div class="flex items-center mt-2">
        <!-- <button> -->
        <router-link
          class="bg-vibrantOrange-default text-white font-medium md:mt-4 px-4 py-2 rounded-md drop-shadow-sm hover:bg-vibrantOrange-700 hover:drop-shadow-md w-full lg:w-auto"
          to="/fleet"
          >Find Car</router-link
        >
        <!-- </button> -->
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import airportsData from '@/assets/filtered_airports.json'

const isCheckboxActive = ref(false)
const airports = ref([])
const selectedPickupAirport = ref(null)
const selectedDropoffAirport = ref(null)
const pickupDate = ref('')
const dropoffDate = ref('')

const handleCheckbox = () => {
  isCheckboxActive.value = !isCheckboxActive.value
}

const filteredAirports = computed(() => {
  return airports.value
})

const nameWithLang = ({ name, iso_country, municipality }) => {
  return `${iso_country}, ${name}, ${municipality}`
}

onMounted(() => {
  airports.value = airportsData
})
</script>

<style>
.multiselect-custom {
  width: 200px !important;
}
.multiselect {
  width: 300px !important;
  min-height: auto !important;
  padding: 0 !important;
}

.multiselect__option--highlight {
  background: #e9a402 !important;
}

/* Προσαρμογή του στυλ για επιλεγμένα στοιχεία */
.multiselect__option--selected {
  background-color: #ccaa00 !important;
  color: white !important;
}

/* Προσαρμογή του dropdown */
.multiselect__content {
  /* max-height: 500px !important; */
  overflow-y: auto !important;
}

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
