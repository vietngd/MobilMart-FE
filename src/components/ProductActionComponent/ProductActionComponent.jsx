import { FaCartArrowDown } from "react-icons/fa";
const ProductActionComponent = () => {
  return (
    <div className="col-span-1  p-2">
      <button className="flex w-full items-center justify-center rounded-md border py-2 text-black hover:bg-primary hover:text-white">
        <span className="mr-2 text-2xl">
          <FaCartArrowDown />
        </span>
        <span className="text-lg">Thêm giỏ hàng</span>
      </button>
    </div>
  );
};

export default ProductActionComponent;
