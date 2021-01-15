import React from "react";
import "./App.css";
import { routes, getAirlineById, getAirportByCode } from "./data";
import Table from "./components/Table";

// const routes = [
//   { airline: 24, src: "DFW", dest: "XNA" },
//   { airline: 24, src: "DFW", dest: "FWA" },
//   { airline: 24, src: "TYS", dest: "LGA" },
// ]

const App = () => {
  function formatValue(property, value) {
    if (property === "airline") {
      const formattedValue = getAirlineById(value);
      if (formattedValue) return formattedValue[0].name;
    }

    if (property === "src" || property === "dest") {
      const formattedValue = getAirportByCode(value);
      if (formattedValue) return formattedValue[0].name;
    }

    return value;
  }

  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>Welcome to the app!</p>
        <Table columns={columns} rows={routes} format={formatValue} />
      </section>
    </div>
  );
};

export default App;
