import { useState } from "react";

const Pagination = ({ totalPage, getPageNumber }) => {
  const [pageActive, setPageActive] = useState(1);

  const handleSelectPage = (pageNumber) => {
    if (pageNumber !== pageActive) {
      setPageActive(pageNumber);
      getPageNumber(pageNumber);
    }
  };

  const handlePrevPage = () => {
    if (pageActive > 1) {
      const newPageActive = pageActive - 1;
      setPageActive(newPageActive);
      getPageNumber(newPageActive);
    }
  };

  const handleNextPage = () => {
    if (pageActive < totalPage) {
      const newPageActive = pageActive + 1;
      setPageActive(newPageActive);
      getPageNumber(newPageActive);
    }
  };

  return (
    <>
      <span
        className={`mx-1 ${pageActive > 1 ? "cursor-pointer" : "cursor-default opacity-40"} border border-primary px-2 py-1`}
        onClick={handlePrevPage}
      >
        &lt;
      </span>
      {[...Array(totalPage)].map((item, index) => {
        const pageNumber = index + 1;
        return (
          <span
            className={`mx-1 cursor-pointer border border-primary px-2 py-1 ${pageActive === pageNumber && "bg-primary text-white"}`}
            key={index}
            onClick={() => handleSelectPage(pageNumber)}
          >
            {pageNumber}
          </span>
        );
      })}
      <span
        className={`mx-1 ${pageActive !== totalPage ? "cursor-pointer" : "cursor-default opacity-40"} border border-primary px-2 py-1`}
        onClick={handleNextPage}
      >
        &gt;
      </span>
    </>
  );
};

export default Pagination;
