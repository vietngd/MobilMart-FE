import { FaAngleRight } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const CategoryItem = ({ name, icon: Icon, isActive }) => {
  return (
    <li className="relative flex cursor-pointer items-center gap-x-2 p-3 hover:bg-category_hover hover:text-primary">
      <Icon className="text-2xl text-primary" />
      <span className={isActive ? "text-primary" : ""}>{name}</span>
      <FaAngleRight className="absolute right-4 top-1/2 -translate-y-1/2 transform text-primary" />
    </li>
  );
};

export default CategoryItem;
