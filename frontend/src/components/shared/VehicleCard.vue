<template>
  <!-- Card -->
  <div class="relative bg-white max-w-sm drop-shadow-md rounded-md pt-14 pb-8">
    <VehiclePremiumTag v-if="vehicle.premiumDelivery" />
    <VehicleDetails
      :image="vehicle.image"
      :name="vehicle.name"
      :category="vehicle.category"
      :passengers="vehicle.details.passengers"
      :big-case="vehicle.details.storage.bigCase"
      :small-case="vehicle.details.storage.smallCase"
      :transmission="vehicle.details.transmission"
      :fuel="vehicle.details.fuel"
      class="px-8"
    />
    <VehiclePrice :price="vehicle.price" :calculate="calculatePrice" />
    <VehicleButton v-if="showVehicleButtton" :vehicle="vehicle" />
  </div>
</template>

<script setup>
import VehiclePremiumTag from './VehiclePremiumTag.vue'
import VehicleDetails from '@/components/shared/VehicleDetails.vue'
import VehiclePrice from './VehiclePrice.vue'
import VehicleButton from './VehicleButton.vue'

defineProps({
  vehicle: {
    type: Object,
    required: true
  },
  calculatePrice: {
    type: Boolean,
    default: false
  },
  showVehicleButtton: {
    type: Boolean,
    default: false
  }
})
</script>
