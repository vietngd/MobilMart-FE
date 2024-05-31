import { useSelector } from "react-redux";
import * as OrderServices from "../../services/orderServices";
import { useQuery } from "@tanstack/react-query";
import { convertDateTime, convertToMonney } from "../../ultils";
import noOrder from "../../assets/images/no-order.jpg";
import * as message from "../../components/Message/MessageComponent";
import ModalComponent from "../../components/Modal/ModalComponent";
import { useState } from "react";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalReceived, setIsModalReceived] = useState(false);
  const [idCancel, setIdCancel] = useState("");
  const [isReceived, setisReceived] = useState(false);

  // Fetch orders function
  const fetchOrders = async () => {
    if (user && user?.access_token) {
      const access_token = user?.access_token;
      const user_id = user?.id;
      const res = await OrderServices.getOrderByUser(
        access_token,
        user_id,
        isReceived,
      );
      return res;
    }
    return [];
  };

  const { data, refetch } = useQuery({
    queryKey: ["order", user, isReceived],
    queryFn: fetchOrders,
    retry: 3,
    retryDelay: 1000,
  });

  const cancelOrder = async (id, access_token, user_id) => {
    const res = await OrderServices.cancelOrder(id, access_token, user_id);
    if (res && res.status === "OK") {
      message.success("Yêu cầu hủy đã được ghi nhận");
      setIsModalCancel(false);
      refetch();
    } else if (res && res.status !== "OK") {
      message.error("Có lỗi thử lại sau!");
      setIsModalCancel(false);
    }
  };
  const updateIsReceived = async (id, access_token, user_id) => {
    const res = await OrderServices.updateIsReceived(id, access_token, user_id);
    if (res && res.status === "OK") {
      message.success("Cảm ơn bạn đã mua hàng ^_^");
      setIsModalReceived(false);
      setisReceived(true);
      refetch();
    } else if (res && res.status !== "OK") {
      message.error("Có lỗi thử lại sau!");
      setIsModalReceived(false);
    }
  };

  const handleCancelOrder = () => {
    if (user && user?.access_token && idCancel) {
      cancelOrder(idCancel, user?.access_token, user?.id);
    }
  };
  const handleUpdateIsReceived = () => {
    if (user && user?.access_token && idCancel) {
      updateIsReceived(idCancel, user?.access_token, user?.id);
    }
  };

  return (
    <div className="min-h-screen bg-cart_bg">
      <div className="m-auto max-w-screen-xl pb-3 pt-3">
        <h1 className="mt-3 text-center text-xl">THÔNG TIN ĐƠN HÀNG</h1>
        <span
          className={`mr-3 cursor-pointer rounded border ${!isReceived && "bg-primary text-white"}  px-5 py-3`}
          onClick={() => setisReceived(false)}
        >
          Đang xử lý
        </span>
        <span
          className={`cursor-pointer rounded  border px-5  py-3 ${isReceived && "bg-primary text-white"}`}
          onClick={() => setisReceived(true)}
        >
          Đơn đã mua
        </span>
        {data && data?.data?.length > 0 ? (
          data?.data?.map((order) => {
            return (
              <div className="mt-5 rounded bg-white p-2" key={order?.order_id}>
                <div className="mb-3 flex justify-between text-orange-600">
                  <span>
                    Mã đơn hàng : {order?.order_id} / {" Ngày đặt : "}
                    {convertDateTime(order?.created_at).day}
                  </span>
                  <span>
                    {order?.order_status_payment || order?.is_received
                      ? "ĐÃ THANH TOÁN"
                      : "CHỜ THANH TOÁN"}
                  </span>
                </div>
                <div className="items-center justify-between lg:flex">
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
                  <p className="text-right">
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
                <p className="mt-3 text-left">
                  Tình trạng đơn hàng :{" "}
                  <span>
                    {order.order_status_transport === 0 ? (
                      <span className="text-orange-600">
                        Người bán đang chuẩn bị hàng
                      </span>
                    ) : !order?.is_received ? (
                      <span className="text-green-500">
                        Đơn hàng đã giao cho đơn vị vận chuyển
                      </span>
                    ) : (
                      <span className="text-green-500">
                        Đã giao hàng thành công
                      </span>
                    )}
                  </span>
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

                  {!order?.order_status_payment &&
                  !order?.order_status_transport ? (
                    !order?.order_status_cancel ? (
                      <button
                        className="rounded border bg-red-400 px-5   text-white sm:py-2"
                        onClick={() => {
                          setIdCancel(order.order_id);
                          setIsModalCancel(true);
                        }}
                      >
                        Hủy đơn hàng
                      </button>
                    ) : (
                      <span className="rounded-md bg-blue px-2 text-white">
                        Yêu cầu hủy đã ghi nhận
                      </span>
                    )
                  ) : (
                    <>
                      {!order?.is_received && (
                        <button
                          className="rounded border bg-green-400 px-5   text-white sm:py-2"
                          onClick={() => {
                            setIdCancel(order.order_id);
                            setIsModalReceived(true);
                          }}
                        >
                          Đã nhận hàng
                        </button>
                      )}
                    </>
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

      <ModalComponent
        title="Hủy đơn hàng"
        open={isModalCancel}
        onCancel={() => setIsModalCancel(false)}
        onOk={handleCancelOrder}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      >
        <div>Bạn có chắc xóa đơn hàng này không?</div>
      </ModalComponent>
      <ModalComponent
        title="Xác nhận đơn hàng"
        open={isModalReceived}
        onCancel={() => setIsModalReceived(false)}
        onOk={handleUpdateIsReceived}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      >
        <div>Bạn có chắc đã nhận hàng không?</div>
      </ModalComponent>
    </div>
  );
};

export default MyOrderPage;
