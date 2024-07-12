import axios from 'axios'

export default {
  // Fetches vehicles based on the selected id
  async fetchSelectedVehicle({ state, commit }) {
    try {
      const vehicleId = state.vehicleId
      const response = await axios.get(`http://localhost:3000/vehicle/${vehicleId}`)
      commit('setSelectedVehicle', response.data)
    } catch (error) {
      console.error('Error fetching vehicle:', error)
      throw error
    }
  },
  // Fetches all extra
  async fetchBookingExtras({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/bookingExtras')
      commit('setBookingExtras', response.data)
    } catch (error) {
      console.error('Error fetching booking extras: ', error)
      throw error
    }
  }
}
