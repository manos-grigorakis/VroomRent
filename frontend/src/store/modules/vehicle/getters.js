export default {
  allVehicles: (state) => state.vehicles,
  filteredVehicles: (state) => {
    let vehicles = state.vehicles

    if (state.filters.category) {
      vehicles = vehicles.filter((vehicle) =>
        vehicle.category.some((category) => category.toLowerCase() === state.filters.category)
      )
    }

    if (state.filters.transmission) {
      vehicles = vehicles.filter(
        (vehicle) => vehicle.details.transmission.toLowerCase() === state.filters.transmission
      )
    }

    if (state.filters.fuel) {
      vehicles = vehicles.filter(
        (vehicle) => vehicle.details.fuel.toLowerCase() === state.filters.fuel
      )
    }

    if (state.filters.sortOrder) {
      vehicles = vehicles.sort((a, b) => {
        if (state.filters.sortOrder === 'ascending') {
          return a.price - b.price
        } else if (state.filters.sortOrder === 'descending') {
          return b.price - a.price
        }
        return 0
      })
    }

    return vehicles
  }
}
