import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import facebook_logo from "../../assets/images/facebook-icon.png";
import google_logo from "../../assets/images/Google-icon.png";

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
            <li>Thôn Trung Bạn, Thị Trấn Chờ, Yên Phong, Bắc Ninh</li>
            <li>
              Nghách 80/92 đường Xuân Phương, Phường Phương Canh, Quận Nam Từ
              Liêm
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
            <li>Hotline CSKH: 0389389891</li>
            <li className="flex">
              <button className="min-w-30 mr-2 flex  items-center rounded-md border border-red-600 px-3 py-2">
                <span className="mr-2">
                  <img src={google_logo} alt="icon" className="w-5" />
                </span>
                <span>Email</span>
              </button>
              <button className=" min-w-30 border-blue-300 flex items-center rounded-md border border-blue px-3 py-2">
                <span className="mr-2">
                  <img src={facebook_logo} alt="icon" className="w-5" />
                </span>
                <span>Facebook</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
