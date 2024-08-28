export default {
  setVehicles(state, payload) {
    state.vehicles = payload
  },
  setCategoryFilter(state, payload) {
    state.filters.category = payload
  },
  setTransmissionFilter(state, payload) {
    state.filters.transmission = payload
  },
  setFuelFilter(state, payload) {
    state.filters.fuel = payload
  },
  setSortOrderFilter(state, payload) {
    state.filters.sortOrder = payload
  }
}
