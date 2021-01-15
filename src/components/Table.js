import React from "react";

export default function Table({ columns, rows, format, page }) {
  const currentRows = [];

  if (rows) {
    for (let i = 25 * (page - 1); i < page * 25; i++) {
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
            {columns &&
              columns.map((column) => (
                <th key={Math.random()}>{column.name}</th>
              ))}
          </tr>
        </thead>
        <tbody>{currentRows && currentRows.map((row) => row)}</tbody>
      </table>
    </>
  );
}
