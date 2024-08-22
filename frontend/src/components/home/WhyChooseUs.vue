<template>
  <!-- min-h-screen md:min-h-min -->
  <div class="bg-charcoalGray px-4 py-8 content-center">
    <div
      class="flex flex-col justify-center items-center min-h-screen md:min-h-min gap-10 xl:gap-20 xl:flex-row"
    >
      <div class="flex flex-col gap-8">
        <h2 ref="title" class="text-2xl text-white font-Montserrat font-semibold tracking-wide">
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
          <p class="max-w-[650px] text-lg leading-7 font-medium">
            At VroomRent, we're dedicated to providing you with not just a car rental, but a
            complete travel solution tailored to your needs. Whether you're exploring the city for
            business or embarking on a scenic road trip, we ensure a seamless, satisfying, and
            sustainable rental experience. Discover why more travelers choose VroomRent for their
            journeys:
          </p>
        </div>
        <ul class="flex flex-col gap-1 mb-4">
          <li ref="listItemOne" class="flex items-center gap-2 text-lg">
            <box-icon name="check" color="#fff"></box-icon>Competitive Pricing
          </li>
          <li ref="listItemTwo" class="flex items-center gap-2 text-lg">
            <box-icon name="check" color="#fff"></box-icon>Unmatched Support
          </li>
          <li ref="listItemThree" class="flex items-center gap-2 text-lg">
            <box-icon name="check" color="#fff"></box-icon>Environmentally Friendly
          </li>
          <li ref="listItemFour" class="flex items-center gap-2 text-lg">
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

const title = ref(null)
const image = ref(null)
const text = ref(null)
const listItemOne = ref(null)
const listItemTwo = ref(null)
const listItemThree = ref(null)
const listItemFour = ref(null)
const button = ref(null)

onMounted(() => {
  // Title
  gsap.fromTo(
    title.value,
    { y: -80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'bounce.out',
      scrollTrigger: {
        trigger: title.value,
        start: 'top 90%',
        toggleActions: 'play none play reverse'
      }
    }
  )
  // Image
  gsap.fromTo(
    image.value,
    { x: '-100%', opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: image.value,
        start: 'top 90%',
        toggleActions: 'play none play reverse'
      }
    }
  )

  // Text animation
  gsap.fromTo(
    text.value,
    { x: 200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: text.value,
        start: 'top 80%',
        toggleActions: 'play none play reverse'
      }
    }
  )

  // List items animation
  gsap.fromTo(
    listItemOne.value,
    { x: 300, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: listItemOne.value,
        start: 'top 90%',
        toggleActions: 'play none play reverse'
      }
    }
  )
  gsap.fromTo(
    listItemTwo.value,
    { x: 320, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: listItemTwo.value,
        start: 'top 90%',
        toggleActions: 'play none play reverse'
      }
    }
  )
  gsap.fromTo(
    listItemThree.value,
    { x: 340, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: listItemThree.value,
        start: 'top 90%',
        toggleActions: 'play none play reverse'
      }
    }
  )
  gsap.fromTo(
    listItemFour.value,
    { x: 360, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: listItemFour.value,
        start: 'top 90%',
        toggleActions: 'play none play reverse'
      }
    }
  )

  // Button animation
  gsap.fromTo(
    button.value.$el,
    { x: 380, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: button.value.$el,
        start: 'top 100%',
        toggleActions: 'play none play reverse'
      }
    }
  )

  ScrollTrigger.refresh()
})
</script>
