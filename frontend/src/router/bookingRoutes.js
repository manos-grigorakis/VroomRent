export default [
  {
    path: '/booking',
    component: () => import('@/views/booking/BookingView.vue'),
    children: [
      {
        path: 'choose-vehicle',
        name: 'choose-vehicle',
        component: () => import('@/views/booking/ChooseVehicleView.vue')
      },
      {
        path: 'choose-extras',
        name: 'choose-extras',
        component: () => import('@/views/booking/ChooseExtrasView.vue')
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('@/views/booking/CheckoutView.vue')
      },
      {
        path: 'receipt',
        name: 'receipt',
        component: () => import('@/views/booking/ReceiptView.vue')
      }
    ]
  }
]
