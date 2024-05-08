import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder } from "../../redux/slides/orderSlice";
const ProductActionComponent = ({ product }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderItem = {
        user_id: user?.id,
        products: [
          {
            product_id: product?.id,
            name: product?.name,
            image: product?.images.split(",")[0],
            sale: product?.sale,
            price: product?.price,
            quantity: 1,
          },
        ],
      };
      dispatch(addOrder(orderItem));
    }
  };
  return (
    <div className="col-span-1  cursor-pointer p-2">
      <button className="flex w-full items-center justify-center rounded-md border  bg-blue py-2  text-white hover:shadow">
        <span className="mr-2 text-2xl">
          <FaCartArrowDown />
        </span>
        <span className=" text-lg text-white" onClick={handleAddOrder}>
          Thêm giỏ hàng
        </span>
      </button>
    </div>
  );
};

export default ProductActionComponent;
