<template>
  <section>
    <Stepper3 />
    <!-- <div class="flex flex-col-reverse lg:flex-row justify-center gap-20 my-4 px-6"> -->
    <div
      class="flex flex-col-reverse justify-center gap-20 my-4 px-6 md:items-center lg:items-start lg:flex-row"
    >
      <BillingPaymentForms />
      <MyVehicle :show-continue-button="false" />
    </div>
  </section>
</template>

<script setup>
import Stepper3 from '@/components/ui/Stepper3.vue'
import BillingPaymentForms from '@/components/booking/CheckoutForms.vue'
import MyVehicle from '@/components/booking/MyVehicle.vue'
</script>
