<template>
    <div class="embla__dots">
      <button
        v-for="index in totalSlides"
        :key="index"
        :class="['embla__dot', { 'embla__dot--selected': currentSlide === index - 1 }]"
        @click="scrollToSlide(index - 1)"
      ></button>
    </div>
  </template>
  
  <script setup>
  import { useCarousel } from './useCarousel';
  
  const { currentSlide, totalSlides, carouselApi } = useCarousel();
  
  const scrollToSlide = (index) => {
    carouselApi.value.scrollTo(index);
  };
  </script>
  
  <style>
  .embla__dots {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }
  
  .embla__dot {
    width: 15px;
    height: 15px;
    margin: 0 5px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .embla__dot--selected {
    background-color: #000;
  }
  .visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

  </style>
  