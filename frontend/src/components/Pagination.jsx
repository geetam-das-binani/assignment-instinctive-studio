import React from "react";

const Pagination = ({ totalPages, currentPage, setPage }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      {new Array(totalPages).fill(0).map((_, index) => {
        return (
          <button
            key={index}
            className={`mx-2 px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? `bg-blue-500 text-white`
                : `bg-gray-200 text-gray-700`
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
