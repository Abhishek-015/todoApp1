import React from "react";

const Pagination = ({ page, setPage, dataSize }) => {
  return (
    <>
      <button
        className="btn btn-outline-secondary sm mx-2"
        onClick={() => page >= 1 && setPage(page - 1)}
        disabled={page === 1}
      >
        <span className="prev">{"<< Prev"}</span>
      </button>
      <button
        className="btn btn-outline-secondary sm mx-2"
        onClick={() => setPage(page + 1)}
        disabled={page>=dataSize}
      >
        <span>{"Next >>"}</span>
      </button>
    </>
  );
};
export default Pagination;
