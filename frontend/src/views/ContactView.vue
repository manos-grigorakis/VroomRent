<template>
  <section class="flex flex-col justify-center gap-10 mt-20 mb-20 max-w-4xl mx-auto px-4">
    <BaseSpinner v-if="isLoading" />
    <div
      class="flex flex-col md:flex-row gap-10 bg-offWhite drop-shadow-lg shadow-sm rounded-md rounded-tl-3xl rounded-bl-3xl"
    >
      <div
        class="background-img relative w-full h-auto basis-3/5 text-white rounded-t-3xl md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-t-none px-4 py-8"
      >
        <h2 class="text-2xl font-Montserrat font-semibold md:mt-20">Get In Touch</h2>
        <p class="mt-2 font-Montserrat">
          We are here to help you find the perfect car for your journey.
        </p>
      </div>

      <form
        @submit.prevent="handleForm"
        class="flex flex-col justify-center gap-4 basis-4/5 py-8 px-8"
      >
        <div class="flex gap-4">
          <div class="basis-1/2">
            <BaseInput
              labelValue="First Name"
              inputType="text"
              inputId="firstName"
              v-model.trim="emailData.firstName"
              :errorInput="invalidInput.firstName"
              class="flex-1"
            />
            <span v-if="errorMessage.firstName" class="text-red-default text-sm">{{
              errorMessage.firstName
            }}</span>
          </div>
          <div class="basis-1/2">
            <BaseInput
              labelValue="Last Name"
              inputType="text"
              inputId="lastName"
              v-model.trim="emailData.lastName"
              :errorInput="invalidInput.lastName"
              class="flex-1"
            />
            <span v-if="errorMessage.lastName" class="text-red-default text-sm">{{
              errorMessage.lastName
            }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <BaseInput
              labelValue="Email Address"
              inputType="email"
              inputId="email"
              v-model.trim="emailData.email"
              :errorInput="invalidInput.email"
            />
            <span v-if="errorMessage.email" class="text-red-default text-sm">{{
              errorMessage.email
            }}</span>
          </div>
          <div class="">
            <BaseInput
              labelValue="Subject"
              inputType="text"
              inputId="subject"
              v-model.trim="emailData.subject"
              :errorInput="invalidInput.subject"
            />
            <span v-if="errorMessage.subject" class="text-red-default text-sm">{{
              errorMessage.subject
            }}</span>
          </div>
          <div>
            <label for="message" class="text-sm font-medium leading-6">Message</label>
            <textarea
              v-model.trim="emailData.message"
              id="message"
              class="mt-2 block w-full rounded border-1 pl-2 py-1.5 shadow-sm ring-1 ring-[#ccc] sm:text-sm sm:leading-6 min-h-32 max-h-40"
              :class="{ 'border-2 border-red-default': errorInput }"
            >
            </textarea>
            <span v-if="errorMessage.message" class="text-red-default text-sm">{{
              errorMessage.message
            }}</span>
          </div>
          <AccentButton widthClass="w-full" :disabled="isLoading">Contact </AccentButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const isLoading = ref(false)
const errorInput = ref(false)
const emailData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})
const invalidInput = reactive({
  firstName: false,
  lastName: false,
  email: false,
  subject: false,
  message: false
})
const errorMessage = reactive({
  firstName: null,
  lastName: null,
  email: null,
  subject: null,
  message: null
})

const formValidation = () => {
  let isValid = true
  errorInput.value = false

  Object.keys(invalidInput).forEach((key) => {
    invalidInput[key] = false
  })
  Object.keys(errorMessage).forEach((key) => {
    errorMessage[key] = false
  })

  if (!emailData.firstName) {
    invalidInput.firstName = true
    errorMessage.firstName = 'First name is required'
    isValid = false
  }
  if (!emailData.lastName) {
    invalidInput.lastName = true
    errorMessage.lastName = 'Last name is required'
    isValid = false
  }
  if (!emailData.email) {
    invalidInput.email = true
    errorMessage.email = 'Email is required'
    isValid = false
  }
  if (!emailData.subject) {
    invalidInput.subject = true
    errorMessage.subject = 'Subject is required'
    isValid = false
  }
  if (!emailData.message) {
    errorInput.value = true
    invalidInput.message = true
    errorMessage.message = 'Message is required'
    isValid = false
  }
  return isValid
}

const handleForm = async () => {
  if (!formValidation()) {
    return
  }
  isLoading.value = true
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/contact-mail`, {
      firstName: emailData.firstName,
      lastName: emailData.lastName,
      email: emailData.email,
      subject: emailData.subject,
      message: emailData.message
    })
    toast('Email has been sent successfully', { type: 'success' })
  } catch (error) {
    console.error(error)
    toast('Error sending email, please try again', { type: 'error' })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.background-img {
  background-image: url('../assets/images/contact/background.webp');
}

@media (max-width: 767px) {
  .background-img {
    background: #333333;
  }
}
</style>
