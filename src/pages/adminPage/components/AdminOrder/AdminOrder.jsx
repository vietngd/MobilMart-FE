import { useSelector } from "react-redux";
import * as OrderServices from "../../../../services/orderServices";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading/LoadingComponent";
import { convertDateTime } from "../../../../ultils.js";
import AdminOrderDetail from "./AdminOrderDetail.jsx";
import { Popover } from "antd";

const AdminOrder = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOrderDetail, setIsOrderDetail] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [visiblePopover, setVisiblePopover] = useState();
  const [updateTransportStatus, setUpdateTransportStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderServices.getAllOrder(user?.access_token);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [updateTransportStatus, deleteStatus]); // Sử dụng updateTransportStatus làm dependency

  const handleDetailOrder = (orderId) => {
    setOrderId(orderId);
    setIsOrderDetail(true);
  };

  const content = (
    <div className="grid gap-y-1">
      <p>
        <button
          className="min-w-28 rounded-md border bg-green-500 px-3 py-1 text-white"
          onClick={() => handleUpdateTransport(orderId)}
        >
          Đã gửi hàng
        </button>
      </p>
      <p>
        <button
          className="min-w-28 rounded-md border bg-red-500 px-3 py-1 text-white"
          onClick={() => handleDeleteOrder(orderId)}
        >
          Xóa đơn hàng
        </button>
      </p>
    </div>
  );

  const updateTransport = async (orderId) => {
    setLoading(true);
    try {
      const res = await OrderServices.updateTransport(
        user?.access_token,
        orderId,
      );

      if (res.status === "OK") setUpdateTransportStatus(true); // Cập nhật trạng thái giao hàng
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTransport = (orderId) => {
    updateTransport(orderId);
    setVisiblePopover("");
  };
  const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
      const res = await OrderServices.deleteOrder(user?.access_token, orderId);
      if (res.status === "OK") setDeleteStatus(true); // Cập nhật trạng thái giao hàng
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
    setVisiblePopover("");
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        {isOrderDetail ? "Chi tiết đơn hàng" : "Quản lý đơn hàng"}
      </h1>
      {!isOrderDetail ? (
        <div className="overflow-x-auto">
          <Loading isLoading={loading}>
            <table className="min-w-full border-collapse rounded-lg border bg-white shadow-md">
              <thead>
                <tr>
                  <th className="border   px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Khách hàng</th>
                  <th className="border px-4 py-2 text-left">Số điện thoại</th>
                  <th className="border px-4 py-2 text-left">Thanh toán</th>
                  <th className="border px-4 py-2 text-left">Trạng thái</th>
                  <th className="border px-4 py-2 text-left">Ngày đặt</th>
                  <th className="border px-4 py-2 text-left">Tổng tiền</th>
                  <th className="border px-4 py-2 text-left">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {orders && orders.length > 0 ? (
                  orders?.map((order, index) => {
                    return (
                      <tr className=" hover:bg-gray-100" key={index}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{order?.name}</td>
                        <td className="border px-4 py-2">{order?.phone}</td>
                        <td className="border px-4 py-2">
                          {order?.order_status_payment === 0 ? (
                            "Chưa thanh toán"
                          ) : (
                            <span className="text-red-500">Đã thanh toán</span>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {order?.order_status_transport === 1 ? (
                            <span className="rounded bg-green-500 p-1 text-white">
                              Đã gửi hàng
                            </span>
                          ) : (
                            <span className="rounded bg-yellow-300 p-1">
                              Đang xử lý
                            </span>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {convertDateTime(order?.created_at)?.day}
                        </td>
                        <td className="border px-4 py-2">
                          {order.total_money}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="rounded border bg-green-500 px-2 py-1 text-white"
                            onClick={() => handleDetailOrder(order.id)}
                          >
                            Xem
                          </button>
                          <Popover
                            content={content}
                            trigger="click"
                            open={visiblePopover === order.id}
                          >
                            <button
                              className="rounded border bg-red-500 px-2 py-1 text-white"
                              onClick={() => {
                                setOrderId(order.id);
                                if (visiblePopover === order.id) {
                                  setVisiblePopover("");
                                } else {
                                  setVisiblePopover(order.id);
                                }
                              }}
                            >
                              Cập nhật
                            </button>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-3 text-center">
                      Không có đơn hàng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Loading>
        </div>
      ) : (
        <AdminOrderDetail orderId={orderId} />
      )}
    </div>
  );
};

export default AdminOrder;
