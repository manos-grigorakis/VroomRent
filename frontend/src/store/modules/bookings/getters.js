export default {
  // Returns pickupLocation formated
  pickupLocation: (state) => {
    const location = state.pickupFormDetails.pickupLocation
    return location ? `${location.iso_country}, ${location.name}, ${location.municipality}` : ''
  },
  // Returns dropoffLocation formated
  dropoffLocation: (state) => {
    const location = state.pickupFormDetails.dropoffLocation
    return location ? `${location.iso_country}, ${location.name}, ${location.municipality}` : ''
  },

  // Returns values of state
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

  // Returns values of state
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

    // old
    // const fuelCharge = state.fuelExtraCharge.reduce((total, extra) => total + extra.price, 0)

    // new
    const fuelCharge = state.fuelExtraCharge ? state.fuelExtraCharge.price : 0

    // Calculates the total of the child seats
    const childSeatCharge = state.childSeatExtra
      ? state.childSeatExtra.price * state.childSeatCount * numberOfDays
      : 0

    const totalPrice = (vehiclePrice + extrasPrice + fuelCharge + childSeatCharge).toFixed(2)
    return totalPrice
  },

  // Retrieves all billing data from checkout form
  billingFormData: (state) => state.billingFormData
}
