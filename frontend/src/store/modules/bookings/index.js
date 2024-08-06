import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      pickupFormDetails: {
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        dropoffDate: ''
      },
      vehicleId: '',
      selectedVehicle: {
        name: '',
        image: '',
        category: [''],
        price: 0,
        details: {
          passengers: 0,
          transmission: '',
          fuel: '',
          storage: {
            bigCase: 0,
            smallCase: 0
          }
        }
      },
      bookingExtras: [],
      selectedExtras: [],
      fuelExtraCharge: null,
      childSeatExtra: null,
      childSeatCount: 0,
      total: 0,
      billingFormData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        country: '',
        city: '',
        postalCode: ''
      }
    }
  },
  mutations,
  actions,
  getters
}
