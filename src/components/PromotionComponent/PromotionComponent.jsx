import { FaGift, FaCheck } from "react-icons/fa";

const PromotionComponent = () => {
  return (
    <div className="col-span-3 rounded-md border p-2">
      <div className="mb-3 flex items-center justify-center rounded-md bg-primary py-2 text-lg text-white">
        <span className="mr-2">
          <FaGift />
        </span>
        Khuyến mãi
      </div>
      <ul>
        <li className="mb-2 flex items-center  text-sm">
          <div className="mr-2 text-xs text-primary">
            <FaCheck />
          </div>
          Hỗ trợ chuyển đổi Esim miễn phí ngay tại shop
        </li>
        <li className="mb-2 flex items-center  text-sm">
          <div className="mr-2 text-xs text-primary">
            <FaCheck />
          </div>
          Thu cũ - Đổi mới trợ giá lên đến 1 triệu đồng
        </li>
        <li className="mb-2 flex items-center  text-sm">
          <div className="mr-2 text-xs text-primary">
            <FaCheck />
          </div>
          Tặng sạc Anker/ Innostyle 20W chính hãng khi gia hạn bảo hành 24 tháng
        </li>
        <li className="mb-2 flex items-center  text-sm">
          <div className="mr-2 text-xs text-primary">
            <FaCheck />
          </div>
          Giảm ngay 10% khi mua phụ kiện khi nâng cấp bảo hành vàng
        </li>
        <li className="mb-2 flex items-center  text-sm">
          <div className="mr-2 text-xs text-primary">
            <FaCheck />
          </div>
          Ưu đãi mua Combo phụ kiện giá cực sốc tiết kiệm đến 300.000đ
        </li>
      </ul>
    </div>
  );
};

export default PromotionComponent;
