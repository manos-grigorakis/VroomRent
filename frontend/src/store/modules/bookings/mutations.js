export default {
  // Updates airport form data in store
  setPickUpForm(state, payload) {
    state.pickupFormDetails.pickupLocation = payload.selectedPickupAirport
    state.pickupFormDetails.dropoffLocation = payload.selectedDropoffAirport
    state.pickupFormDetails.pickupDate = payload.selectedPickupDate
    state.pickupFormDetails.dropoffDate = payload.selectedDropoffDate
  },

  // Updates vehicle id
  setVehicleId(state, id) {
    state.vehicleId = id
  }
}
