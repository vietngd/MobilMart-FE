import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder } from "../../redux/slides/orderSlice";
import * as message from "../../components/Message/MessageComponent";
const ProductActionComponent = ({ product }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (product?.quantity > 0) {
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
        message.success("Đã thêm sản phẩm vào giỏ hàng");
      } else {
        message.error("Sản phẩm đã hết hàng");
      }
    }
  };
  return (
    <div className="col-span-1  cursor-pointer p-2">
      <button className=" flex w-full items-center rounded-md border  bg-red-600 p-2   text-white hover:shadow">
        <p className="mr-2">
          <FaCartArrowDown size={"1.5rem"} />
        </p>

        <span className=" text-lg text-white" onClick={handleAddOrder}>
          Thêm giỏ hàng
        </span>
      </button>
    </div>
  );
};

export default ProductActionComponent;
