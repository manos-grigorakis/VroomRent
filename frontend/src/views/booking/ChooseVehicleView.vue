<template>
  <section>
    <StepperComponent />
    <h2 class="text-2xl font-Montserrat font-semibold text-center mb-10">Choose Vehicle</h2>
    <VehicleFilters />
    <ChooseVehicle />
  </section>
</template>

<script setup>
import StepperComponent from '@/components/ui/Stepper1.vue'
import ChooseVehicle from '@/components/booking/ChooseVehicle.vue'
import VehicleFilters from '@/components/booking/VehicleFilters.vue'
</script>
