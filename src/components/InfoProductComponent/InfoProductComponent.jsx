import { CiDeliveryTruck } from "react-icons/ci";
import PromotionComponent from "../PromotionComponent/PromotionComponent";
import ProductActionComponent from "../ProductActionComponent/ProductActionComponent";

const InfoProductComponent = ({ sale = "", price = "" }) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-center rounded border border-primary py-1 text-white">
        <span className="text-3xl">
          <CiDeliveryTruck color="#978535" />
        </span>
        <span className="ml-3 text-primary">MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="mr-2 text-2xl font-bold text-red-700">
            {sale.toLocaleString("vi", { style: "currency", currency: "VND" })}
          </span>
          <span className="mr-2 text-base line-through">
            {price.toLocaleString("vi", { style: "currency", currency: "VND" })}
          </span>
          <span className="mr-2">|</span>
          <span>Đã bao gồm 10% thuế VAT</span>
        </div>
        <div>
          <input type="checkbox" defaultChecked={true} /> Còn hàng
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-1">
        <PromotionComponent />
        <ProductActionComponent />
      </div>
    </div>
  );
};

export default InfoProductComponent;
