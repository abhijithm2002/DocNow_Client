import { Pagination } from "@nextui-org/react";
import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        isCompact
        showControls
        total={totalPages}
        initialPage={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationComponent;
