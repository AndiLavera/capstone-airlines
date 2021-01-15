import { getAirlineById, getAirportByCode } from "./data";

export default {
  formatValue(property, value) {
    if (property === "airline") {
      const formattedValue = getAirlineById(value);
      if (formattedValue) return formattedValue[0].name;
    }

    if (property === "src" || property === "dest") {
      const formattedValue = getAirportByCode(value);
      if (formattedValue) return formattedValue[0].name;
    }

    return value;
  },
  isActiveRouteByAirport(route, airport) {
    if (airport === "All Airports") return true;

    const srcAirport = getAirportByCode(route.src)[0];
    const destAirport = getAirportByCode(route.dest)[0];
    if (airport.code === srcAirport.code || airport.code === destAirport.code) {
      return true;
    }

    return false;
  },
  isActiveRouteByAirline(route, airline) {
    if (airline === "All Airlines") return true;

    return route.airline === airline.id;
  },
};
