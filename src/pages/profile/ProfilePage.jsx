import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from "../../services/userServices.js";
import { useMutationHook } from "../../hooks/userMutationHook";
import { updateUser } from "../../redux/slides/userSlice.js";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { getBase64 } from "../../ultils.js";
import ModalComponent from "../../components/Modal/ModalComponent.jsx";
import AddressSelection from "../../components/AddressSelection/AddressSelection.jsx";
import * as Message from "../../components/Message/MessageComponent";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const mutation = useMutationHook(
    async ({ access_token, user_id, ...rest }) => {
      const res = await UserServices.updateUser(rest, access_token, user_id);
      return res;
    },
  );
  const dispatch = useDispatch();
  const { isSuccess, isError } = mutation;

  useEffect(() => {
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailUser(user?.id, user?.access_token);
    }
  }, [isSuccess, isError]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdateUser = async () => {
    if (!name) {
      Message.error("Vui lòng nhập tên!");
    } else if (!phone) {
      Message.error("Vui lòng nhập số điện thoại!");
    } else if (!user?.address && (!province || !district || !ward)) {
      Message.error("Vui lòng chọn địa chỉ để tiếp tục!");
    } else {
      const regexPhoneNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
      if (!regexPhoneNumber.test(phone)) {
        Message.error("Vui lòng nhập đúng số điện thoại!");
      } else {
        const data = {
          name: name,
          avatar: avatar || " ",
          address:
            province && district && ward
              ? `${province}- ${district} - ${ward}`
              : user?.address,
          phone: phone,
        };

        const res = await mutation.mutateAsync({
          ...data,
          access_token: user?.access_token,
          user_id: user?.id,
        });
        if (res.status === "OK") {
          setProvince("");
          setDistrict("");
          setWard("");
        }
        Message.success(res?.message);
      }
    }
  };

  const handleUploadAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setAvatar(file.preview);
    }
  };
  const getProvice = (province) => {
    setProvince(province);
  };
  const getDistrict = (district) => {
    setDistrict(district);
  };

  const getWard = (ward) => {
    setWard(ward);
  };

  return (
    <div className="m-auto max-w-screen-xl">
      <h1 className=" text-center text-2xl font-semibold">
        Thông tin người dùng
      </h1>
      <div className="relative mx-auto my-0 mt-2 w-1/2 rounded-lg border p-5 shadow">
        <div className="relative mb-4 h-28 w-full">
          <img
            className="absolute right-1/2 h-24 w-24 translate-x-1/2 cursor-pointer rounded-full bg-gray-400 object-center"
            src={avatar}
          ></img>
        </div>
        <ul className="mb-4">
          <li className="mb-8 flex  items-center">
            <span className="mr-4 block min-w-24">Tên</span>
            <div className="flexitems-center h-full flex-1 justify-center">
              <div className=" h-full">
                <input
                  type="text"
                  id="username"
                  className="peer h-full w-full border-b py-1 transition-colors focus:border-b-2 focus:border-red-400 focus:outline-none"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </li>
          <li className="mb-8 flex items-center">
            <span className="mr-4 block min-w-24">Email</span>
            <div className="flexitems-center h-full flex-1 justify-center">
              <div className=" h-full">
                <input
                  type="text"
                  id="username"
                  className="peer h-full w-full border-b bg-white py-1 transition-colors focus:border-b-2 focus:border-red-400 focus:outline-none"
                  autoComplete="off"
                  value={user.email}
                  disabled
                />
              </div>
            </div>
          </li>
          <li className="mb-8 flex items-center">
            <span className="mr-4 block min-w-24">Avatar</span>
            <Upload onChange={handleUploadAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </li>
          <li className="mb-8 flex items-center">
            <span className="mr-4 block min-w-24 ">Địa chỉ</span>

            {address ? (
              <span className="flex w-full items-center justify-between">
                <span>{address}</span>
                <button
                  className="ml-2 rounded-md border border-primary px-2 py-1 hover:border-red-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  Sửa
                </button>
              </span>
            ) : (
              <button
                className="rounded-md border px-2 py-1 hover:border-red-500"
                onClick={() => setIsModalOpen(true)}
              >
                Cập nhật
              </button>
            )}
          </li>
          <li className="mb-8 flex items-center">
            <span className="mr-4 block min-w-24">Số điện thoại</span>
            <div className="flexitems-center h-full flex-1 justify-center">
              <div className="relative h-full">
                <input
                  type="text"
                  id="username"
                  className="peer h-full w-full border-b py-1 transition-colors focus:border-b-2 focus:border-red-400 focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </li>
        </ul>

        <button
          className="btn h-10 w-24 text-center"
          onClick={handleUpdateUser}
        >
          Cập nhật
        </button>
      </div>
      <ModalComponent
        title="Chọn địa chỉ"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
        width={"700px"}
      >
        <AddressSelection
          getProvice={getProvice}
          getDistrict={getDistrict}
          getWard={getWard}
        />
      </ModalComponent>
    </div>
  );
};

export default ProfilePage;
