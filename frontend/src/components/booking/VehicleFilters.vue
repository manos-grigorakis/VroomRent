<template>
  <div class="flex flex-col justify-around mb-8 md:flex-row px-8 gap-4">
    <div class="flex flex-col gap-4 md:gap-10 md:flex-row">
      <!-- Category -->
      <select name="" id="" class="shadow-md drop-shadow-sm hover:cursor-pointer">
        <option selected disabled>Category</option>
        <!-- Add it dynamic to retrieve values for  -->
        <option value="">Small</option>
        <option value="">Medium</option>
        <option value="">Large</option>
        <option value="">SUV</option>
        <option value="">Luxurious</option>
        <option value="">4x4</option>
      </select>
      <!-- Transmittion -->
      <select name="" id="" class="shadow-md drop-shadow-sm hover:cursor-pointer">
        <option selected disabled>Transmittion</option>
        <!-- Add it dynamic to retrieve values for  -->
        <option value="">Automatic</option>
        <option value="">Manual</option>
      </select>
      <!-- Fuel -->
      <select name="" id="" class="shadow-md drop-shadow-sm hover:cursor-pointer">
        <option selected disabled>Fuel</option>
        <!-- Add it dynamic to retrieve values for  -->
        <option value="">Petrol</option>
        <option value="">Diesel</option>
        <option value="">Electric</option>
      </select>
    </div>
    <!-- Sort By -->
    <select name="" id="" class="shadow-md drop-shadow-sm hover:cursor-pointer">
      <option selected disabled>Sort By</option>
      <!-- Add it dynamic to retrieve values for  -->
      <option value="">Ascending Price</option>
      <option value="">Descending Price</option>
    </select>
  </div>
</template>

<style scoped>
select {
  padding: 0.7rem 1rem;
  border-radius: 5px;
}
</style>
