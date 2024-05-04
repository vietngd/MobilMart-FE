import { useNavigate } from "react-router-dom";
import { BsSmartwatch } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const CategoryItem = ({
  name = "Brand",
  Icon = BsSmartwatch,
  isActive,
  id,
}) => {
  const navigate = useNavigate();
  const handleNavigateProductPage = () => {
    id && navigate(`/product/category/${id}`, { state: name });
  };
  return (
    <li
      className="relative flex flex-1 cursor-pointer items-center gap-x-4 p-3 hover:bg-category_hover hover:text-primary"
      onClick={handleNavigateProductPage}
    >
      <Icon className="text-2xl text-primary" />
      <span className={isActive ? "text-primary" : ""}>{name}</span>
    </li>
  );
};

export default CategoryItem;
