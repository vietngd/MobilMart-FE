import { useSelector } from "react-redux";
import * as OrderServices from "../../services/orderServices";
import { useQuery } from "@tanstack/react-query";
import { convertToMonney } from "../../ultils";
import noOrder from "../../assets/images/no-order.jpg";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);

  //Get All Product từ CSDL
  const fetchOrders = async () => {
    const access_token = user?.access_token;
    const user_id = user?.id;
    const res = await OrderServices.getOrderByUser(access_token, user_id);
    return res;
  };

  const queryOrders = useQuery({
    queryKey: ["order", user],
    queryFn: fetchOrders,
    retry: 3,
    retryDelay: 1000,
  });

  const { data } = queryOrders;

  return (
    <div className=" min-h-screen bg-cart_bg">
      <div className="m-auto max-w-screen-xl pb-3 pt-3">
        <h1 className="mt-3 text-center text-xl">THÔNG TIN ĐƠN HÀNG</h1>
        {data && data?.data?.length > 0 ? (
          data?.data?.map((order) => {
            return (
              <div className="mt-5 rounded bg-white p-2" key={order?.order_id}>
                <div className="text-right text-orange-600">
                  {order.order_status_payment
                    ? "ĐÃ THANH TOÁN"
                    : "CHỜ THANH TOÁN"}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {/* Danh sách sản phẩm */}
                    {JSON.parse(order.products).map((product, index) => {
                      return (
                        <div className="flex" key={index}>
                          <img
                            src={product?.images.split(",")[0]}
                            alt="img"
                            style={{ width: "80px" }}
                          />
                          <div>
                            <p>
                              {product.name}{" "}
                              <span className="text-red-600">
                                x{product.quantity}
                              </span>
                            </p>
                            <div>
                              <span className="mr-1 text-sm line-through">
                                {convertToMonney(product.price)}
                              </span>
                              <span className="text-red-600">
                                {convertToMonney(product.sale)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className=" text-right">
                    Số tiền phải trả :{" "}
                    <span className="text-red-600">
                      {convertToMonney(order?.total_money)}
                    </span>
                  </p>
                </div>
                <p className="mt-3 text-left">
                  Người nhận : <span>{order.name}</span>
                </p>
                <p className="mt-3 text-left">
                  Địa chỉ nhận hàng : <span>{order?.address}</span>
                </p>
                <div className="mt-3 flex justify-between">
                  <span className="mr-3 ">
                    Phương thức thanh toán :{" "}
                    {order.order_status_payment === 0 ? (
                      <span className="text-orange-600">
                        Thanh toán khi nhận hàng
                      </span>
                    ) : (
                      <span className="text-orange-600">Thanh toán Online</span>
                    )}
                  </span>
                  {!order.order_status_payment && (
                    <button className=" rounded border px-5 py-2">
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center">
            <img src={noOrder} alt="no-order" style={{ width: "600px" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderPage;
