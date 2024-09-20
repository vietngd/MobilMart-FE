import clsx from "clsx";
import React from "react";

const BasicButton = ({
  type = "primary",
  onClick,
  isCustom,
  children, // Xóa type annotation cho children
}) => {
  const renderClassByType = () => {
    switch (type) {
      case "secondary":
        return "text-[#FFF] bg-[#6C757D] hover:bg-[#5A6268]";

      case "danger":
        return "text-[#FFF] bg-[#ED1F42] hover:bg-[#C82333]";

      case "warning":
        return "text-[#000] bg-[#FFC107] hover:bg-[#D39E00]";

      case "info":
        return "text-[#FFF] bg-[#17A2B8] hover:bg-[#138496]";

      default:
        return "text-[#FFF] bg-[#007BFF] hover:bg-[#0056b3]";
    }
  };

  return (
    <button
      className={clsx(
        renderClassByType(),
        "rounded-md px-4 py-2 focus:outline-none",
        isCustom ? "font-inter-500 text-[14px]" : "text-[14px]",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BasicButton;
