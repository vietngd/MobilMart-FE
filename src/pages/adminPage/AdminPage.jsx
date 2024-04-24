import { useState } from "react";
// import { AppstoreOutlined } from "@ant-design/icons";
import { MdSmartphone } from "react-icons/md";
import { Menu } from "antd";
import { FaUser } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";
import { getItem } from "../../ultils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "./components/AdminUser/AdminUser";
import AdminProduct from "./components/AdminProduct/AdminProduct";

const items = [
  getItem("Quản lý tài khoản", "user", <FaUser />),
  //   getItem("Quản lý danh mục", "category", <AppstoreOutlined />),
  getItem("Quản lý sản phẩm", "product", <MdSmartphone />),
  //   getItem("Quản lý đơn hàng", "cart", <FaShoppingCart />),
];

const renderContent = (key) => {
  switch (key) {
    case "user":
      return <AdminUser />;
    case "product":
      return <AdminProduct />;
    default:
      return <></>;
  }
};

const AdminPage = () => {
  const [keyContent, setKeyContent] = useState("");

  const handleClick = ({ key }) => {
    setKeyContent(key);
  };
  return (
    <>
      <HeaderComponent isHidenSearch isHidenCart />
      <div className="flex pt-[70px]">
        <Menu
          mode="inline"
          defaultSelectedKeys={["account"]}
          style={{
            width: 256,
            height: "100vh",
          }}
          items={items}
          onClick={handleClick}
        />
        <div className="flex-1 px-2">{renderContent(keyContent)}</div>
      </div>
    </>
  );
};

export default AdminPage;