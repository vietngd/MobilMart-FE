import { CiDeliveryTruck } from "react-icons/ci";
import PromotionComponent from "../PromotionComponent/PromotionComponent";
import ProductActionComponent from "../ProductActionComponent/ProductActionComponent";

const InfoProductComponent = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="mr-2 text-2xl font-bold text-primary">
            6,990,000 đ
          </span>
          <span className="mr-2 text-base line-through">8,490,000 đ</span>
          <span className="mr-2">|</span>
          <span>Đã bao gồm 10% thuế VAT</span>
        </div>
        <div>
          <input type="checkbox" checked /> Còn hàng
        </div>
      </div>
      <div className="mb-4 flex items-center justify-center rounded bg-primary py-1 text-white">
        <span className="text-3xl">
          <CiDeliveryTruck />
        </span>
        <span className="ml-3">MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC</span>
      </div>
      <h1 className="mb-2">Màu sắc : </h1>
      <div className="mb-4 flex">
        <div className="mr-2 min-w-32 cursor-pointer rounded-md border border-primary px-2">
          <div className="mb-1">
            <input type="radio" name="ProductColor" checked />{" "}
            <span>Xanh dương</span>
          </div>
          <span className="font-semibold text-primary">6,990,000 đ</span>
        </div>
        <div className="mr-2 min-w-32 cursor-pointer rounded-md border  px-2">
          <div className="mb-1">
            <input type="radio" name="ProductColor" /> <span>Đen</span>
          </div>
          <span className="font-semibold text-primary">7,200,000 đ</span>
        </div>
        <div className="mr-2 min-w-32 cursor-pointer rounded-md border  px-2">
          <div className="mb-1">
            <input type="radio" name="ProductColor" /> <span>Trắng</span>
          </div>
          <span className="font-semibold text-primary">7,690,000 đ</span>
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
