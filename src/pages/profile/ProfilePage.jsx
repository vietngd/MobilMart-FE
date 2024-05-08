import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from "../../services/userServices.js";
import { useMutationHook } from "../../hooks/userMutationHook";
import { updateUser } from "../../redux/slides/userSlice.js";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { getBase64 } from "../../ultils.js";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [message, setMessage] = useState("");

  const mutation = useMutationHook(async ({ access_token, ...rest }) => {
    const res = await UserServices.updateUser(rest, access_token);
    return res;
  });
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
    const data = {
      id: user?.id,
      name: name !== null ? name : " ",
      avatar: avatar !== null ? avatar : " ",
      address: address !== null ? address : " ",
      phone: phone !== null ? phone : " ",
    };

    const res = await mutation.mutateAsync({
      ...data,
      access_token: user?.access_token,
    });
    setMessage(res?.message);
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
            <span className="mr-4 block min-w-24">Địa chỉ</span>
            <div className="flexitems-center h-full flex-1 justify-center">
              <div className=" h-full">
                <input
                  type="text"
                  id="username"
                  className="peer h-full w-full border-b py-1 transition-colors focus:border-b-2 focus:border-red-400 focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
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
        <span className="absolute bottom-4 right-6 text-primary">
          {message}
        </span>
        <button
          className="btn h-10 w-24 text-center"
          onClick={handleUpdateUser}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
