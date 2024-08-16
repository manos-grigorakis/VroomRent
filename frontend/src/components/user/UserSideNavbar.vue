<template>
  <section class="w-full min-h-screen mb-20 px-4 sm:px-8 mt-20">
    <div class="flex justify-center gap-20 flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="basis-1/4 max-w-[220px] text-lg font-Montserrat">
        <ul class="flex flex-col gap-4 rounded-md px-4 py-8">
          <li>
            <RouterLink
              class="flex items-center gap-2 text-[#ccc] hover:text-charcoalGray"
              :to="{ name: 'profile' }"
              active-class="text-charcoalGray"
              exact-active-class="charcoalGray"
            >
              <box-icon name="user"></box-icon>My Account
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center gap-2 text-[#ccc] hover:text-charcoalGray"
              :to="{ name: 'edit-profile' }"
              active-class="text-charcoalGray"
              exact-active-class="charcoalGray"
            >
              <box-icon name="edit-alt"></box-icon>Edit Profile
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center gap-2 text-[#ccc] hover:text-charcoalGray"
              :to="{ name: 'manage-address' }"
              active-class="text-charcoalGray"
              exact-active-class="charcoalGray"
            >
              <box-icon name="building-house"></box-icon>Manage Adress
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center gap-2 text-[#ccc] hover:text-charcoalGray"
              :to="{ name: 'bookings' }"
              active-class="text-charcoalGray"
              exact-active-class="charcoalGray"
            >
              <box-icon name="car"></box-icon>Bookings
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="flex items-center gap-2 text-[#ccc] hover:text-charcoalGray"
              :to="{ name: 'settings' }"
              active-class="text-charcoalGray"
              exact-active-class="charcoalGray"
            >
              <box-icon name="cog"></box-icon>Settings
            </RouterLink>
          </li>
        </ul>
      </aside>
      <div
        class="basis-1/2 max-w-[800px] min-h-[500px] bg-white rounded-md drop-shadow-sm shadow-md px-4 lg:px-8 py-6"
      >
        <slot v-if="user"></slot>
        <BaseSpinner v-else />
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
