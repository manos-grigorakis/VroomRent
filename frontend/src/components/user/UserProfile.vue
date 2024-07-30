<template>
  <section>
    <h2 class="text-2xl font-semibold font-Montserrat mb-6 tracking-wide">
      Welcome {{ user.firstName }},
    </h2>

    <div class="bg-[#FAFAFA] p-4 rounded-md drop-shadow-md shadow-md">
      <h3 class="font-medium font-Montserrat mb-4 tracking-wide">Personal Information</h3>
      <div class="grid grid-cols-2">
        <div>
          <div class="flex flex-col gap-1 mb-4">
            <p class="font-Montserrat text-[#999] text-sm">First Name</p>
            <p class="font-medium text-lg">{{ user.firstName }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="font-Montserrat text-[#999] text-sm">Email</p>
            <p class="font-medium text-lg">{{ user.email }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-20">
          <div class="flex flex-col gap-1">
            <p class="font-Montserrat text-[#999] text-sm">Last Name</p>
            <p class="font-medium text-lg">{{ user.lastName }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const user = computed(() => store.getters.user)
</script>
