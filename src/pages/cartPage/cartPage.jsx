import { useDispatch, useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import {
  decreaseQuantity,
  increaseQuantity,
  removeAllOrder,
  removeOrder,
} from "../../redux/slides/orderSlice";
import cartEmpty from "../../assets/images/empty-cart.png";
import { useEffect, useState } from "react";
import { convertToMonney, validation } from "../../ultils";
import ModalComponent from "../../components/Modal/ModalComponent.jsx";
import * as message from "../../components/Message/MessageComponent";
import { useMutationHook } from "../../hooks/userMutationHook.js";
import * as UserServices from "../../services/userServices.js";
import Loading from "../../components/Loading/LoadingComponent.jsx";
import { updateUser } from "../../redux/slides/userSlice.js";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
} from "@mui/material";
const CartPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [infoUser, setInfoUser] = useState({});
  const [listChecked, setListChecked] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  //Thay đổi số lượng của sản phẩm (Done)
  const handleQuantityProduct = (type, product_id) => {
    if (type === "decrease") {
      dispatch(decreaseQuantity({ user_id: user?.id, product_id }));
    } else {
      dispatch(increaseQuantity({ user_id: user?.id, product_id }));
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Tính tổng tiền những đơn hàng được chọn (Done)
  const products = orders?.orderItems.find(
    (item) => item.user_id === user?.id,
  )?.products;
  const totalAmount = products
    ?.filter((product) => listChecked.includes(product.product_id))
    .reduce((total, product) => {
      return total + product.quantity * product.sale;
    }, 0);

  //Xử lý việc kick chọn tất cả sản phẩm (Done)
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      let newListChecked = [];
      orders?.orderItems
        .find((item) => item.user_id === user?.id)
        ?.products?.forEach((item) => {
          newListChecked.push(item?.product_id);
        });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  //Xử lý việc chọn sản phẩm (Done)
  const onchangeItem = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value,
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  //Xóa tất cả sản phẩm đã chọn (Done)
  const handleRemoveALl = () => {
    if (listChecked.length > 0)
      dispatch(removeAllOrder({ user_id: user?.id, product_ids: listChecked }));
  };
  //Sự kiện khi kick vào nút Mua ngay
  const handleBtnBuy = () => {
    if (listChecked.length === 0) {
      message.error("Vui lòng chọn sản phẩm");
    } else {
      const keysToCheck = ["name", "phone", "address"];
      keysToCheck.forEach((key) => {
        if (!user[key]) {
          infoUser[key] = "";
        }
      });
      //Nếu user thiếu thông tin thì mở modal nhập thông tin
      if (!(Object.keys(infoUser).length === 0)) {
        setIsOpenModal(true);
      } else {
        navigate("/cart/payment-info", { state: listChecked });
      }
    }
  };
  //Sự kiện khi kick dấu X
  const handleCancel = () => {
    setIsOpenModal(false);
    setValidationMessage("");
  };

  //Lưu lại thông tin bổ sung của người dùng
  const handleOnchangeInfoUser = (e) => {
    setInfoUser({
      ...infoUser,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutationHook(async ({ access_token, id, ...rest }) => {
    const res = await UserServices.updateUser(rest, access_token, id);
    return res;
  });

  const { data: updateUserRes, isSuccess, isError, isPending } = mutation;
  //Cập nhật thông tin của user sau khi update vào redux
  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    if (isSuccess && updateUserRes?.status === "OK") {
      setIsOpenModal(false);
      setInfoUser({});
      handleGetDetailUser(user?.id, user?.access_token);
    }
  }, [isSuccess, isError]);

  //Khi người dùng chưa cập nhập thông tin đầy đủ
  const handleContinue = async () => {
    setValidationMessage(validation(infoUser));
    if (!validation(infoUser)) {
      const data = {
        ...infoUser,
        id: user?.id,
      };
      mutation.mutateAsync({
        ...data,
        access_token: user?.access_token,
      });
    }
  };

  return (
    <>
      {orders?.orderItems.find((item) => item.user_id === user?.id)?.products
        ?.length > 0 ? (
        <div className="h-auto rounded-md bg-cart_bg px-2">
          <div className="flex gap-2 py-5">
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <KeyboardBackspaceIcon />
            </div>
            <div className=" text-[20px] font-bold">Thông tin giỏ hàng</div>
          </div>
          <div className="m-auto grid grid-cols-4 gap-x-3 xl:max-w-screen-xl">
            {/* table */}
            <div className="relative col-span-4 mb-6 bg-white lg:col-span-3">
              <TableContainer>
                <Table
                  size="small"
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #ddd",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <div>
                          <Checkbox
                            onChange={handleCheckAll}
                            checked={
                              listChecked.length ===
                              orders?.orderItems.find(
                                (item) => item.user_id === user?.id,
                              )?.products.length
                            }
                            inputProps={{ "aria-label": "select all products" }}
                          />
                          Tất cả (
                          {
                            orders?.orderItems.find(
                              (item) => item.user_id === user?.id,
                            )?.products.length
                          }
                          sản phẩm)
                        </div>
                      </TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Tổng tiền</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={handleRemoveALl}>
                          <div className="text-[14px] text-black">Xóa</div>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.orderItems
                      .find((item) => item.user_id === user?.id)
                      ?.products.map((item) => (
                        <TableRow key={item.product_id}>
                          <TableCell>
                            <div className="flex">
                              <Checkbox
                                onChange={onchangeItem}
                                value={item.product_id}
                                checked={listChecked.includes(item.product_id)}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt="img"
                                  style={{ width: "80px", marginRight: "10px" }}
                                />
                                <div>
                                  <p>{item.name}</p>
                                  <p className="text-xs md:text-base">
                                    <span className="mr-2 text-red-600">
                                      {convertToMonney(item?.sale)}
                                    </span>
                                    <span className="text-xs line-through md:text-sm">
                                      {convertToMonney(item?.price)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "right",
                                justifyContent: "right",
                              }}
                            >
                              <button
                                onClick={() =>
                                  handleQuantityProduct(
                                    "decrease",
                                    item.product_id,
                                  )
                                }
                              ></button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => {
                                  handleQuantityProduct(
                                    "increase",
                                    item.product_id,
                                  );
                                  if (
                                    item.quantity === item.quantity_remaining
                                  ) {
                                    message.error("Quá số lượng tồn kho!");
                                  }
                                }}
                              ></button>
                            </div>
                          </TableCell>
                          <TableCell align="right" className="text-red-600">
                            {convertToMonney(item?.sale * item.quantity)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() =>
                                dispatch(
                                  removeOrder({
                                    user_id: user?.id,
                                    product_id: item.product_id,
                                  }),
                                )
                              }
                            >
                              <FaTrashCan size={"1.3rem"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {/* tạm tính */}
            <div className="col-span-4 lg:col-span-1">
              <div className=" rounded-md bg-white p-4">
                <div className=" flex flex-col gap-y-5">
                  <p className="flex justify-between">
                    Tạm tính :
                    <span className="text-red-600">
                      {convertToMonney(totalAmount)}
                    </span>
                  </p>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    className="rounded-md border bg-red-600 px-10 py-2 text-white"
                    onClick={handleBtnBuy}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
            <ModalComponent
              title="BỔ SUNG THÔNG TIN KHÁCH HÀNG"
              open={isOpenModal}
              onCancel={handleCancel}
              okText="Tiếp tục"
              okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
              footer={null}
            >
              <Loading isLoading={isPending}>
                {Object.keys(infoUser).map((key) => (
                  <div className="mb-8 mt-4" key={key}>
                    <span className="mr-4 block min-w-20">
                      {key === "name"
                        ? "Tên"
                        : key === "phone"
                          ? "Số điện thoại"
                          : "Địa chỉ"}
                      :
                    </span>
                    <div className="flexitems-center h-full flex-1 justify-center">
                      <div className="relative h-full">
                        <input
                          type={key === "phone" ? "number" : "Text"}
                          className="peer h-full w-full border-b py-1 transition-colors focus:border-b-2 focus:border-red-400 focus:outline-none"
                          value={infoUser[key]}
                          name={key}
                          onChange={handleOnchangeInfoUser}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <span className="block h-7 w-full text-right text-red-600">
                  {validationMessage}
                </span>

                <button
                  type="submit"
                  onClick={handleContinue}
                  className="rounded-md border bg-red-600 px-5 py-2 text-white"
                >
                  Tiếp tục
                </button>
              </Loading>
            </ModalComponent>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img src={cartEmpty} alt="cartEmpty" />
        </div>
      )}
    </>
  );
};

export default CartPage;
