import { FaCartArrowDown } from "react-icons/fa";
const ProductActionComponent = () => {
  return (
    <div className="col-span-1  cursor-pointer p-2">
      <button className="flex w-full items-center justify-center rounded-md border border-primary py-2  text-white hover:shadow">
        <span className="mr-2 text-2xl">
          <FaCartArrowDown color="#d70018" />
        </span>
        <span className="text-lg text-primary">Thêm giỏ hàng</span>
      </button>
    </div>
  );
};

export default ProductActionComponent;
