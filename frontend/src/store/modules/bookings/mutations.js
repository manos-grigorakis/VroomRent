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

  setSelectedVehicle(state, payload) {
    state.selectedVehicle = payload
  },

  setBookingExtras(state, payload) {
    state.bookingExtras = payload
  },

  // Toggles extras
  toggleExtra(state, extra) {
    if (extra.title === 'Prepaid Fuel') {
      if (state.fuelExtraCharge && state.fuelExtraCharge._id === extra._id) {
        state.fuelExtraCharge = extra
      } else {
        state.fuelExtraCharge = null
      }
    } else {
      const index = state.selectedExtras.findIndex((e) => e._id === extra._id)
      if (index === -1) {
        state.selectedExtras.push(extra)
      } else {
        state.selectedExtras.splice(index, 1)
      }
    }
  },

  setFuelExtraCharge(state, extra) {
    state.fuelExtraCharge = extra || null
  },

  setChildSeatCount(state, count) {
    state.childSeatCount = count
  },

  setChildSeatExtra(state, extra) {
    state.childSeatExtra = extra
  },

  // Billing form
  UPDATE_FIELD(state, { field, value }) {
    state.billingFormData[field] = value
  }
}
