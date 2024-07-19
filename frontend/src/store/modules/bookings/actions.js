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

  // Updates values of fields in checkout form
  updateField({ commit }, { field, value }) {
    commit('UPDATE_FIELD', { field, value })
  },

  async sendReceipt({ getters }) {
    const pickUpLocation = getters.pickupLocation
    const dropoffLocation = getters.dropoffLocation
    const pickupDate = getters.pickupDate
    const dropoffDate = getters.dropoffDate
    const vehicle = getters.selectedVehicle.name
    const total = getters.calculateTotalPrice
    const billingData = getters.billingFormData
    const selectedExtras = getters.selectedExtras
    const childSeatCount = getters.childSeatCount
    const fuelCharge = getters.fuelExtraCharge

    let extrasList = ''

    if (selectedExtras.length > 0) {
      extrasList = selectedExtras
        .map((extra) => {
          let extraDetail = `<li><strong>${extra.title}</strong>`
          if (extra.title === 'Child Safety Seats') {
            extraDetail += ` (${childSeatCount} seats): $${extra.price} / day`
          } else {
            extraDetail += `: $${extra.price}`
          }
          extraDetail += '</li>'
          return extraDetail
        })
        .join('')
    }
    if (fuelCharge.length > 0) {
      fuelCharge.forEach((fuel) => {
        let fuelDetail = `<li><strong>${fuel.title}</strong>: $${fuel.price} / once </li>`
        extrasList += fuelDetail
      })
    }

    try {
      const response = await axios.post('http://localhost:3000/api/send-receipt-email', {
        name: billingData.firstName + ' ' + billingData.lastName,
        email: billingData.email,
        bookingData: {
          vehicle: vehicle,
          pickUpLocation: pickUpLocation,
          dropoffLocation: dropoffLocation,
          pickupDate: pickupDate,
          dropoffDate: dropoffDate,
          total: total,
          selectedExtras: extrasList,
          fuelCharge: fuelCharge
        }
      })
      console.log('Data: ', response.data)
    } catch (error) {
      console.error('Error sending receipt with email', error.message)
    }
  }
}
