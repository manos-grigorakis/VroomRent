<template>
  <div class="bg-charcoalGray py-16 px-4 mb-20">
    <div class="flex flex-col justify-center items-center gap-10 xl:gap-20 xl:flex-row">
      <div class="flex flex-col gap-8">
        <h2 class="text-2xl text-white font-Montserrat font-semibold tracking-wide">
          Why Choose Us
        </h2>
        <img
          src="../../assets/images/pexels-shkrabaanthony-7144226.webp"
          alt=""
          class="w-[671px] h-[50%]"
        />
      </div>
      <div class="flex flex-col gap-4 text-white tracking-wide">
        <h3 class="text-2xl font-Montserrat font-semibold">
          <span class="text-vibrantOrange-default font-semibold">Discover</span> the VroomRent
          Advantage
        </h3>
        <p class="max-w-[650px] text-lg leading-7">
          At VroomRent, we're dedicated to providing you with not just a car rental, but a complete
          travel solution tailored to your needs. Whether you're exploring the city for business or
          embarking on a scenic road trip, we ensure a seamless, satisfying, and sustainable rental
          experience. Discover why more travelers choose VroomRent for their journeys:
        </p>
        <ul class="flex flex-col gap-1 mb-4">
          <li class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Competitive Pricing
          </li>
          <li class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Unmatched Support
          </li>
          <li class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Environmentally Friendly
          </li>
          <li class="flex items-center gap-2 font-medium text-lg">
            <box-icon name="check" color="#fff"></box-icon>Brand New Fleet
          </li>
        </ul>
        <BaseButton link="/about">Learn More</BaseButton>
      </div>
    </div>
  </div>
</template>
