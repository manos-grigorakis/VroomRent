import { createInjectionState } from '@vueuse/core'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import { onMounted, ref } from 'vue'

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({ opts, orientation, plugins }, emits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y'
      },
      [Autoplay({ delay: 4000, stopOnInteraction: true })]
    )

    const currentSlide = ref(0)
    const totalSlides = ref(0)

    function onSelect(api) {
      currentSlide.value = api.selectedScrollSnap()
      totalSlides.value = api.scrollSnapList().length
    }

    onMounted(() => {
      if (!emblaApi.value) return

      emblaApi.value.on('init', onSelect)
      emblaApi.value.on('reInit', onSelect)
      emblaApi.value.on('select', onSelect)

      emits('init-api', emblaApi.value)
    })

    return {
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      currentSlide,
      totalSlides,
      scrollPrev: () => emblaApi.value?.scrollPrev(),
      scrollNext: () => emblaApi.value?.scrollNext(),
      orientation
    }
  }
)

function useCarousel() {
  const carouselState = useInjectCarousel()

  if (!carouselState) throw new Error('useCarousel must be used within a <Carousel />')

  return carouselState
}

export { useCarousel, useProvideCarousel }
