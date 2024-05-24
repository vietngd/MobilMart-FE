import { useState } from "react";
import { MdSmartphone } from "react-icons/md";
import { Menu } from "antd";
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { TfiLayoutSlider } from "react-icons/tfi";
import { BiSolidCategory } from "react-icons/bi";
import { getItem } from "../../ultils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "./components/AdminUser/AdminUser";
import AdminProduct from "./components/AdminProduct/AdminProduct";
import AdminOrder from "./components/AdminOrder/AdminOrder";
import AdminSlider from "./components/AdminSlider/AdminSlider";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminCategory from "./components/AdminCategory/AdminCategory";

const items = [
  getItem("Trang chủ", "dashboard", <FaHome />),
  getItem("Quản lý tài khoản", "user", <FaUser />),
  getItem("Danh mục sản phẩm", "category", <BiSolidCategory />),
  getItem("Quản lý sản phẩm", "product", <MdSmartphone />),
  getItem("Quản lý đơn hàng", "order", <FaShoppingCart />),
  getItem("Quản lý slider", "slider", <TfiLayoutSlider />),
];

const renderContent = (key) => {
  switch (key) {
    case "dashboard":
      return <AdminDashboard />;
    case "user":
      return <AdminUser />;
    case "category":
      return <AdminCategory />;
    case "product":
      return <AdminProduct />;
    case "order":
      return <AdminOrder />;
    case "slider":
      return <AdminSlider />;
    default:
      return <></>;
  }
};

const AdminPage = () => {
  const [keyContent, setKeyContent] = useState("dashboard");

  const handleClick = ({ key }) => {
    setKeyContent(key);
  };
  return (
    <>
      <HeaderComponent isHidenSearch isHidenCart />
      <div className="flex ">
        <div className="w-[240px]">
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            style={{
              width: 240,
              height: "100vh",
              paddingTop: "70px",
              position: "fixed",
            }}
            items={items}
            onClick={handleClick}
          />
        </div>
        <div className="flex-1 px-2 pt-[70px]">{renderContent(keyContent)}</div>
      </div>
    </>
  );
};

export default AdminPage;
