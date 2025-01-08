import { FaGift, FaCheck } from "react-icons/fa";

const PromotionComponent = () => {
  return (
    <div className="col-span-3 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 shadow-md">
      <div className="flex items-center justify-center rounded-lg bg-gradient-to-r from-[#ff7654] to-[#ff4a2f] py-3 text-lg font-semibold text-white">
        <FaGift className="mr-2 text-2xl" />
        <span>Ưu Đãi Đặc Biệt</span>
      </div>
      <ul className="mt-4 space-y-3">
        {[
          "Hỗ trợ chuyển đổi Esim miễn phí ngay tại shop",
          "Thu cũ - Đổi mới trợ giá lên đến 1 triệu đồng",
          "Tặng sạc Anker/ Innostyle 20W chính hãng khi gia hạn bảo hành 24 tháng",
          "Giảm ngay 10% khi mua phụ kiện khi nâng cấp bảo hành vàng",
          "Ưu đãi mua Combo phụ kiện giá cực sốc tiết kiệm đến 300.000đ",
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 rounded-md bg-gray-100 p-3 text-sm shadow-sm hover:bg-gray-200"
          >
            <FaCheck className="mt-0.5 text-green-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionComponent;
