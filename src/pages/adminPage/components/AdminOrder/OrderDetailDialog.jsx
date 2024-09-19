import React from "react";
import BasicDialog from "../../../../components/Modal/BasicDialog";
import BasicDialogActions from "../../../../components/Modal/BasicDialogAction";
import { Button } from "@mui/material";
import BasicDialogContent from "../../../../components/Modal/BasicDialogContent";
import { convertDateTime, convertToMonney } from "../../../../ultils";
import CustomTable from "../../../../components/common/CustomTable.jsx";

const OrderDialog = ({ onClose, isModalOpen, order }) => {
  // console.log("order", order);
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "images",
      key: "images",
      render: (item) => {
        console.log("item", item);

        return (
          <div>
            <img
              src={item?.images.split(",")[0]}
              alt=""
              style={{ width: "60px", height: "60px", borderRadius: "8px" }}
              className="border-neutral-gray-2 h-[60px] w-[60px] rounded-[16px] border object-scale-down"
            />
          </div>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (item) => {
        return <div>{convertToMonney(item?.price)}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div>
      <BasicDialog
        maxWidth="md"
        showCloseIcon
        open={isModalOpen}
        title={"Chi tiết đơn hàng"}
        onClose={() => onClose(false)}
      >
        <BasicDialogContent className="space-y-3">
          <div>
            <div className="grid grid-cols-2 gap-x-5">
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
                  value={convertToMonney(order?.total_money || "")}
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
                <label className="font-semibold">Trạng thái thanh toán</label>
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
              <div className="text-[22px] font-bold">Thông tin sản phẩm</div>
              <div className="overflow-x<-auto mt-3">
                <CustomTable
                  dataProp={(() => {
                    try {
                      return JSON.parse(order?.products) || [];
                    } catch (e) {
                      console.error("Error parsing JSON", e);
                      return [];
                    }
                  })()}
                  columns={columns}
                  maxHeight={250}
                  showPagination={false}
                />
              </div>
            </div>
          </div>
        </BasicDialogContent>
        <BasicDialogActions sx={{ justifyContent: "end" }}>
          <Button variant="outlined" onClick={() => onClose(false)}>
            Hủy
          </Button>
          <Button type="submit" variant="contained">
            OK
          </Button>
        </BasicDialogActions>
      </BasicDialog>
    </div>
  );
};
export default OrderDialog;
