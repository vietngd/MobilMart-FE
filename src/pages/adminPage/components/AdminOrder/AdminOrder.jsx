import { useSelector } from "react-redux";
import * as OrderServices from "../../../../services/orderServices";
import { useEffect, useState } from "react";
import { convertDateTime, convertToMonney } from "../../../../ultils.js";
import { Popover } from "antd";
import useDebounce from "../../../../hooks/useDebounce.js";
import CustomTable from "../../../../components/common/CustomTable.jsx";
import { IcEdit, IcView } from "../../../../components/icons/common.jsx";
import Badge from "../../../../components/common/Badge.jsx";
import { TextField } from "@mui/material";
import OrderDialog from "./OrderDetailDialog.jsx";

const AdminOrder = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [visiblePopover, setVisiblePopover] = useState();
  const [order_id_search, setOrder_id_search] = useState("");
  const [modal, setModal] = useState(false);
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
  }, [orderId]);
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await OrderServices.getAllOrder(
        user?.access_token,
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
  }, [id_search]);

  const handleclick = (orderId) => {
    setOrderId(orderId);
    setModal(true);
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

  const columns = [
    {
      title: "Mã Đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Thanh toán",
      dataIndex: "order_status_payment",
      key: "order_status_payment",
      render: (item) =>
        item?.order_status_payment === 0 ? (
          "Chưa thanh toán"
        ) : (
          <span className="text-red-500">Đã thanh toán</span>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "order_status_transport",
      key: "order_status_transport",
      render: (item) => {
        return (
          <div>
            {item?.order_status_transport === 1 ? (
              <Badge type="success" title={"Đã gửi hàng"} isCustom></Badge>
            ) : (
              <Badge type="warning" title={"Đang xử lý"} isCustom></Badge>
            )}
          </div>
        );
      },
    },
    {
      title: "Yêu cầu khách hàng",
      dataIndex: "order_status_cancel",
      key: "order_status_cancel",
      render: (item) =>
        item?.order_status_cancel === 1 ? (
          <Badge type="danger" title={" Hủy"} isCustom></Badge>
        ) : (
          <Badge type="success" title={"Không"} isCustom></Badge>
        ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "created_at",
      key: "created_at",
      render: (item) => convertDateTime(item?.created_at)?.day,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_money",
      key: "total_money",
      render: (item) => convertToMonney(item?.total_money),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (item) => (
        <>
          <button
            className="mr-1 px-2 py-1 text-white"
            onClick={() => {
              handleclick(item.id);
            }}
          >
            <IcView />
          </button>
          <Popover
            content={content}
            trigger="click"
            open={
              visiblePopover === item.id && item.order_status_transport !== 1
            }
          >
            <button
              className={`${item.order_status_transport !== 1 ? "cursor-pointer" : "cursor-not-allowed"}`}
              onClick={() => {
                setOrderId(item.id);
                setVisiblePopover(visiblePopover === item.id ? "" : item.id);
              }}
              disabled={item.order_status_transport === 1}
            >
              <IcEdit />
            </button>
          </Popover>
        </>
      ),
    },
  ];
  return (
    <div>
      <h1 className="mb-4 text-[24px] font-bold">{"Quản lý đơn hàng"}</h1>
      <div className="mb-3 grid grid-cols-3">
        <TextField
          type="text"
          placeholder="Nhập mã đơn hàng"
          size="small"
          // className="w-60 rounded border border-blue px-2 py-1 outline-red-300"
          value={order_id_search}
          onChange={(e) => setOrder_id_search(e.target.value)}
        />
      </div>

      {/* {!isOrderDetail && (
        <CustomTable
          dataProp={orders.data || []} //
          columns={columns}
          onRow={(item) => {
            return {
              onClick: () => {
                setIdProductDelete(item?.id);
              },
            };
          }}
        />
        ) : (
          <AdminOrderDetail orderId={orderId} />
      )}   */}
      <CustomTable
        dataProp={orders.data || []} //
        columns={columns}
        onRow={(item) => {
          return {
            onClick: () => {
              setIdProductDelete(item?.id);
            },
          };
        }}
      />
      {/* <BasicDialog
        maxWidth="md"
        showCloseIcon
        open={modal}
        title={"Chi tiết đơn hàng"}
        onClose={() => setModal(false)}
      >
        <BasicDialogContent className="space-y-3">ABC</BasicDialogContent>
        <BasicDialogActions sx={{ justifyContent: "end" }}>
          <Button variant="outlined" onClick={() => setModal(false)}>
            Hủy
          </Button>
          <Button type="submit" variant="contained">
            OK
          </Button>
        </BasicDialogActions>
      </BasicDialog> */}
      <OrderDialog isModalOpen={modal} onClose={setModal} order={order} />
    </div>
  );
};

export default AdminOrder;
