import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return {
      vehicles: [],
      filters: {
        category: '',
        transmission: '',
        fuel: '',
        sortOrder: ''
      }
    }
  },
  mutations,
  actions,
  getters
}
