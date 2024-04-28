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

const HeaderComponent = ({ isHidenSearch, isHidenCart }) => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

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

  const handleLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    disPatch(resetUser());
    localStorage.removeItem("access_token");
    setLoading(false);
    navigate("/");
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
              src="./src/assets/images/logo-2.png"
              alt="logo"
              className="h-[65px] cursor-pointer brightness-0 invert"
            />
            MOBILEMART
          </Link>

          {!isHidenSearch && (
            <div className="flex grow items-center justify-center">
              <input
                placeholder="Tìm kiếm sản phẩm ..."
                className="search-input"
              ></input>
              <button className="block h-10 rounded-r-lg bg-white px-3 text-xl leading-[100%] text-gray-500">
                <IoMdSearch className="text-primary" />
              </button>
            </div>
          )}

          {!isHidenCart && (
            <div className=" flex h-12 cursor-pointer items-center gap-x-1 rounded-lg p-2 text-white hover:bg-[#ffffff33]">
              <IoBagHandleOutline size={"1.5rem"} />{" "}
              <span className="text-sm">Giỏ hàng</span>
            </div>
          )}
          <Loading isLoading={isLoading}>
            <div className="flex gap-x-2">
              {user?.access_token ? (
                <Popover content={content} trigger="hover">
                  <button
                    className="btn flex flex-col justify-center rounded-lg bg-[#ffffff33]"
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
                  className="btn flex flex-col justify-center rounded-lg bg-[#ffffff33]"
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
