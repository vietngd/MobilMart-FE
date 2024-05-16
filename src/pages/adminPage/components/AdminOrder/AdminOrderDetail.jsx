import { useSelector } from "react-redux";
import * as OrderServices from "../../../../services/orderServices";
import { useEffect, useState } from "react";
import { convertDateTime } from "../../../../ultils";
import Loading from "../../../../components/Loading/LoadingComponent";

const AdminOrderDetail = ({ orderId }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const fetchDetailOrder = async () => {
    setLoading(true);
    try {
      const res = await OrderServices.getDetailOrder(
        user?.access_token,
        orderId,
      );
      setOrder(res.data[0]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailOrder();
  }, []);

  return (
    <Loading isLoading={loading}>
      <div>
        <div className="mb-10 grid grid-cols-2 gap-x-5">
          <div className="mb-5">
            <label className="font-semibold">Mã đơn hàng</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={order?.order_id || ""}
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Tên khách hàng</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={order?.name || ""}
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Tổng tiền</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={order?.total_money || ""}
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Số điện thoại</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={order?.phone || ""}
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Ngày đặt</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={convertDateTime(order?.created_at)?.day || ""}
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Thanh toán</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={
                order?.order_status_payment === 1
                  ? "Đã thanh toán"
                  : "Chưa thanh toán" || ""
              }
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Trạng thái</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={
                order?.order_status_transport === 1
                  ? "Đã gửi hàng"
                  : "Đang xử lý" || ""
              }
              readOnly
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Note</label>
            <input
              type="text"
              className="w-full border-[2px] px-2 py-2 outline-none"
              value={order?.note || ""}
              readOnly
            />
          </div>
        </div>
        <div>
          <h1>THÔNG TIN SẢN PHẨM</h1>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse rounded-lg border bg-white shadow-md">
              <thead>
                <tr>
                  <th className="border px-4 py-4 text-left">#</th>
                  <th className="border px-4 py-4 text-left">Tên sản phẩm</th>
                  <th className="border px-4 py-4 text-left">Giá tiền</th>
                  <th className="border px-4 py-4 text-left">Số lượng</th>
                </tr>
              </thead>

              <tbody>
                {order?.products &&
                  JSON.parse(order?.products)?.map((product, index) => {
                    return (
                      <tr className=" hover:bg-gray-100" key={index}>
                        <td className="border px-4 py-4">{index + 1}</td>
                        <td className="border px-4 py-4">{product?.name}</td>
                        <td className="border px-4 py-4">{product?.price}</td>
                        <td className="border px-4 py-4">
                          {product?.quantity}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default AdminOrderDetail;
