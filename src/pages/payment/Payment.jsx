import { FaArrowLeftLong } from "react-icons/fa6";
import { convertToMonney } from "../../ultils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useMutationHook } from "../../hooks/userMutationHook";
import * as OrderServices from "../../services/orderServices";
import { useNavigate } from "react-router-dom";
import { removeOrderInfo } from "../../redux/slides/orderSlice";
import * as message from "../../components/Message/MessageComponent";
import axios from "axios";
import {
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
} from "@mui/material";
const Payment = () => {
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("offline");

  const QuantityProduct = useMemo(() => {
    return orders?.selectedProduct.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [orders]);

  const handleSelectMethodPayment = async (e) => {
    if (e.target.value === "online") {
      setPaymentMethod("online");
      // paymentOnline();
    } else {
      setPaymentMethod("offline");
    }
  };

  const paymentOnline = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/vnpay/create_payment_url`,
      {
        amount: orders?.totalMonney,
        bankCode: "",
        language: "vn",
      },
    );
    window.location.href = res.data.url;
  };

  const mutation = useMutationHook(async ({ access_token, ...rest }) => {
    const res = await OrderServices.createOrder(access_token, rest);
    return res;
  });

  const handleAddOrder = () => {
    localStorage.removeItem("vnp_ResponseCode");
    if (paymentMethod === "offline") {
      mutation.mutateAsync({
        access_token: user?.access_token,
        user_id: user?.id,
        name: user?.name,
        phone: user?.phone,
        address: orders?.address,
        note: orders?.note || "",
        total_money: orders?.totalMonney,
        order_status_payment: false,
        products: orders?.selectedProduct?.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.sale,
        })),
      });
    } else {
      paymentOnline();
    }
  };
  console.log("orders", orders);

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      dispatch(removeOrderInfo({ user_id: user?.id }));
      message.success("Đặt hàng thành công!");
      navigate("/my-order");
    } else if (isError) {
      message.error("Đặt hàng thất bại!");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex min-h-screen justify-center rounded-md bg-cart_bg p-2 pb-40">
      <div className=" w-[700px] rounded-md ">
        <div className="relative border-b-[1px] py-3">
          <p className="text-center text-xl font-medium">Thông tin</p>
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaArrowLeftLong size={"1.2rem"} />
          </div>
        </div>
        <div className="flex gap-4 px-2">
          <div className="flex-1 border-b-4  py-3 text-center font-bold  text-gray-400">
            1. THÔNG TIN
          </div>
          <div className="flex-1 cursor-pointer border-b-4 border-red-600 py-3 text-center font-bold  text-red-600">
            2. THANH TOÁN
          </div>
        </div>

        <div>
          {/* Thông tin đơn hàng */}
          <div className="mt-[24px]  rounded-[10px] border-[0.8px] border-[#919eab3d] bg-white px-2 py-3">
            <div className="mb-3 border-b-[0.8px]">
              <div className="flex justify-between py-2">
                <span>Số lượng sản phẩm</span>
                <span>{QuantityProduct}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tiền hàng (tạm tính)</span>
                <span>{convertToMonney(orders?.totalMonney)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
            </div>

            <div className="flex justify-between py-2">
              <span>Tổng tiền (đã gồm VAT)</span>
              <span>{convertToMonney(orders?.totalMonney)}</span>
            </div>
          </div>

          {/* Thông tin thanh toán */}
          <div className="mt-[24px]">
            <h1>THÔNG TIN THANH TOÁN</h1>

            <div className="mt-[15px] flex justify-between rounded-[10px] border-[0.8px] border-[#919eab3d] bg-white p-4">
              <FormControl>
                <RadioGroup
                  row
                  defaultValue="offline"
                  onChange={handleSelectMethodPayment}
                >
                  <FormControlLabel
                    value="offline"
                    control={<Radio />}
                    label="Thanh toán khi nhận hàng"
                  />
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Thanh toán qua ví điện tử VNPay"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {/* Thông tin khách hàng */}
          <div className="mt-[24px]">
            <h1>THÔNG TIN KHÁCH HÀNG</h1>

            <div className=" rounded-[10px] border-[0.8px] border-[#919eab3d] bg-white px-2 py-3">
              <div className="mb-3">
                <div className="flex justify-between py-2">
                  <span>Khách hàng</span>
                  <span>{user?.name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Số điện thoại</span>
                  <span>{user?.phone}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Email</span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Địa chỉ nhận hàng</span>
                  <span className="text-end">{orders?.address}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Ghi chú</span>
                  <span>{orders?.note}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 rounded-lg bg-white p-4">
            <div className="flex justify-between">
              <span>Tổng tiền tạm tính:</span>{" "}
              <span className="text-red-600">
                {convertToMonney(orders?.totalMonney)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {paymentMethod === "offline" ? (
                <button
                  className="mt-1 w-full rounded-md bg-red-600 py-3 text-white"
                  onClick={handleAddOrder}
                >
                  Đặt hàng
                </button>
              ) : (
                <button
                  className="mt-1 w-full rounded-md bg-green-600 py-3 text-white"
                  onClick={handleAddOrder}
                >
                  Thanh toán ngay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
