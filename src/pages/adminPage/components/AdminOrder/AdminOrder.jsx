import { useSelector } from "react-redux";
import * as OrderServices from "../../../../services/orderServices";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading/LoadingComponent";
import { convertDateTime, convertToMonney } from "../../../../ultils.js";
import AdminOrderDetail from "./AdminOrderDetail.jsx";
import { Popover } from "antd";
import Pagination from "../../../../components/Pagination/Pagination.jsx";
import useDebounce from "../../../../hooks/useDebounce.js";

const AdminOrder = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOrderDetail, setIsOrderDetail] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [visiblePopover, setVisiblePopover] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [order_id_search, setOrder_id_search] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderServices.getAllOrder(
        user?.access_token,
        pageNumber,
        8,
        order_id_search,
      );

      setOrders(res);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  const id_search = useDebounce(order_id_search, 500);
  useEffect(() => {
    fetchOrders();
  }, [pageNumber, id_search]); // Sử dụng updateTransportStatus làm dependency

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
      await OrderServices.updateTransport(user?.access_token, orderId);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      fetchOrders();
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
      if (res.status === "OK") fetchOrders();
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

  const handleGetPageNumber = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        {isOrderDetail ? "Chi tiết đơn hàng" : "Quản lý đơn hàng"}
      </h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng"
          className="w-60 rounded border border-blue px-2 py-1 outline-red-300"
          value={order_id_search}
          onChange={(e) => setOrder_id_search(e.target.value)}
        />
      </div>
      {!isOrderDetail ? (
        <div className="overflow-x-auto">
          <Loading isLoading={loading}>
            <table className="mb-3 min-w-full border-collapse rounded-lg border bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">Mã Đơn</th>
                  <th className="border px-4 py-2 text-left">Khách hàng</th>
                  <th className="border px-4 py-2 text-left">SĐT</th>
                  <th className="border px-4 py-2 text-left">Thanh toán</th>
                  <th className="border px-4 py-2 text-left">Trạng thái</th>
                  <th className="border px-4 py-2 text-left">
                    Yêu cầu khách hàng
                  </th>
                  <th className="border px-4 py-2 text-left">Ngày đặt</th>
                  <th className="border px-4 py-2 text-left">Tổng tiền</th>
                  <th className="border px-4 py-2 text-left">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {orders && orders.data && orders?.data.length > 0 ? (
                  orders?.data?.map((order, index) => {
                    return (
                      <tr className=" hover:bg-gray-100" key={index}>
                        <td className="border px-4 py-2">{order?.id}</td>
                        <td className="border px-4 py-2">{order?.name}</td>
                        <td className="border px-4 py-2">{order?.phone}</td>
                        <td className="border px-4 py-2">
                          {order?.order_status_payment === 0 ? (
                            "Chưa thanh toán"
                          ) : (
                            <span className="text-red-500">Đã thanh toán</span>
                          )}
                        </td>
                        <td className="border px-4 py-2 text-center">
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
                        <td className="border px-4 py-2 text-center">
                          {order?.order_status_cancel === 1 ? (
                            <span className="rounded bg-red-500 p-1 text-white">
                              Khách yêu cầu hủy
                            </span>
                          ) : (
                            <span className="rounded bg-green-500 p-1 text-white ">
                              Không
                            </span>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          {convertDateTime(order?.created_at)?.day}
                        </td>
                        <td className="border px-4 py-2">
                          {convertToMonney(order.total_money)}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="mr-1 rounded border bg-green-500 px-2 py-1 text-white"
                            onClick={() => handleDetailOrder(order.id)}
                          >
                            Xem
                          </button>
                          <Popover
                            content={content}
                            trigger="click"
                            open={
                              visiblePopover === order.id &&
                              order?.order_status_transport !== 1
                            }
                          >
                            <button
                              className={`rounded border px-2 py-1 ${order?.order_status_transport !== 1 ? " bg-red-500 text-white" : "cursor-default"}`}
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
          {/* Phân trang*/}
          {!order_id_search && orders?.pagination?.totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                totalPage={orders?.pagination?.totalPages}
                getPageNumber={handleGetPageNumber}
              />
            </div>
          )}
        </div>
      ) : (
        <AdminOrderDetail orderId={orderId} />
      )}
    </div>
  );
};

export default AdminOrder;
