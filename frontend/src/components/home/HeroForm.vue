<template>
  <section>
    <BaseModal
      v-if="open"
      :single-button="true"
      title="Required Fields"
      :message="errorMessage"
      @close="open = false"
    />
    <form
      @submit.prevent="handleForm"
      class="flex flex-col gap-4 bg-white rounded-md px-4 py-6 drop-shadow-md"
    >
      <div class="flex items-center gap-2">
        <label for="different-location">I will drop off, in a different location: </label>
        <input type="checkbox" id="different-location" @click="handleCheckbox" />
      </div>
      <div class="flex flex-col lg:flex-row items-strech lg:items-center gap-6 lg:gap-10">
        <div class="flex flex-col">
          <label for="pickup-location">Pick Up:</label>
          <multiselect
            id="pickup-location"
            v-model="userData.selectedPickupAirport"
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
              v-model="userData.selectedDropoffAirport"
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
            v-model="userData.selectedPickupDate"
            class="border-2 rounded-md px-2 py-2 border-lightGray"
            :class="userData.selectedPickupDate ? 'text-black' : 'text-lightGray'"
          />
        </div>
        <div class="flex flex-col">
          <label for="dropoff-date">Drop Off:</label>
          <input
            type="date"
            id="dropoff-date"
            v-model="userData.selectedDropoffDate"
            :min="userData.selectedPickupDate"
            class="border-2 rounded-md px-2 py-2 border-lightGray"
            :class="userData.selectedDropoffDate ? 'text-black  border-black' : 'text-lightGray'"
          />
        </div>

        <div class="flex items-center mt-2">
          <button
            class="bg-vibrantOrange-default text-center text-white font-medium md:mt-4 px-4 py-2 rounded-md drop-shadow-sm hover:bg-vibrantOrange-700 hover:drop-shadow-md w-full lg:w-auto"
          >
            Find Car
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import BaseModal from '../ui/BaseModal.vue'

import airportsData from '@/assets/data/filtered_airports.json'

const isCheckboxActive = ref(false)
const airports = ref([])
const open = ref(false)
const errorMessage = ref('')

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

// Form
const store = useStore()
const router = useRouter()

const userData = reactive({
  selectedPickupAirport: '',
  selectedDropoffAirport: '',
  selectedPickupDate: '',
  selectedDropoffDate: ''
})

const formValidation = () => {
  open.value = false
  errorMessage.value = ''

  if (
    !userData.selectedPickupAirport ||
    !userData.selectedPickupDate ||
    !userData.selectedDropoffDate
  ) {
    errorMessage.value = 'All fields are being required'
    open.value = true
    return false
  }

  if (
    isCheckboxActive.value &&
    (!userData.selectedPickupAirport ||
      !userData.selectedDropoffAirport ||
      !userData.selectedPickupDate ||
      !userData.selectedDropoffDate)
  ) {
    errorMessage.value = 'All fields are being required'
    open.value = true
    return false
  }

  return true
}

const handleForm = () => {
  if (!formValidation()) {
    open.value = true
    return
  }
  store.commit('bookings/setPickUpForm', userData)
  router.push('/choose-vehicle')
}
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
