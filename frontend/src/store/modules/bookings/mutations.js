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
  },

  // Updates pickup date
  setPickupDate(state, date) {
    state.pickupFormDetails.pickupDate = date
  },

  // Updates dropoff date
  setDropoffDate(state, date) {
    state.pickupFormDetails.dropoffDate = date
  },

  setSelectedVehicle(state, payload) {
    state.selectedVehicle = payload
  },

  setBookingExtras(state, payload) {
    state.bookingExtras = payload
  },

  // Toggles extras
  toggleExtra(state, extra) {
    // Search inside the array by id
    const index = state.selectedExtras.findIndex((e) => e._id === extra._id)

    // if findIndex return -1 the item doesn't exist in the array and then add it
    if (index === -1) {
      state.selectedExtras.push(extra)
    } else {
      // otherwise the item already exists and we remove it
      state.selectedExtras.splice(index, 1)
    }
  },

  setFuelExtraCharge(state, extra) {
    const index = state.fuelExtraCharge.findIndex((e) => e._id === extra._id)
    if (index === -1) {
      state.fuelExtraCharge.push(extra)
    } else {
      state.fuelExtraCharge.splice(index, 1)
    }
  },

  setChildSeatCount(state, count) {
    state.childSeatCount = count
  },

  setChildSeatExtra(state, extra) {
    state.childSeatExtra = extra
  }
}
