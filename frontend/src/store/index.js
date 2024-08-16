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
    },
    updateUserProfile(state, updatedProfile) {
      state.firstName = updatedProfile.firstName
      state.lastName = updatedProfile.lastName
      state.email = updatedProfile.email
      if (state.user) {
        state.user.firstName = updatedProfile.firstName
        state.user.lastName = updatedProfile.lastName
        state.user.email = updatedProfile.email
      }
    },
    updateUserAvatar(state, avatar) {
      if (state.user) {
        state.user.avatar = avatar
      }
    }
  },
  actions: {
    async registerUser({ state, dispatch }, payload) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: payload.password // passing password with payload, instead of saving it in state
        })

        // sends an email after user registered
        await dispatch('sendRegistrationEmail')

        // Returns user's id
        return response.data.user._id
      } catch (error) {
        // If email already exists in the database
        if (error.response && error.response.status === 409) {
          throw new Error(error.response.data.message)
        }
        console.error('An unexpected error occurred: ', error)
        throw new Error('An unexpected error occurred')
      }
    },
    async loginUser({ commit }, payload) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          email: payload.email,
          password: payload.password
        })

        commit('setLoginStatus', true)

        // Creates a session for the user by only saving the user id
        sessionStorage.setItem('user', response.data.user._id)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error(error.response.data.message)
        } else if (error.response && error.response.status === 400) {
          throw new Error(error.response.data.message)
        }
        console.error('An unexpected error occurred: ', error)
        throw new Error('An unexpected error occurred')
      }
    },

    async sendRegistrationEmail({ getters }) {
      const firstName = getters.firstName
      const lastName = getters.lastName
      const email = getters.email

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/registration-email`,
          {
            firstName: firstName,
            lastName: lastName,
            email: email
          }
        )
        console.log(response.data)
      } catch (error) {
        console.error(error.message)
      }
    },
    // Fetches user data based on userId which is being retrieved from the session that has been created,
    // through log in
    async fetchUser({ commit }) {
      const userId = sessionStorage.getItem('user')

      if (userId) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile/${userId}`)
          commit('setUser', response.data)
        } catch (error) {
          console.error('Error fetching user data', error)
        }
      }
    },
    // Updates user profile when there are changes
    async updateProfile({ commit }, updatedProfile) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/user/profile/${updatedProfile._id}`, {
          firstName: updatedProfile.firstName,
          lastName: updatedProfile.lastName,
          email: updatedProfile.email
        })

        // Updates stores with the latest data
        commit('updateUserProfile', updatedProfile)
      } catch (error) {
        console.error('Error updating profile changes', error)
        throw new Error('Error updating profile changes')
      }
    },
    async uploadAvatar({ commit }, formData) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/profile/upload-avatar`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        const avatar = response.data.avatar
        commit('updateUserAvatar', avatar)
      } catch (error) {
        console.error('Error uploading user avatar', error)
        throw new Error('Error uploading user avatar')
      }
    },
    async deleteUser({ commit }, userId) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/user/profile/${userId}`)
        sessionStorage.removeItem('user')

        commit('setUser', null)
        commit('setLoginStatus', false)
      } catch (error) {
        console.error('Error deleting user account', error)
        throw new Error('Error deleting user account')
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
