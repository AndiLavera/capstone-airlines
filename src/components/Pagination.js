import React from "react";

export default function Pagination({ state, setState }) {
  const { page, routes } = state;

  const increaseIdx = () => setState(page + 1);
  const decreaseIdx = () => setState(page - 1);
  const startRouteIdx = 25 * (page - 1) + 1;
  const endRouteIdx = routes.length >= 25 ? page * 25 : routes.length;
  const isFirstPage = page === 1;
  const isLastPage = page >= routes.length / 25;

  return (
    <div className="pagination">
      <p>
        Showing {startRouteIdx}-{endRouteIdx} of {routes.length} routes.
      </p>

      <p>
        <button onClick={decreaseIdx} disabled={isFirstPage}>
          Previous Page
        </button>
        <button onClick={increaseIdx} disabled={isLastPage}>
          Next Page
        </button>
      </p>
    </div>
  );
}
