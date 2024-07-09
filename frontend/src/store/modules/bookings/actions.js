import axios from 'axios'

export default {
  async fetchSelectedVehicle({ state, commit }) {
    try {
      const vehicleId = state.vehicleId
      const response = await axios.get(`http://localhost:3000/vehicle/${vehicleId}`)
      commit('setSelectedVehicle', response.data)
    } catch (error) {
      console.error('Error fetching vehicle:', error)
      throw error
    }
  }
}
