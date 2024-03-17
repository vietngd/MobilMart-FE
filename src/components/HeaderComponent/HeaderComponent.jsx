import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
const HeaderComponent = () => {
  return (
    <div className="fixed  left-0 right-0 z-50 max-w-full bg-primary">
      <header className="m-auto flex h-header_Height max-w-screen-xl items-center gap-x-5">
        <Link to={"/"}>
          <img
            src="./src/assets/images/logo-remove-background.png"
            alt="logo"
            className="h-[65px] cursor-pointer brightness-0 invert"
          />
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

        <div className="flex gap-x-2">
          <button className="btn hover: duration-500 ease-out">
            <FaRegUser />
            Đăng kí
          </button>
          <button className="btn">
            <FaRegUser />
            Đăng nhập
          </button>
        </div>
        <div className=" flex cursor-pointer items-center gap-x-2 text-white">
          <FaShoppingCart size={"1.125rem"} /> Giỏ hàng
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
