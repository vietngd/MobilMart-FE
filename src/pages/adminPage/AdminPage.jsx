import { useState } from "react";
import { MdSmartphone } from "react-icons/md";
import { Menu } from "antd";
import { FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { TfiLayoutSlider } from "react-icons/tfi";

import { getItem } from "../../ultils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "./components/AdminUser/AdminUser";
import AdminProduct from "./components/AdminProduct/AdminProduct";
import AdminOrder from "./components/AdminOrder/AdminOrder";
import AdminSlider from "./components/AdminSlider/AdminSlider";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

const items = [
  getItem("Trang chủ", "dashboard", <FaHome />),
  getItem("Tài khoản", "user", <FaUser />),
  getItem("Sản phẩm", "product", <MdSmartphone />),
  getItem("Đơn hàng", "order", <FaShoppingCart />),
  getItem("Slider", "slider", <TfiLayoutSlider />),
];

const renderContent = (key) => {
  switch (key) {
    case "dashboard":
      return <AdminDashboard />;
    case "user":
      return <AdminUser />;
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
        <div className="w-[256px]">
          <Menu
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            style={{
              width: 256,
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
