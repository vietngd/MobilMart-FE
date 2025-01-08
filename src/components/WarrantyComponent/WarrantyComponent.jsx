import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaMapMarked } from "react-icons/fa";

const WarrantyComponent = () => {
  return (
    <div className="w-[284px]">
      <div className="mb-5 rounded-lg border border-gray-200 bg-white p-2  shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">
          Chính sách bảo hành
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <IoIosCheckmarkCircle
              size="1.4rem"
              className="text-blue-500 mr-2 mt-1"
            />
            <div className="text-sm">
              <span className="font-medium text-green-600">
                Bảo hành chính hãng 12 tháng
              </span>{" "}
              <span className="text-red-600">(Miễn phí)</span>: Bảo hành sửa
              chữa thay thế linh kiện tại các trung tâm bảo hành chính hãng
              Samsung. Bao test đổi sản phẩm lỗi 30 ngày.
            </div>
          </li>
          <li className="flex items-start">
            <IoIosCheckmarkCircle
              size="1.4rem"
              className="text-blue-500 mr-2 mt-1"
            />
            <div className="text-sm">
              <span className="font-medium text-green-600">
                Bảo hành rơi vỡ, vào nước 12 tháng
              </span>{" "}
              <span className="text-red-600">(Miễn phí)</span>: Hỗ trợ khắc phục
              miễn phí các lỗi rơi vỡ, vào nước 12 tháng.
            </div>
          </li>
          <li className="flex items-start">
            <IoIosCheckmarkCircle
              size="1.4rem"
              className="text-blue-500 mr-2 mt-1"
            />
            <div className="text-sm">
              <span className="font-medium text-green-600">
                Gia hạn bảo hành 24 tháng
              </span>{" "}
              <span className="text-red-600">(Miễn phí)</span>: Năm đầu bảo hành
              chính hãng, năm 2 bảo hành toàn bộ lỗi phần cứng, nguồn, màn
              hình... tại Toha Mobile.
            </div>
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <FaMapMarked size="1.4rem" className="text-blue-500 mr-2" />
          <span className="text-sm text-gray-700">
            Thôn Phù Lưu - Trung Nghĩa - Yên Phong - Bắc Ninh:{" "}
            <span className="font-semibold text-red-600">0868650928</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WarrantyComponent;
