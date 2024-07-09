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

  selectedVehicle: (state) => state.selectedVehicle
}
