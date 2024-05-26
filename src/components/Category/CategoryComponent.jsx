import { IoPhonePortraitOutline, IoLaptopOutline } from "react-icons/io5";
import { SiSamsung, SiXiaomi } from "react-icons/si";
import { AiFillAppstore } from "react-icons/ai";
import { GiVibratingSmartphone } from "react-icons/gi";
import { FaRegMoneyBill1, FaApple } from "react-icons/fa6";
import CategoryItem from "./CategoryItem";
import { useSelector } from "react-redux";

const Icons = [
  {
    Name: "Iphone",
    Icon: SiSamsung,
  },
  {
    Name: "Samsung",
    Icon: FaApple,
  },
  {
    Name: "Xiaomi",
    Icon: SiXiaomi,
  },
  {
    Name: "Realme",
    Icon: IoLaptopOutline,
  },
];

const CategoryComponent = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <>
      <ul className="shawdow-custom mb-2 hidden overflow-hidden rounded-xl sm:flex">
        <CategoryItem
          name="Điện thoại"
          Icon={IoPhonePortraitOutline}
          isActive={true}
        />
        {categories &&
          categories.map((item, index) => (
            <CategoryItem
              name={item.name}
              Icon={Icons[index]?.Icon || IoPhonePortraitOutline}
              key={index}
              id={item.id}
            />
          ))}

        <CategoryItem name="Bảo hành" Icon={AiFillAppstore} />
        <CategoryItem name="Liên hệ" Icon={GiVibratingSmartphone} />
        <CategoryItem name="Thu cũ" Icon={FaRegMoneyBill1} />
      </ul>
    </>
  );
};
export default CategoryComponent;
