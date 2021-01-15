import React, { useState } from "react";

export default function Table({ columns, rows, format }) {
  const currentRows = [];
  const [startIdx, setStartIdx] = useState(0);
  const increaseIdx = () => setStartIdx((startIdx) => startIdx + 25);
  const decreaseIdx = () => setStartIdx((startIdx) => startIdx - 25);

  if (rows) {
    for (let i = startIdx; i < startIdx + 25; i++) {
      const row = rows[i];
      const data = [];
      for (const prop in row) {
        data.push({
          key: prop,
          value: row[prop],
        });
      }

      currentRows.push(
        <tr key={Math.random()}>
          <td>{i}</td>
          {data.map(({ key, value }) => (
            <td key={Math.random()}>{format(key, value)}</td>
          ))}
        </tr>
      );
    }
  }

  return (
    <>
      <table className="routes-table">
        <thead>
          <tr>
            <th>idx</th>
            {columns &&
              columns.map((column) => (
                <th key={Math.random()}>{column.name}</th>
              ))}
          </tr>
        </thead>
        <tbody>{currentRows && currentRows.map((row) => row)}</tbody>
      </table>
      <p>
        Showing {startIdx + 1}-{startIdx + 25} of {rows.length} routes.
      </p>
      <button onClick={decreaseIdx} disabled={startIdx === 0}>
        Previous Page
      </button>
      <button onClick={increaseIdx} disabled={startIdx === rows.length - 25}>
        Next Page
      </button>
    </>
  );
}
