export default {
  pickupLocation: (state) => state.pickupFormDetails.pickupLocation,
  dropoffLocation: (state) => state.pickupFormDetails.dropoffLocation,
  pickupDate: (state) => state.pickupFormDetails.pickupDate,
  dropoffDate: (state) => state.pickupFormDetails.dropoffDate,
  vehicleId: (state) => state.vehicleId,

  // Calculates number of selected days
  numberOfDays: (state) => {
    if (state.pickupFormDetails.pickupDate && state.pickupFormDetails.dropoffDate) {
      const pickupDate = new Date(state.pickupFormDetails.pickupDate)
      const dropoffDate = new Date(state.pickupFormDetails.dropoffDate)
      const timeDifference = dropoffDate - pickupDate
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) // Convert milliseconds to days
      return Math.max(dayDifference, 1) // Ensure at least 1 day
    }
    return 0
  },

  selectedVehicle: (state) => state.selectedVehicle,
  bookingExtras: (state) => state.bookingExtras,
  selectedExtras: (state) => state.selectedExtras,
  fuelExtraCharge: (state) => state.fuelExtraCharge,
  childSeatCount: (state) => state.childSeatCount,
  childSeatExtra: (state) => state.childSeatExtra,

  // Calculates final price of booking
  calculateTotalPrice: (state, getters) => {
    const numberOfDays = getters.numberOfDays
    const vehiclePrice = state.selectedVehicle.price * numberOfDays

    const extrasPrice = state.selectedExtras.reduce((total, extra) => {
      if (extra.title === 'Child Safety Seats') {
        return total
      }
      return total + extra.price * numberOfDays
    }, 0)

    const fuelCharge = state.fuelExtraCharge.reduce((total, extra) => total + extra.price, 0)

    // Calculates the total of the child seats
    const childSeatCharge = state.childSeatExtra
      ? state.childSeatExtra.price * state.childSeatCount * numberOfDays
      : 0

    const totalPrice = (vehiclePrice + extrasPrice + fuelCharge + childSeatCharge).toFixed(2)
    return totalPrice
  },

  billingFormData: (state) => state.billingFormData
}
