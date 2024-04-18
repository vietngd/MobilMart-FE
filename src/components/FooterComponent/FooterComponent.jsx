import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi2";

const FooterComponent = () => {
  return (
    <div className=" mt-5 flex items-center justify-center bg-[#fafafa]">
      <div className="grid h-full w-full max-w-screen-xl grid-cols-3 py-5">
        <div className="col-span-1">
          <h1 className="flex items-center font-semibold">
            <span className="mr-1">
              <FaMapMarkerAlt />
            </span>
            HỆ THỐNG CỬA HÀNG
          </h1>
          <ul className="mt-4 max-w-[80%] list-disc text-base">
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
          <ul className="mt-4 grid max-w-[80%] list-disc gap-y-3 text-base">
            <li>Chính sách bảo hành</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi trả hàng</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Hướng dẫn mua hàng Online</li>
            <li>Dịch vụ Ship COD Toàn quốc</li>
            <li>Chính sách đại lý linh, phụ kiện</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h1 className="flex items-center font-semibold">
            <span className="mr-1">
              <FaPhone />
            </span>
            LIÊN HỆ
          </h1>
          <ul className="mt-4 grid max-w-[80%] list-disc gap-y-3 text-base">
            <li>Hotline CSKH: 0389389891</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
