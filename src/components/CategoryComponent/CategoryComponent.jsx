import { IoPhonePortraitOutline, IoLaptopOutline } from "react-icons/io5";
import { SiSamsung } from "react-icons/si";
import { AiOutlineTablet } from "react-icons/ai";
import { BsSmartwatch } from "react-icons/bs";
import { GiVibratingSmartphone, GiAutoRepair } from "react-icons/gi";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { SlEarphones } from "react-icons/sl";
import CategoryItem from "./CategoryItem";

const CategoryData = [
  {
    Name: "Điện thoại",
    Icon: IoPhonePortraitOutline,
    isActive: true,
  },
  {
    Name: "Iphone",
    Icon: IoPhonePortraitOutline,
  },
  {
    Name: "Samsung",
    Icon: SiSamsung,
  },
  {
    Name: "Tablet",
    Icon: AiOutlineTablet,
  },
  {
    Name: "Laptop",
    Icon: IoLaptopOutline,
  },
  {
    Name: "Đồng hồ",
    Icon: BsSmartwatch,
  },
  {
    Name: "Hàng cũ",
    Icon: GiVibratingSmartphone,
  },
  {
    Name: "Thu cũ",
    Icon: FaRegMoneyBill1,
  },
  {
    Name: "Phụ kiện",
    Icon: SlEarphones,
  },
  {
    Name: "Âm thanh",
    Icon: GiAutoRepair,
  },
];

const CategoryComponent = () => {
  return (
    <div className="col-span-1">
      <ul className="overflow-hidden rounded-xl shadow-md">
        {CategoryData.map((item, index) => (
          <CategoryItem
            name={item.Name}
            icon={item.Icon}
            isActive={item.isActive}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};
export default CategoryComponent;
