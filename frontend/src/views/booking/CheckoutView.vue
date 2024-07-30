<template>
  <section>
    <Stepper3 />
    <div class="flex justify-center gap-20 my-4">
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
