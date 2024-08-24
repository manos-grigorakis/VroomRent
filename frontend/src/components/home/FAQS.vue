<template>
  <BaseWrapper heading="Frequently Asked Questions">
    <div
      class="flex flex-col gap-4 mx-auto bg-white rounded-md w-full px-6 py-8 max-w-5xl shadow-md drop-shadow-sm"
    >
      <div v-for="(item, index) in accordionData" :key="index">
        <div
          class="flex items-center justify-between hover:cursor-pointer"
          @click="toggleItem(index)"
        >
          <h4 class="text-lg font-Montserrat font-semibold">{{ item.title }}</h4>
          <svg
            :class="{ 'rotate-180': items[index].open }"
            class="w-3 h-3 transition-transform"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </div>
        <div class="w-full h-0.5 bg-lightGray"></div>
        <transition name="slide-down">
          <div v-if="items[index].open" class="flex flex-col gap-3 mt-4">
            <div
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              @click.stop="toggleChild(index, childIndex)"
              class="flex flex-col hover:cursor-pointer"
            >
              <div class="flex items-center justify-between">
                <h5 class="pl-2 md:pl-4 font-medium">{{ child.title }}</h5>
                <svg
                  :class="{ 'rotate-180': items[index].children[childIndex].open }"
                  class="w-3 h-3 transition-transform"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </div>

              <div class="w-[90%} h-0.5 ml-4 bg-offWhite"></div>
              <transition name="slide-down">
                <p v-if="items[index].children[childIndex].open" class="pl-4 lg:pl-8 mt-2">
                  {{ child.content }}
                </p>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </BaseWrapper>
</template>

<script setup>
import { reactive } from 'vue'

const accordionData = [
  {
    title: 'Booking Process',
    children: [
      {
        title: 'Can I book a vehicle directly through the website?',
        content:
          'Yes, you can easily book any of our vehicles through our website. The process is streamlined and involves selecting your preferred pick-up location, pick-up and drop-off dates, and then choosing a vehicle. If desired, you can also add extra options before completing the payment.'
      },
      {
        title: 'What information do I need to provide to make a booking?',
        content:
          "You'll need to provide your contact details, pick-up and drop-off dates and locations, and payment information. You will also choose your preferred vehicle and any additional options before finalizing the booking."
      }
    ]
  },
  {
    title: 'Pricing',
    children: [
      {
        title: 'Are there any hidden fees that I should be aware of?',
        content:
          'No, we pride ourselves on transparency. All fees and charges are clearly outlined during the booking process.'
      },
      {
        title: 'What forms of payment do you accept?',
        content:
          'We accept all major credit cards, including Visa, MasterCard, and American Express.'
      },
      {
        title: 'Do you offer any discounts or promotional offers?',
        content:
          'Yes, we frequently offer discounts for early bookings, long-term rentals, and special promotional events. Please check our website for the latest offers.'
      }
    ]
  },
  {
    title: 'Vehicles',
    children: [
      {
        title: 'What types of vehicles are available for rent?',
        content:
          'We offer a wide range of vehicles including economy vehicles, SUVS, luxurious vehicles to meet diverse needs and preferences.'
      },
      {
        title: 'Are all your vehicles non-smoking?',
        content:
          'Yes, all our vehicles are non-smoking to ensure the best experience for all customers.'
      },
      {
        title: 'How are your vehicles maintained?',
        content:
          'Our vehicles are meticulously maintained and serviced regularly by certified mechanics to ensure safety and reliability.'
      }
    ]
  }
]

const items = reactive(
  accordionData.map((item) => ({
    open: false,
    children: item.children.map(() => ({ open: false }))
  }))
)

const toggleItem = (index) => {
  items[index].open = !items[index].open
}

const toggleChild = (itemIndex, childIndex) => {
  items[itemIndex].children[childIndex].open = !items[itemIndex].children[childIndex].open
}
</script>

<style scoped>
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-enter-active {
  transition: all 0.4s ease-out;
}

.slide-down-enter-to,
.slide-down-leave-leave {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-active {
  transition: all 0.2s ease-in;
}
</style>
