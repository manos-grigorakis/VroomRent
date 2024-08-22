<template>
  <section>
    <BaseModal
      :show="open"
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

      <div
        class="flex flex-col xl:flex-row gap-6 lg:gap-4 lg:items-center lg:flex-row"
        :class="{ 'lg:flex-col': isCheckboxActive }"
      >
        <div
          :class="[
            'flex',
            'flex-col',
            'gap-4',
            { 'md:flex-row': isCheckboxActive, 'lg:flex-col': !isCheckboxActive }
          ]"
        >
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
          <Transition @before-leave="beforeLeave" @after-leave="afterLeave" name="fade-scale">
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
        </div>

        <!-- Dates -->
        <div class="flex flex-row items-center gap-4 w-full">
          <div class="flex flex-col w-1/2">
            <label for="pickup-date">Pick Up:</label>
            <input
              type="date"
              id="pickup-date"
              v-model="userData.selectedPickupDate"
              class="border-2 rounded-md px-2 py-2 border-lightGray"
              :class="userData.selectedPickupDate ? 'text-black' : 'text-lightGray'"
            />
          </div>
          <div class="flex flex-col w-1/2">
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
        </div>
        <div class="flex items-center w-full lg:mt-5">
          <AccentButton widthClass="w-full ">Find Car</AccentButton>
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
import airportsData from '@/assets/data/filtered_airports.json'

const store = useStore()
const router = useRouter()

const isCheckboxActive = ref(false)
const airports = ref([])
const open = ref(false)
const errorMessage = ref('')
const userData = reactive({
  selectedPickupAirport: '',
  selectedDropoffAirport: '',
  selectedPickupDate: '',
  selectedDropoffDate: ''
})

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
  router.push('/booking/choose-vehicle')
}
</script>

<style>
.multiselect__single {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.multiselect-custom {
  width: 200px !important;
}
.multiselect {
  width: 325px !important;
  min-height: auto !important;
  padding: 0 !important;
}

.multiselect__option--highlight {
  background: #e9a402 !important;
}

.multiselect__option--selected {
  background-color: #ccaa00 !important;
  color: white !important;
}

.multiselect__content {
  overflow-y: auto !important;
}

.fade-scale-enter-active {
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
