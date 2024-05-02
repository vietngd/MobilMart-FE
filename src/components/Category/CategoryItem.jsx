// eslint-disable-next-line react/prop-types
const CategoryItem = ({ name, icon: Icon, isActive }) => {
  return (
    <li className="relative flex flex-1 cursor-pointer items-center gap-x-4 p-3 hover:bg-category_hover hover:text-primary">
      <Icon className="text-2xl text-primary" />
      <span className={isActive ? "text-primary" : ""}>{name}</span>
    </li>
  );
};

export default CategoryItem;
