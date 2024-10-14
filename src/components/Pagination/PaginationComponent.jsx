import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center space-x-1">
          <li>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-deepBlue text-white hover:bg-skyBlue'}`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
            <li key={number}>
              <button
                onClick={() => onPageChange(number)}
                className={`px-3 py-1 rounded-lg ${currentPage === number ? 'bg-deepBlue text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-deepBlue text-white hover:bg-skyBlue'}`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComponent;
