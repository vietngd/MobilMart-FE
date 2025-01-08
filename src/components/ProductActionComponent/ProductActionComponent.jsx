import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder, increaseQuantity } from "../../redux/slides/orderSlice";
import * as message from "../../components/Message/MessageComponent";

const ProductActionComponent = ({ product }) => {
  const user = useSelector((state) => state?.user);
  const orders = useSelector((state) => state?.order);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const quantity_product_order = orders?.orderItems
        .find((item) => item?.user_id === user?.id)
        ?.products.find((item) => item?.product_id === product?.id)?.quantity;

      if (product?.quantity > 0) {
        if (
          !orders?.orderItems
            .find((item) => item?.user_id === user?.id)
            ?.products.find((item) => item?.product_id === product?.id)
        ) {
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
                quantity_remaining: product?.quantity,
              },
            ],
          };
          dispatch(addOrder(orderItem));
          message.success("Đã thêm sản phẩm vào giỏ hàng");
        } else if (quantity_product_order < product?.quantity) {
          dispatch(
            increaseQuantity({ user_id: user?.id, product_id: product?.id }),
          );
          message.success("Đã thêm sản phẩm vào giỏ hàng");
        } else {
          message.error("Quá số lượng tồn kho!");
        }
      } else {
        message.error("Sản phẩm đã hết hàng");
      }
    }
  };

  return (
    <div className="col-span-1 flex w-[280px] p-2">
      <button
        className="flex w-full transform items-center rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-3 text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
        onClick={handleAddOrder}
      >
        <p className="mr-2 flex items-center justify-center">
          <FaCartArrowDown size={"1.75rem"} />
        </p>
        <span className="text-[16px]  font-semibold">Thêm vào giỏ hàng</span>
      </button>
    </div>
  );
};

export default ProductActionComponent;
