export default [
  {
    path: '/user',
    component: () => import('@/views/user/UserProfileView.vue'),

    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/components/user/UserProfile.vue')
      },
      {
        path: 'edit-profile',
        name: 'edit-profile',
        component: () => import('@/components/user/UserEditProfile.vue')
      },
      {
        path: 'manage-address',
        name: 'manage-address',
        component: () => import('@/components/user/UsersManageAddress.vue')
      },
      {
        path: 'bookings',
        name: 'bookings',
        component: () => import('@/components/user/UserBookings.vue')
      },
      {
        path: 'booking/:id',
        name: 'booking',
        component: () => import('@/components/user/UserBookingById.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/components/user/UserSettings.vue')
      }
    ]
  }
]
