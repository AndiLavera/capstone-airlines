import React, { useState } from "react";
import "./App.css";
import { routes, airports, airlines } from "./data";
import utils from "./utils";
import Table from "./components/Table";
import Select from "./components/Select";
import Pagination from "./components/Pagination";

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
    page: 1,
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
        page: 1,
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
      page: 1,
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
        page: 1,
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
      page: 1,
      airport,
      routes: routesToSet,
    });
  };

  const handleReset = () => {
    setState({
      routes,
      page: 1,
      airport: "All Airports",
      airline: "All Airlines",
    });
  };

  const handlePagination = (page) => {
    setState({
      ...state,
      page,
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
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
        </p>
        <div>
          <Table
            columns={columns}
            rows={state.routes}
            format={utils.formatValue}
            page={state.page}
          />

          <Pagination state={state} setState={handlePagination} />
        </div>
      </section>
    </div>
  );
};

export default App;
