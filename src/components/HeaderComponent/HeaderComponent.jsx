import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
const HeaderComponent = () => {
  return (
    <div className="fixed  left-0 right-0 z-50 max-w-full bg-primary">
      <header className="m-auto flex h-header_Height max-w-screen-xl items-center gap-x-1">
        <Link to={"/"} className="flex items-center font-bold text-white">
          <img
            src="./src/assets/images/logo-2.png"
            alt="logo"
            className="h-[65px] cursor-pointer brightness-0 invert"
          />
          MOBILEMART
        </Link>

        <div className="flex grow items-center justify-center">
          <input
            placeholder="Tìm kiếm sản phẩm ..."
            className="search-input"
          ></input>
          <button className="block h-10 rounded-r-lg bg-white px-3 text-xl leading-[100%] text-gray-500">
            <IoMdSearch className="text-primary" />
          </button>
        </div>

        <div className=" flex h-12 cursor-pointer items-center gap-x-1 rounded-lg p-2 text-white hover:bg-[#ffffff33]">
          <IoBagHandleOutline size={"1.5rem"} />{" "}
          <span className="text-sm">Giỏ hàng</span>
        </div>
        <div className="flex gap-x-2">
          <Link to={"/dangnhap"}>
            <button className="btn flex flex-col justify-center rounded-lg bg-[#ffffff33]">
              <FaRegUserCircle size={"1.125rem"} />
              Đăng nhập
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
