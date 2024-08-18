<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:justify-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg size-8/12 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    :class="[
                      'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
                      {
                        'border-vibrantOrange-default': isInformationIcon,
                        'border-red-default': !isInformationIcon
                      }
                    ]"
                  >
                    <ExclamationTriangleIcon
                      v-if="!isInformationIcon"
                      class="h-7 w-7 text-red-default"
                      aria-hidden="true"
                    />
                    <InformationCircleIcon
                      v-else
                      class="h-10 w-10 text-vibrantOrange-default"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 font-Montserrat"
                      >{{ title }}</DialogTitle
                    >
                    <div v-if="!customContent" class="mt-2 text-sm">
                      <p class="text-sm">
                        {{ message }}
                      </p>
                    </div>
                    <!-- Custom content for modal -->
                    <div v-else class="mt-2">
                      <slot></slot>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!singleButton" class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-default hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="confirmDelete"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-customBlue-700 hover:text-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="cancelDelete"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
              <div v-else class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-customBlue-default px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-customBlue-700 sm:ml-3 sm:w-auto"
                  @click="closeModal"
                >
                  Οκ
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const open = ref(true)

defineProps({
  title: {
    type: String
  },
  message: {
    type: String
  },
  singleButton: {
    type: Boolean,
    default: false
  },
  isInformationIcon: {
    type: Boolean,
    default: false
  },
  customContent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'confirmDelete', 'cancelDelete'])

const closeModal = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('confirmDelete')
  closeModal()
}

const cancelDelete = () => {
  emit('cancelDelete')
  closeModal()
}
</script>
