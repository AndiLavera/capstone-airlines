import React, { useState } from "react";
import "./App.css";
import { routes, airports, airlines, getAirportByCode } from "./data";
import utils from "./utils";
import Table from "./components/Table";
import Select from "./components/Select";

// TODO:
// Pagination bug:
// - If you are on page 2 and select something that has
//   less than 25, you will stay on page 2.

// These do not need to be reinitialized during each rerender
const airlineNames = airlines.map(({ name }) => name);
const airportNames = (function () {
  const names = new Set();
  airports.map(({ name }) => names.add(name));
  return [...names].sort();
})();

const columns = [
  { name: "Airline", property: "airline" },
  { name: "Source Airport", property: "src" },
  { name: "Destination Airport", property: "dest" },
];

const App = () => {
  const [state, setState] = useState({
    routes,
    airport: "All Airports",
    airline: "All Airlines",
  });

  const handleAirlines = (value) => {
    if (value === "All Airlines") {
      const routesToSet = routes.filter((route) => {
        if (utils.isActiveRouteByAirport(route, state.airport)) {
          return route;
        }
      });

      return setState({
        ...state,
        routes: routesToSet,
        airline: "All Airlines",
      });
    }

    let airline;
    for (const al of airlines) {
      if (al.name === value) {
        airline = al;
        break;
      }
    }

    const routesToSet = routes.filter((route) => {
      if (
        utils.isActiveRouteByAirline(route, airline) &&
        utils.isActiveRouteByAirport(route, state.airport)
      ) {
        return route;
      }
    });

    setState({
      ...state,
      airline,
      routes: routesToSet,
    });
  };

  const handleAirports = (value) => {
    if (value === "All Airports") {
      const routesToSet = routes.filter((route) => {
        if (utils.isActiveRouteByAirline(route, state.airline)) {
          return route;
        }
      });

      return setState({
        ...state,
        routes: routesToSet,
        airport: "All Airports",
      });
    }

    let airport;
    for (const ap of airports) {
      if (ap.name === value) {
        airport = ap;
        break;
      }
    }

    const routesToSet = routes.filter((route) => {
      if (
        utils.isActiveRouteByAirline(route, state.airline) &&
        utils.isActiveRouteByAirport(route, airport)
      ) {
        return route;
      }
    });

    setState({
      ...state,
      airport,
      routes: routesToSet,
    });
  };

  const handleReset = () => {
    setState({
      routes,
      airport: "All Airports",
      airline: "All Airlines",
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <div>
          Show routes on
          <Select
            options={airlineNames}
            onSelect={handleAirlines}
            allTitle="All Airlines"
            value={
              state.airline === "All Airlines"
                ? "All Airlines"
                : state.airline.name
            }
            state={state}
          />
          flying in or out of
          <Select
            options={airportNames}
            onSelect={handleAirports}
            allTitle="All Airports"
            value={
              state.airport === "All Airports"
                ? "All Airports"
                : state.airport.name
            }
            state={state}
          />
          <button onClick={handleReset}>Show All Routes</button>
        </div>
        <Table
          columns={columns}
          rows={state.routes}
          format={utils.formatValue}
        />
      </section>
    </div>
  );
};

export default App;
