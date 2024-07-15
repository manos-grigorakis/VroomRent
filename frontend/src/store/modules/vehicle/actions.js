import axios from 'axios'

export default {
  async fetchVehicles({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/api/vehicles')

      commit('setVehicles', response.data)
    } catch (error) {
      console.error('Error fetching data from backend: ', error)
      throw error
    }
  }
}
