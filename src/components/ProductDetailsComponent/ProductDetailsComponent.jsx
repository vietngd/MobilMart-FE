import ImgShowComponent from "../ImgShowComponent/ImgShowComponent";
import InfoProductComponent from "../InfoProductComponent/InfoProductComponent";
import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import WarrantyComponent from "../WarrantyComponent/WarrantyComponent";

const ProductDetailsComponent = () => {
  return (
    <>
      <div className="my-5 flex justify-between">
        <span className="text-2xl font-bold ">
          Điện thoại iPhone 11 Pro cũ (Chính hãng) - Giá Rẻ hơn 36%
        </span>
        <div className="flex items-center">
          <span className="mr-2 flex items-center text-primary">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar /> <FaRegStarHalfStroke />
          </span>
          <span className="text-sm opacity-80">(200 Đánh giá)</span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-4">
        <div className="col-span-2">
          <ImgShowComponent />
        </div>
        <div className="col-span-3">
          <InfoProductComponent />
        </div>
        <div className="col-span-1">
          <WarrantyComponent />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
