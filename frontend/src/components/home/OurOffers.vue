<template>
  <BaseWrapper heading="Our Special Offers" class="min-h-screen justify-center">
    <!-- Desktop View -->
    <section v-show="!isMobile" class="flex gap-20" ref="offersSection">
      <div
        v-for="offer in offers"
        :key="offer._id"
        class="offer-item flex flex-col justify-between gap-6 max-w-md bg-white rounded-lg px-4 py-8 shadow-md drop-shadow-sm"
      >
        <img :src="getImageUrl(offer.img)" :alt="offer.title" class="w-38 h-auto" />
        <div>
          <h3 class="text-xl font-Montserrat font-semibold mb-2">{{ offer.title }}</h3>
          <p class="max-w-md mb-4">
            {{ offer.description }}
          </p>
          <ul class="list-disc pl-8">
            <li v-for="detail in offer.details" :key="detail" class="font-light">{{ detail }}</li>
          </ul>
        </div>
        <!-- <BaseButton class="mx-auto">{{ offer.ctaText }}</BaseButton> -->
        <BaseButton class="mx-auto" :disabled="true">Not Available</BaseButton>
      </div>
    </section>

    <!-- Mobile View -->
    <Carousel v-show="isMobile" class="min-h-full px-4" ref="carousel">
      <CarouselContent class="-ml-1">
        <CarouselItem
          v-for="offer in offers"
          :key="offer._id"
          class="lg:pl-10 md:basis-1/2 lg:basis-1/3 offer-item"
        >
          <div
            class="flex flex-col mx-auto justify-between items-center gap-6 max-w-sm bg-white rounded-lg px-4 py-4 shadow-md drop-shadow-sm h-full"
          >
            <img :src="getImageUrl(offer.img)" :alt="offer.title" class="w-38 h-auto" />
            <div>
              <h3 class="text-xl font-Montserrat font-semibold mb-2">{{ offer.title }}</h3>
              <p class="max-w-md mb-4">
                {{ offer.description }}
              </p>
              <ul class="list-disc pl-8">
                <li v-for="detail in offer.details" :key="detail" class="font-light">
                  {{ detail }}
                </li>
              </ul>
            </div>
            <!-- <BaseButton class="mx-auto" >{{ offer.ctaText }}</BaseButton> -->
            <BaseButton class="mx-auto" :disabled="true">Not Available</BaseButton>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </BaseWrapper>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import axios from 'axios'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const offers = ref([])
const carousel = ref(null)
const offersSection = ref(null)

const fetchOffers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/offers`)
    offers.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const getImageUrl = (imageName) => {
  return new URL(`../../assets/images/offers/${imageName}`, import.meta.url).href
}

const isMobile = ref(window.innerWidth < 1000)

const updateView = () => {
  isMobile.value = window.innerWidth < 1000
}

onMounted(async () => {
  await fetchOffers()
  window.addEventListener('resize', updateView)
  updateView()

  // Desktop animation
  if (!isMobile.value) {
    gsap.fromTo(
      offersSection.value.querySelectorAll('.offer-item'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2, // Apply stack effect with a delay among the elements
        scrollTrigger: {
          trigger: offersSection.value,
          start: 'top 80%',
          toggleActions: 'play none play reverse'
        }
      }
    )
  }
  // Mobile animation
  if (isMobile.value) {
    const carouselItems = carousel.value.$el.querySelectorAll('.offer-item')
    gsap.fromTo(
      carouselItems,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: carousel.value.$el,
          start: 'top 80%',
          toggleActions: 'play none play reverse'
        }
      }
    )
  }
  ScrollTrigger.refresh()
})
</script>
