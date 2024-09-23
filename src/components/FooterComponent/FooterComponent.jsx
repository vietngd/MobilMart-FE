import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import facebook_logo from "../../assets/images/facebook-icon.png";
import google_logo from "../../assets/images/Google-icon.png";
import instagram from "../../assets/images/instagram.png";
import zalo from "../../assets/images/zalo.png";

const FooterComponent = () => {
  return (
    <div className=" mt-10 flex items-center justify-center bg-[#fafafa] ">
      <div className="lg:max-w-screen-[80%] grid h-full w-full max-w-[90%] grid-cols-2 py-5 lg:grid-cols-3 xl:max-w-screen-xl">
        <div className="col-span-1">
          <h1 className="flex items-center font-semibold">
            <span className="mr-1">
              <FaMapMarkerAlt />
            </span>
            HỆ THỐNG CỬA HÀNG
          </h1>
          <ul className="mt-4 max-w-[80%] list-disc text-sm">
            <li>Thôn Phù Lưu, Xã Trung Nghĩa, Yên Phong, Bắc Ninh</li>
            <li>
              23A - Ngõ 52, Phố Yên Lạc, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Hà
              Nội
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h1 className="flex items-center font-semibold">
            <span className="mr-1">
              <HiQuestionMarkCircle />
            </span>
            HỆ THỐNG - CHÍNH SÁCH
          </h1>
          <ul className="mt-4 grid max-w-[80%] list-disc gap-y-3 text-sm">
            <li>Chính sách bảo hành</li>
            <li>Chính sách đổi trả hàng</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Hướng dẫn mua hàng Online</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h1 className="flex items-center font-semibold">
            <span className="mr-1">
              <FaPhone />
            </span>
            LIÊN HỆ
          </h1>
          <ul className="mt-4 grid max-w-[80%] list-disc gap-y-3 text-sm">
            <li>Hotline CSKH: 0868650928</li>
            <li className="flex">
              <div className="mb-6 flex gap-2 lg:mb-0">
                <a
                  href="https://www.facebook.com/profile.php?id=100024756409898"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={google_logo}
                    alt="Facebook"
                    width={30}
                    height={30}
                    className="group flex cursor-pointer justify-center rounded-md font-semibold text-white drop-shadow-xl transition-all duration-500 hover:translate-y-3 hover:rounded-[20%]"
                  />
                </a>

                <a
                  href="https://chat.zalo.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={facebook_logo}
                    alt="Zalo"
                    width={30}
                    height={30}
                    className="group flex cursor-pointer justify-center rounded-md font-semibold text-white drop-shadow-xl transition-all duration-500 hover:translate-y-3 hover:rounded-[20%]"
                  />
                </a>

                <a
                  href="https://www.instagram.com/vyet_oct8/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={instagram}
                    alt="Instagram"
                    width={30}
                    height={30}
                    className="group flex cursor-pointer justify-center rounded-md font-semibold text-white drop-shadow-xl transition-all duration-500 hover:translate-y-3 hover:rounded-[20%]"
                  />
                </a>

                <img
                  src={zalo}
                  alt="Twitter"
                  width={30}
                  height={30}
                  className="group flex cursor-pointer justify-center rounded-md font-semibold text-white drop-shadow-xl transition-all duration-500 hover:translate-y-3 hover:rounded-[20%]"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
