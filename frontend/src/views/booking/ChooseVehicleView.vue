<template>
  <section>
    <StepperComponent />
    <h2 class="text-2xl font-Montserrat font-semibold text-center mb-10">Choose Vehicle</h2>
    <VehicleFilters />
    <VehiclesCards />
  </section>
</template>

<script setup>
import StepperComponent from '@/components/ui/Stepper1.vue'
import VehiclesCards from '@/components/booking/VehiclesCards.vue'
import VehicleFilters from '@/components/booking/VehicleFilters.vue'
</script>
