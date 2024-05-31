import { FaArrowLeftLong } from "react-icons/fa6";

import { convertToMonney } from "../../ultils";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderInfo } from "../../redux/slides/orderSlice";
import AddressSelection from "../../components/AddressSelection/AddressSelection";
import * as message from "../../components/Message/MessageComponent";

const PaymentInfo = () => {
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const selectedProducts = location.state;
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [note, setNote] = useState();
  const [addressOption, setAddressOption] = useState("1");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalMonney = useMemo(() => {
    const products = orders?.orderItems.find(
      (item) => item.user_id === user?.id,
    )?.products;
    return products
      ?.filter((item) => selectedProducts.includes(item.product_id))
      .reduce((total, item) => {
        return total + item.sale * item.quantity;
      }, 0);
  }, [orders]);

  const handlNextPayment = () => {
    if (addressOption === "1" || (province && district && ward)) {
      dispatch(
        addOrderInfo({
          address:
            addressOption === "1"
              ? user?.address
              : `${province} - ${district} - ${ward}`,
          note: note,
          items: orders?.orderItems
            .find((item) => item.user_id === user?.id)
            ?.products?.filter((item) =>
              selectedProducts.includes(item.product_id),
            ),
          totalMonney: totalMonney,
        }),
      );
      navigate("/cart/payment");
    } else {
      message.error("Vui lòng chọn địa chỉ để tiếp tục.");
    }
  };

  const handleOnchangeAddressOption = (e) => {
    setAddressOption(e.target.value);
  };

  const getProvice = (province) => {
    setProvince(province);
  };
  const getDistrict = (province) => {
    setDistrict(province);
  };

  const getWard = (province) => {
    setWard(province);
  };

  return (
    <div className="flex min-h-screen justify-center rounded-md bg-cart_bg p-2 pb-40">
      <div className=" w-[700px] rounded-md ">
        <div className="relative border-b-[1px] py-3">
          <p className="text-center text-xl font-medium">Thông tin</p>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer">
            <FaArrowLeftLong size={"1.2rem"} />
          </div>
        </div>

        <div className="flex gap-4 px-2">
          <div className="flex-1 border-b-4  border-red-600 py-3 text-center font-bold  text-red-600">
            1. THÔNG TIN
          </div>
          <div className="flex-1 cursor-pointer  border-b-4 py-3 text-center font-bold text-gray-400">
            2. THANH TOÁN
          </div>
        </div>

        <div>
          {/* Danh sách sản phẩm */}
          <div className="mt-[24px]  rounded-[10px] border-[0.8px] border-[#919eab3d] bg-white py-3">
            {orders?.orderItems
              .find((item) => item.user_id === user?.id)
              ?.products?.filter((item) =>
                selectedProducts.includes(item.product_id),
              )
              .map((item, index) => {
                return (
                  <div className="mb-3 flex items-center" key={index}>
                    <div className="mr-2">
                      <img
                        src={item?.image}
                        alt="img"
                        style={{ width: "80px" }}
                      />
                    </div>
                    <div className="flex-1 leading-10">
                      <p>{item?.name}</p>
                      <div className="pr-3">
                        <div className="flex justify-between">
                          <div>
                            <span className="mr-2 text-xs text-red-600 md:text-base">
                              {convertToMonney(item?.sale)}
                            </span>
                            <span className="text-xs line-through md:text-sm">
                              {convertToMonney(item?.price)}
                            </span>
                          </div>
                          <p>Số lượng : {item?.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Thông tin khách hàng */}
          <div className="mt-[24px]">
            <h1>THÔNG TIN KHÁCH HÀNG</h1>

            <div className="mt-[15px] rounded-[10px] border-[0.8px] border-[#919eab3d] bg-white p-4">
              <div className="flex justify-between">
                <span>{user?.name}</span>
                <span>SĐT : {user?.phone}</span>
              </div>
            </div>
          </div>
          {/* Thông tin đỉa chỉ */}
          <div className="mt-[24px]">
            <h1>THÔNG TIN NHẬN HÀNG</h1>
            <div className="mt-[15px] rounded-[10px] border-[0.8px] border-[#919eab3d] bg-white p-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  name="address"
                  defaultChecked
                  onChange={handleOnchangeAddressOption}
                  value="1"
                />
                Địa chỉ : {user?.address}
              </div>
              <div className="mt-5 flex items-center ">
                <input
                  type="radio"
                  className="mr-2"
                  name="address"
                  onChange={handleOnchangeAddressOption}
                  value="2"
                />
                Địa chỉ mới
              </div>
              {addressOption == 2 && (
                <AddressSelection
                  getProvice={getProvice}
                  getDistrict={getDistrict}
                  getWard={getWard}
                />
              )}

              <div className="input-group">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú : Màu sắc, số nhà ..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shawdow_custom fixed bottom-0 w-[95%] rounded-md bg-white p-4 lg:w-[700px]">
        <div className="flex justify-between">
          <span>Tổng tiền tạm tính:</span>
          <span className="text-red-600">{convertToMonney(totalMonney)}</span>
        </div>
        <button
          className="mt-1 w-full rounded-md bg-red-600 py-3 text-white"
          onClick={handlNextPayment}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
