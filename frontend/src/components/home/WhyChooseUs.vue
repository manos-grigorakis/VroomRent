<template>
  <!-- mb-20 -->
  <div class="bg-charcoalGray px-4 py-8 min-h-screen content-center">
    <div class="flex flex-col justify-center items-center gap-10 xl:gap-20 xl:flex-row">
      <div class="flex flex-col gap-8">
        <h2 class="text-2xl text-white font-Montserrat font-semibold tracking-wide">
          Why Choose Us
        </h2>
        <img
          ref="image"
          src="../../assets/images/pexels-shkrabaanthony-7144226.webp"
          alt=""
          class="w-[671px] h-[50%]"
        />
      </div>
      <div class="flex flex-col gap-4 text-white tracking-wide">
        <div ref="text">
          <h3 class="text-2xl font-Montserrat font-semibold mb-4">
            <span class="text-vibrantOrange-default font-semibold">Discover</span> the VroomRent
            Advantage
          </h3>
          <p class="max-w-[650px] text-lg leading-7">
            At VroomRent, we're dedicated to providing you with not just a car rental, but a
            complete travel solution tailored to your needs. Whether you're exploring the city for
            business or embarking on a scenic road trip, we ensure a seamless, satisfying, and
            sustainable rental experience. Discover why more travelers choose VroomRent for their
            journeys:
          </p>
        </div>
        <ul class="flex flex-col gap-1 mb-4">
          <li ref="listItemOne" class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Competitive Pricing
          </li>
          <li ref="listItemTwo" class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Unmatched Support
          </li>
          <li ref="listItemThree" class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Environmentally Friendly
          </li>
          <li ref="listItemFour" class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Brand New Fleet
          </li>
        </ul>
        <BaseButton ref="button" link="/about">Learn More</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const image = ref(null)
const text = ref(null)
const listItemOne = ref(null)
const listItemTwo = ref(null)
const listItemThree = ref(null)
const listItemFour = ref(null)
const button = ref(null)

onMounted(() => {
  // Image animation
  gsap.fromTo(
    image.value,
    { x: -600 },
    {
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: image.value,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )

  // Text animation
  gsap.fromTo(
    text.value,
    { x: 500 },
    {
      x: 0,
      duration: 2,
      scrollTrigger: {
        trigger: text.value,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )

  // List items animation
  gsap.fromTo(
    listItemOne.value,
    { x: 500 },
    {
      x: 0,
      duration: 2,
      scrollTrigger: {
        trigger: listItemOne.value,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )
  gsap.fromTo(
    listItemTwo.value,
    { x: 530 },
    {
      x: 0,
      duration: 2,
      scrollTrigger: {
        trigger: listItemTwo.value,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )
  gsap.fromTo(
    listItemThree.value,
    { x: 560 },
    {
      x: 0,
      duration: 2,
      scrollTrigger: {
        trigger: listItemThree.value,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )
  gsap.fromTo(
    listItemFour.value,
    { x: 590 },
    {
      x: 0,
      duration: 2,
      scrollTrigger: {
        trigger: listItemFour.value,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )

  // Button animation
  gsap.fromTo(
    button.value.$el,
    { x: 620 },
    {
      x: 0,
      duration: 2,
      scrollTrigger: {
        trigger: button.value.$el,
        start: 'top top',
        toggleActions: 'play none none none'
      }
    }
  )

  ScrollTrigger.refresh()
})
</script>
