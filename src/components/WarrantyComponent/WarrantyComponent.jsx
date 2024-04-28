import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaMapMarked } from "react-icons/fa";

const WarrantyComponent = () => {
  return (
    <div>
      <div className="mb-4 rounded-md border p-3">
        <h3 className="mb-1 font-semibold">Chính sách bảo hành</h3>
        <ul>
          <li className="flex text-xs">
            <span className="mr-1">
              <IoIosCheckmarkCircle size={"1.4rem"} color="#0A9EFF" />
            </span>
            <span>
              <span className="text-green-400">
                Bảo hành chính hãng 12 tháng
              </span>{" "}
              <span className="text-primary"> ( Miễn phí )</span> : Bảo hành sửa
              chữa thay thế linh kiện tại các trung tâm bảo hành chính hãng
              Samsung. Bao test đổi sản phẩm lỗi 30 ngày.
            </span>
          </li>
          <li className="flex text-xs">
            <span className="mr-1">
              <IoIosCheckmarkCircle size={"1.4rem"} color="#0A9EFF" />
            </span>
            <span>
              <span className="text-green-400">
                Bảo hành rơi vỡ, vào nước 12 tháng
              </span>{" "}
              <span className="text-primary"> ( Miễn phí )</span>: Hỗ trợ khắc
              phục miễn phí các lỗi rơi vỡ, vào nước 12 tháng.
            </span>
          </li>
          <li className="flex text-xs">
            <span className="mr-1">
              <IoIosCheckmarkCircle size={"1.4rem"} color="#0A9EFF" />
            </span>
            <span>
              <span className="text-green-400">Gia hạn bảo hành 24 tháng</span>{" "}
              <span className="text-primary"> ( Miễn phí )</span>: Năm đầu bảo
              hành chính hãng, năm 2 bảo hành toàn bộ lỗi phần cứng, nguồn, màn
              hình... tại MobileMart.
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-md border p-3">
        <div className="flex">
          <span className="mr-1">
            <FaMapMarked color="#0A9EFF" />
          </span>
          <span className="text-xs">
            Thôn Trung Bạn- Thị Trấn Chờ - Yên Phong - Bắc Ninh :{" "}
            <span className="text-primary">0389389891</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WarrantyComponent;
