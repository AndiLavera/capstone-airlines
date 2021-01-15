import React from "react";

export default function Table({ columns, rows, format }) {
  return (
    <table>
      <thead>
        <tr>
          {columns &&
            columns.map((column) => <th key={Math.random()}>{column.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row) => {
            const data = [];
            for (const prop in row) {
              data.push({
                key: prop,
                value: row[prop],
              });
            }

            return (
              <tr key={Math.random()}>
                {data.map(({ key, value }) => (
                  <td key={Math.random()}>{format(key, value)}</td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
