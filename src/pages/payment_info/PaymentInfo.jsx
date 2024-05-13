import { FaArrowLeftLong } from "react-icons/fa6";

import { convertToMonney } from "../../ultils";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { addOrderInfo } from "../../redux/slides/orderSlice";

const PaymentInfo = () => {
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const selectedProducts = location.state;

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [note, setNote] = useState();

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

  //Fetch thông tin tỉnh thành
  const fetchProvince = async () => {
    //Thành phố
    try {
      const res = await axios.get(`https://vapi.vnappmob.com/api/province/`);
      setWard([]);
      return res.data?.results;
    } catch (error) {
      console.log("Err fetch Province", error);
    }
  };

  const handleProvinceChange = async (e) => {
    try {
      const province_id = e.target.value;
      //Tỉnh
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province_id}`,
      );

      setDistrict(res.data?.results);
      setWard([]);
      setSelectedProvince(e.target.options[e.target.selectedIndex].text);
      setSelectedDistrict("");
      setSelectedWard("");
    } catch (error) {
      console.log("Err fetch district", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const district_id = e.target.value;
    //Huyện
    try {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
      );

      setWard(res.data?.results);
      setSelectedDistrict(e.target.options[e.target.selectedIndex].text);
      setSelectedWard("");
    } catch (error) {
      console.log("Err fetch ward", error);
    }
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.options[e.target.selectedIndex].text);
  };

  useEffect(() => {
    async function fetchData() {
      setProvince(await fetchProvince());
    }
    fetchData();
  }, []);

  const handlNextPayment = () => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      dispatch(
        addOrderInfo({
          address: `${selectedProvince} - ${selectedDistrict} - ${selectedWard}`,
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
    }
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
                            <span className="mr-2 text-red-600">
                              {convertToMonney(item?.sale)}
                            </span>
                            <span className="text-sm line-through">
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
                <div className="mr-1 flex h-4 w-4 items-center justify-center rounded-full border border-red-600">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                </div>
                Giao hàng tận nơi
              </div>
              <div className=" mt-5 flex gap-x-2">
                {/* Chọn địa chỉ */}
                <select
                  className="flex-1 rounded border py-3 outline-none"
                  onChange={handleProvinceChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Chọn thành phố
                  </option>
                  {province?.map((item) => {
                    return (
                      <option
                        value={item.province_id}
                        key={item.province_id}
                        className="py-2 hover:bg-gray-200"
                        name={item.province_name}
                      >
                        {item.province_name}
                      </option>
                    );
                  })}
                </select>
                <select
                  className="flex-1 rounded border py-3 outline-none"
                  onChange={handleDistrictChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Chọn tỉnh thành
                  </option>
                  {district &&
                    district?.map((item) => {
                      return (
                        <option
                          value={item.district_id}
                          key={item.district_id}
                          className="py-2 hover:bg-gray-200"
                        >
                          {item.district_name}
                        </option>
                      );
                    })}
                </select>
                <select
                  className="flex-1 rounded border py-3 outline-none"
                  onChange={handleWardChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Chọn huyện
                  </option>
                  {ward &&
                    ward?.map((item) => {
                      return (
                        <option
                          value={item.ward_id}
                          key={item.ward_id}
                          className="py-2 hover:bg-gray-200"
                        >
                          {item.ward_name}
                        </option>
                      );
                    })}
                </select>
              </div>

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
      <div className="shawdow_custom fixed bottom-0 w-[700px] rounded-md bg-white p-4">
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
