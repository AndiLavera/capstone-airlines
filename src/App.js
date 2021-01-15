import React from "react";
import "./App.css";
import { routes, getAirlineById } from "./data";
import Table from "./components/Table";

// const routes = [
//   { airline: 24, src: "DFW", dest: "XNA" },
//   { airline: 24, src: "DFW", dest: "FWA" },
//   { airline: 24, src: "TYS", dest: "LGA" },
// ]

const App = () => {
  function formatValue(property, value) {
    // if (property === "airline") {
    //   return getAirlineById(value);
    // }

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
        <Table
          className="routes-table"
          columns={columns}
          rows={routes}
          format={formatValue}
        />
      </section>
    </div>
  );
};

export default App;
