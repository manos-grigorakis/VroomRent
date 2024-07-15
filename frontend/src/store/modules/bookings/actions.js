import axios from 'axios'

export default {
  // Fetches vehicles based on the selected id
  async fetchSelectedVehicle({ state, commit }) {
    try {
      const vehicleId = state.vehicleId
      const response = await axios.get(`http://localhost:3000/api/vehicle/${vehicleId}`)
      commit('setSelectedVehicle', response.data)
    } catch (error) {
      console.error('Error fetching vehicle:', error)
      throw error
    }
  },
  // Fetches all extra
  async fetchBookingExtras({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/api/bookingExtras')
      commit('setBookingExtras', response.data)
    } catch (error) {
      console.error('Error fetching booking extras: ', error)
      throw error
    }
  },

  // Billing
  updateField({ commit }, { field, value }) {
    commit('UPDATE_FIELD', { field, value })
  }

  // async createBooking({ state, getters }) {
  //   const bookingData = {
  //     firstName: state.billingFormData.firstName,
  //     lastName: state.billingFormData.lastName,
  //     email: state.billingFormData.email,
  //     phoneNumber: state.billingFormData.phoneNumber,
  //     total: getters.calculateTotalPrice,
  //     billingDetails: {
  //       address: state.billingFormData.address,
  //       country: state.billingFormData.country,
  //       city: state.billingFormData.city,
  //       zipCode: state.billingFormData.postalCode
  //     },
  //     bookDetails: {
  //       pickupLocation: state.pickupLocation,
  //       pickupDate: state.pickupDate,
  //       dropoffDate: state.dropoffDate
  //     },
  //     stripeTranscactionId: 'temp-id',
  //     vehicleId: state.vehicleId
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:3000/api/create-booking', bookingData)
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error('Error posting booking data to database', error)
  //     throw error
  //   }
  // }
}
