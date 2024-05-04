import { useDispatch, useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import {
  decreaseQuantity,
  increaseQuantity,
  removeOrder,
} from "../../redux/slides/orderSlice";
import cartEmpty from "../../assets/images/empty-cart.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);

  const handleQuantityProduct = (type, product_id) => {
    if (type === "decrease") {
      dispatch(decreaseQuantity(product_id));
    } else {
      dispatch(increaseQuantity(product_id));
    }
  };

  const totalAmount = orders?.orderItems.reduce((total, order) => {
    return total + order.quantity * order.sale;
  }, 0);

  return (
    <>
      {orders?.orderItems.length > 0 ? (
        <div className="h-screen rounded-md border p-2">
          <div className="relative">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 text-left">Sản phẩm</th>
                  <th className="py-2">Số lượng</th>

                  <th className="py-2">Tổng tiền</th>
                  <th className="py-2">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {orders?.orderItems.map((item) => {
                  return (
                    <tr key={item.product_id} className="border-b-[1px]">
                      <td className="flex py-5">
                        <img
                          src={item.image}
                          alt="img"
                          style={{ width: "80px" }}
                        />
                        <div className="flex flex-col justify-around">
                          <p>{item.name}</p>
                          <p>
                            <span className="mr-2 text-red-600">
                              {item?.sale.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                            <span className="text-sm line-through">
                              {item?.price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="min-w-40 text-center">
                        <div className="flex items-center justify-center gap-x-6">
                          <button
                            className="h-8 w-8 rounded border"
                            onClick={() =>
                              handleQuantityProduct("decrease", item.product_id)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="h-8 w-8 rounded border"
                            onClick={() =>
                              handleQuantityProduct("increase", item.product_id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="min-w-32 text-center">
                        {(item?.sale * item.quantity).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>

                      <td>
                        <span
                          className="flex cursor-pointer justify-center hover:text-red-600"
                          onClick={() => dispatch(removeOrder(item.product_id))}
                        >
                          <FaTrashCan size={"1.3rem"} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <span className="absolute right-0 top-full">
              Tổng : {totalAmount} đ
            </span>
          </div>
          <div className="mt-10 flex justify-between">
            <button className="rounded-md border px-5 py-2">Quay lại</button>
            <button className="rounded-md border border-green-400 px-5 py-2">
              Mua
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img src={cartEmpty} alt="cartEmpty" />
        </div>
      )}
    </>
  );
};

export default CartPage;
