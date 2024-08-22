<template>
  <section>
    <BaseSpinner v-if="isLoading" />
    <UserUploadAvatar />
    <div class="relative">
      <BaseModal
        :show="open"
        title="Delete your account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        @close="handleModalClose"
        @confirmDelete="handleDeleteUser"
        @cancelDelete="handleModalClose"
      />
      <button
        class="absolute right-6 top-40 py-1 px-4 rounded-md transition duration-200 drop-shadow-md hover:hover:drop-shadow-lg hover:cursor-pointer bg-red-default text-white hover:bg-red-700"
        @click="openModal"
      >
        Delete Account
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import UserUploadAvatar from './UserUploadAvatar.vue'

const store = useStore()
const router = useRouter()
const toast = useToast()

const user = computed(() => store.getters.user)
const isLoading = ref(false)
const open = ref(false)

const openModal = () => {
  open.value = true
}

const handleModalClose = () => {
  open.value = false
}

const handleDeleteUser = async () => {
  isLoading.value = true
  const userId = user.value._id

  try {
    await store.dispatch('deleteUser', userId)
    toast('Account Deleted Successfully', { type: 'success' })
    router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
    open.value = false
  }
}
</script>
