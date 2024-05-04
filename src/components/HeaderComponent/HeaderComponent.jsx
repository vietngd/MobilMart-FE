import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from "../../services/userServices.js";
import { Popover } from "antd";
import { resetUser } from "../../redux/slides/userSlice.js";
import { useEffect, useState } from "react";
import Loading from "../Loading/LoadingComponent.jsx";
import { getAllProduct } from "../../services/productServices.js";
import logo from "../../assets/images/logo-2.png";
import useDebounce from "../../hooks/useDebounce.js";

const HeaderComponent = ({ isHidenSearch, isHidenCart }) => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSearchText, setIsSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleNavigateProfile = () => {
    navigate("/profile-user");
  };
  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  const handleNavigateDetailProduct = (id) => {
    setIsSearchText("");
    navigate(`/product/${id}`);
    // window.location.reload();
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    disPatch(resetUser());
    localStorage.removeItem("access_token");
    setLoading(false);
    navigate("/");
  };

  const onchangeSearch = (e) => {
    setIsSearchText(e.target.value);
  };

  const searchText = useDebounce(isSearchText, 500); // Hạn chế số lần gọi request khi người dùng chưa nhập xong
  useEffect(() => {
    fetchProduct(searchText);
  }, [searchText]);

  const fetchProduct = async (isSearchText) => {
    const res = await getAllProduct(isSearchText);
    setProducts(res?.data);
  };

  const content = (
    <>
      <div className="cursor-pointer">
        <p className="hover:text-primary" onClick={handleNavigateProfile}>
          Thông tin cá nhân
        </p>
        {user?.isAdmin ? (
          <p className="hover:text-primary" onClick={handleNavigateAdmin}>
            Quản lý hệ thống
          </p>
        ) : (
          <></>
        )}
        <p className="hover:text-primary" onClick={handleLogout}>
          Đăng xuất
        </p>
      </div>
    </>
  );
  return (
    <div className="fixed  left-0 right-0 z-50 max-w-full bg-primary">
      <header className="m-auto h-header_Height max-w-screen-xl  gap-x-1">
        <div
          className={
            !isHidenSearch
              ? "flex items-center "
              : "flex items-center justify-between"
          }
        >
          <Link
            to={"/"}
            className="flex items-center font-bold text-white hover:text-white"
          >
            <img
              src={logo}
              alt="logo"
              className="h-[65px] cursor-pointer brightness-0 invert"
            />
            MOBILEMART
          </Link>

          {!isHidenSearch && (
            <div className="relative flex grow items-center justify-center">
              <input
                placeholder="Tìm kiếm sản phẩm ..."
                className="search-input"
                value={isSearchText}
                onChange={(e) => onchangeSearch(e)}
              ></input>
              <button className="block h-10 rounded-r-lg bg-white px-3 text-xl leading-[100%] text-gray-500">
                <IoMdSearch className="text-primary" />
              </button>

              {/* Search Result */}

              {isSearchText && (
                <div className="absolute left-1/2  top-[110%] flex w-[429px] -translate-x-1/2 items-center overflow-hidden rounded-md bg-white">
                  <ul className="w-full ">
                    {products?.slice(0, 10).map((item, index) => {
                      return (
                        <li
                          className="flex cursor-pointer border-b px-2 py-1 hover:bg-[#F3F3F3]"
                          key={index}
                          onClick={() => handleNavigateDetailProduct(item?.id)}
                        >
                          <img
                            src={item?.images.split(",")[0]}
                            alt="img"
                            className="mr-2 w-14 object-cover"
                          ></img>
                          <div className="flex-1">
                            <p className="font-thin text-[#505050] ">
                              {item?.name}
                            </p>
                            <span className="text-xs">
                              <span className="mr-1 text-red-600">
                                {item?.sale.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                              <span className="line-through">
                                {item?.price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!isHidenCart && (
            <Link to="/cart" className="relative">
              <div className="h-12 cursor-pointer rounded-lg p-2 text-white hover:bg-[#ffffff33]">
                <IoBagHandleOutline size={"2.2rem"} />
              </div>

              {order?.orderItems.length > 0 && (
                <span className="absolute top-0 h-6 w-6 rounded-full border bg-red-600 text-center text-white">
                  {order?.orderItems.length}
                </span>
              )}
            </Link>
          )}
          <Loading isLoading={isLoading}>
            <div className="flex gap-x-2">
              {user?.access_token ? (
                <Popover content={content} trigger="hover">
                  <button
                    className="btn ml-2 flex flex-col justify-center rounded-lg bg-[#ffffff33]"
                    onClick={handleNavigateLogin}
                    disabled
                  >
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        className="h-5 w-5 rounded-full object-cover"
                      ></img>
                    ) : (
                      <FaRegUserCircle size={"1.125rem"} />
                    )}
                    {userName || user?.email || "User"}
                  </button>
                </Popover>
              ) : (
                <button
                  className="btn ml-2 flex flex-col justify-center rounded-lg bg-[#ffffff33]"
                  onClick={handleNavigateLogin}
                >
                  <FaRegUserCircle size={"1.125rem"} />
                  Đăng nhập
                </button>
              )}
            </div>
          </Loading>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
