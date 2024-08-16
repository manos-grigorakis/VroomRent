<template>
  <section>
    <BaseSpinner v-if="isLoading" />
    <BaseModal
      :show="open"
      :single-button="true"
      :title="modalTitle"
      :message="errorMessage"
      @close="open = false"
    />
    <div class="flex flex-col gap-4 items-start mt-4">
      <img
        v-if="previewImage || currentAvatar"
        :src="previewImage || currentAvatar"
        alt="user-avatar"
        class="w-20 h-20 rounded-full"
      />

      <label class="block -mb-2 text-sm font-medium" for="file_input">Upload Image</label>
      <input
        class="block text-sm border rounded-md cursor-pointer focus:outline-none -mb-2"
        id="file_input"
        ref="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        @change="handleFileUpload"
      />
      <small>Supported images formats: (.jpg, .jpeg, .png)</small>
      <button
        class="bg-vibrantOrange-default hover:bg-vibrantOrange-700 text-white text-sm px-8 py-2 rounded shadow-sm drop-shadow-md"
        @click="uploadImage"
      >
        Upload Image
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const store = useStore()
const toast = useToast()

const user = computed(() => store.getters.user)

const fileInput = ref(null)
const image = ref(null)
const previewImage = ref(null)
const isLoading = ref(false)
const open = ref(false)
const modalTitle = ref(null)
const errorMessage = ref(null)
const supportedImageFormats = ['image/jpeg', 'image/png']

// Checks if user already has an avatar,
// otherwhise it shows a placeholder
const currentAvatar = computed(() => {
  return user.value.avatar
    ? `http://localhost:3000/uploads/${user.value.avatar}`
    : 'http://localhost:3000/uploads/default-avatar.png'
})

// Preview the image that user has selected from its device
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (!supportedImageFormats.includes(file.type)) {
      open.value = true
      modalTitle.value = 'Invalid Image'
      errorMessage.value =
        'Please select a supported image format with one of the following extensions: (.jpg, .jpeg, .png).'
      fileInput.value.value = null // sets the value of input to null
      return
    }

    image.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const uploadImage = async () => {
  if (!image.value) {
    open.value = true
    modalTitle.value = 'Image field is required'
    errorMessage.value =
      'In order to upload an avatar to your profile, you need to first to choose an image.'
    return
  }

  isLoading.value = true
  const formData = new FormData()
  formData.append('file', image.value)
  formData.append('id', user.value._id)

  try {
    await store.dispatch('uploadAvatar', formData)
    toast('Image Uploaded Successfully', { type: 'success' })
  } catch (error) {
    console.error('Error uploading image: ', error)
    toast('Error uploading avatar, please try again', { type: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>
