import { IoPhonePortraitOutline, IoLaptopOutline } from "react-icons/io5";
import { SiSamsung, SiXiaomi } from "react-icons/si";

import { BsSmartwatch } from "react-icons/bs";
import { GiVibratingSmartphone } from "react-icons/gi";
import { FaRegMoneyBill1, FaApple } from "react-icons/fa6";
import CategoryItem from "./CategoryItem";

const CategoryData = [
  {
    Name: "Điện thoại",
    Icon: IoPhonePortraitOutline,
    isActive: true,
  },
  {
    Name: "Iphone",
    Icon: FaApple,
  },
  {
    Name: "Samsung",
    Icon: SiSamsung,
  },
  {
    Name: "Xiaomi",
    Icon: SiXiaomi,
  },
  {
    Name: "Realme",
    Icon: IoLaptopOutline,
  },
  {
    Name: "Bảo hành",
    Icon: BsSmartwatch,
  },
  {
    Name: "Liên hệ",
    Icon: GiVibratingSmartphone,
  },
  {
    Name: "Thu cũ",
    Icon: FaRegMoneyBill1,
  },
];

const CategoryComponent = () => {
  return (
    <ul className="shawdow-custom mb-2 flex overflow-hidden rounded-xl">
      {CategoryData.map((item, index) => (
        <CategoryItem
          name={item.Name}
          icon={item.Icon}
          isActive={item.isActive}
          key={index}
        />
      ))}
    </ul>
  );
};
export default CategoryComponent;
