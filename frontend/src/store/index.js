import { createStore } from 'vuex'
import axios from 'axios'

import vehicleModule from './modules/vehicle'
import bookingsModule from './modules/bookings'

const store = createStore({
  modules: {
    vehicles: vehicleModule,
    bookings: bookingsModule
  },
  state: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isLoggedIn: false
  },
  mutations: {
    setUserData(state, payload) {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.email = payload.email
      state.password = payload.password
    },
    setUserDataLogin(state, payload) {
      state.email = payload.email
      state.password = payload.password
    },
    setLoginStatus(state, status) {
      state.isLoggedIn = status
    }
  },
  actions: {
    async registerUser({ state }) {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password
        })
        console.log('Response:', response.data)
      } catch (error) {
        console.error('Error during registration:', error)
        throw error
      }
    },
    async loginUser({ commit, state }) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: state.email,
          password: state.password
        })

        commit('setUserDataLogin', response.data.user)
        commit('setLoginStatus', true)
      } catch (error) {
        console.log('Error during login: ', error)
        throw error
      }
    }
  },
  getters: {
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    email: (state) => state.email,
    password: (state) => state.password,
    isLoggedIn: (state) => state.isLoggedIn
  }
})

export default store
