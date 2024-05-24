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

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Số lượng trang lân cận hiện tại hiển thị
    const halfPagesToShow = Math.floor(maxPagesToShow / 2); //Đây là một biến trung gian để tính toán khoảng cách từ trang hiện tại đến các trang lân cận.

    // Luôn hiển thị trang đầu tiên
    pages.push(
      <span
        className={`mx-1 cursor-pointer border border-primary px-2 py-1 ${pageActive === 1 && "bg-primary text-white"}`}
        key={1}
        onClick={() => handleSelectPage(1)}
      >
        1
      </span>,
    );

    // Hiển thị dấu chấm lửng nếu cần
    if (pageActive > halfPagesToShow + 2) {
      pages.push(
        <span className="mx-1 px-2 py-1" key="ellipsis1">
          ...
        </span>,
      );
    }
    // Tính toán các trang lân cận cần hiển thị
    const startPage = Math.max(2, pageActive - halfPagesToShow);
    const endPage = Math.min(totalPage - 1, pageActive + halfPagesToShow);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          className={`mx-1 cursor-pointer border border-primary px-2 py-1 ${pageActive === i && "bg-primary text-white"}`}
          key={i}
          onClick={() => handleSelectPage(i)}
        >
          {i}
        </span>,
      );
    }

    // Hiển thị dấu chấm lửng nếu cần
    if (pageActive < totalPage - halfPagesToShow - 1) {
      pages.push(
        <span className="mx-1 px-2 py-1" key="ellipsis2">
          ...
        </span>,
      );
    }

    // Luôn hiển thị trang cuối cùng
    if (totalPage > 1) {
      pages.push(
        <span
          className={`mx-1 cursor-pointer border border-primary px-2 py-1 ${pageActive === totalPage && "bg-primary text-white"}`}
          key={totalPage}
          onClick={() => handleSelectPage(totalPage)}
        >
          {totalPage}
        </span>,
      );
    }

    return pages;
  };

  return (
    <>
      <span
        className={`mx-1 ${pageActive > 1 ? "cursor-pointer" : "cursor-default opacity-40"} border border-primary px-2 py-1`}
        onClick={handlePrevPage}
      >
        &lt;
      </span>
      {renderPageNumbers()}
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
