import React from "react";
import { getAirlineByName, getAirportByName } from "../data";

export default function Select({ options, onSelect, allTitle, value, state }) {
  const isDisabled = (name) => {
    let disabled = true;

    if (allTitle === "All Airlines") {
      const airline = getAirlineByName(name);
      state.routes.map((route) => {
        if (route.airline === airline.id) disabled = false;
      });
    }

    if (allTitle === "All Airports") {
      const airport = getAirportByName(name);
      state.routes.map((route) => {
        if (route.src === airport.code || route.dest === airport.code) {
          disabled = false;
        }
      });
    }

    return disabled;
  };

  return (
    <select
      value={value}
      key={allTitle}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value={allTitle}>{allTitle}</option>

      {options.map((name) => (
        <option value={name} key={name} disabled={isDisabled(name)}>
          {name}
        </option>
      ))}
    </select>
  );
}
