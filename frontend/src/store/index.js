import { createStore } from 'vuex'
import axios from 'axios'

import vehicleModule from './modules/vehicle'
import bookingsModule from './modules/bookings'
import usersModule from './modules/users'

const store = createStore({
  modules: {
    vehicles: vehicleModule,
    bookings: bookingsModule,
    users: usersModule
  },
  state: {
    user: null,
    firstName: '',
    lastName: '',
    email: '',
    isLoggedIn: false
  },
  mutations: {
    setUserData(state, payload) {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.email = payload.email
    },
    setLoginStatus(state, status) {
      state.isLoggedIn = status
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async registerUser({ state, dispatch }, payload) {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: payload.password // passing password with payload, so we dont have to save it in our state
        })

        // sends an email after user registered
        await dispatch('sendRegistrationEmail')

        // Returns user's id
        return response.data.user._id
      } catch (error) {
        // If email already exists in the database
        if (error.response && error.response.status === 409) {
          throw new Error('Email already exists')
        }
        console.error('Error during registration:', error)
        throw error
      }
    },
    async loginUser({ commit }, payload) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: payload.email,
          password: payload.password
        })

        commit('setLoginStatus', true)

        // Creates a session for the user
        sessionStorage.setItem('user', response.data.user._id)
      } catch (error) {
        console.log('Error during login: ', error)
        throw error
      }
    },

    async sendRegistrationEmail({ getters }) {
      const firstName = getters.firstName
      const lastName = getters.lastName
      const email = getters.email

      try {
        const response = await axios.post('http://localhost:3000/auth/registration-email', {
          firstName: firstName,
          lastName: lastName,
          email: email
        })
        console.log(response.data)
      } catch (error) {
        console.error(error.message)
      }
    },

    async fetchUser({ commit }) {
      const userId = sessionStorage.getItem('user')

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/user/profile/${userId}`)
          commit('setUser', response.data)
        } catch (error) {
          console.error('Error fetching user data', error)
        }
      }
    }
  },
  getters: {
    firstName: (state) => state.firstName,
    lastName: (state) => state.lastName,
    email: (state) => state.email,
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user
  }
})

export default store
