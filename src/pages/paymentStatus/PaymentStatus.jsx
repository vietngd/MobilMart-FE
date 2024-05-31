import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/userMutationHook";
import * as OrderServices from "../../services/orderServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeOrderInfo } from "../../redux/slides/orderSlice";
import * as message from "../../components/Message/MessageComponent";

import { IoIosArrowDropdown } from "react-icons/io";

const PaymentStatus = () => {
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
  const [TransactionStatus, setTransactionStatus] = useState(
    vnp_TransactionStatus,
  );

  const mutation = useMutationHook(async ({ access_token, ...rest }) => {
    const res = await OrderServices.createOrder(access_token, rest);
    return res;
  });

  const handleAddOrder = () => {
    mutation.mutateAsync({
      access_token: user?.access_token,
      user_id: user?.id,
      name: user?.name,
      phone: user?.phone,
      total_money: orders?.totalMonney,
      address: orders?.address,
      note: orders?.note || "",
      order_status_payment: true,
      products: orders?.selectedProduct?.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.sale,
      })),
    });
  };

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      dispatch(removeOrderInfo({ user_id: user?.id }));
      message.success("Đặt hàng thành công!");
    } else if (isError) {
      message.error("Đặt hàng thất bại!");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const ResponseCode = localStorage.getItem("vnp_ResponseCode");
    if (!ResponseCode) {
      localStorage.setItem("vnp_ResponseCode", TransactionStatus);
    } else {
      if (ResponseCode === "00" && orders?.selectedProduct.length > 0) {
        setTransactionStatus("00");
        handleAddOrder();
      } else if (ResponseCode !== "00") {
        setTransactionStatus("02");
      }
    }
  }, [user, orders]);

  return (
    <div className="flex min-h-screen  bg-cart_bg ">
      <div className="m-auto w-96 text-center">
        {TransactionStatus === "00" && (
          <p className="flex justify-center">
            <IoIosArrowDropdown size={"4rem"} color="green" />
          </p>
        )}
        {TransactionStatus === "00" ? (
          <div>
            <p className="text-xl">GIAO DỊCH THÀNH CÔNG</p>
            <button
              className="mt-40 rounded border border-primary px-5 py-2"
              onClick={() => navigate("/my-order")}
            >
              Xem thông tin dơn hàng
            </button>
          </div>
        ) : (
          <p>THANH TOÁN THẤT BẠI VUI LÒNG THỬ LẠI.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
