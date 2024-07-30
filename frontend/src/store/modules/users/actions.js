import axios from 'axios'
export default {
  async fetchUserBookings({ commit }) {
    const userId = sessionStorage.getItem('user')

    try {
      const response = await axios.get(`http://localhost:3000/user/bookings/${userId}`)
      commit('setUserBookings', response.data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
