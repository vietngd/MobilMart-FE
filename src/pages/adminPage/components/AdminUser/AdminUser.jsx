import { Button, Form, Modal, Select, Space } from "antd";
import { useEffect, useState } from "react";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import * as Userservices from "../../../../services/userServices.js";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../../../hooks/userMutationHook.js";
import Loading from "../../../../components/Loading/LoadingComponent.jsx";
import ModalComponent from "../../../../components/Modal/ModalComponent.jsx";
import * as message from "../../../../components/Message/MessageComponent.jsx";

const AdminUser = () => {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [stateUser, setStateUser] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Admin",
      key: "isAdmin",
      dataIndex: "isAdmin",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button
            className="rounded border border-blue px-2 py-1"
            onClick={() => setIsModalOpen(true)}
          >
            Sửa quyền
          </button>
          <button
            className="rounded border border-red-600 px-2 py-1"
            onClick={() => setIsModalOpenDelete(true)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const fetchUsers = async (access_token) => {
    const res = await Userservices.getAllUser(access_token);
    return res;
  };

  const queryUser = useQuery({
    queryKey: ["Users"],
    queryFn: () => fetchUsers(user?.access_token),
    retry: 3,
    retryDelay: 1000,
  });

  const { data: Users, isLoading } = queryUser;

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnchangeRole = (value) => {
    setStateUser({
      ...stateUser,
      isAdmin: value,
    });
  };

  const mutation = useMutationHook(async ({ access_token, ...rest }) => {
    const res = await Userservices.updateUser(rest, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(async (data) => {
    const { id, access_token } = data;
    const res = await Userservices.deleteUser(id, access_token);
    return res;
  });

  const { data, isSuccess, isError, isPending } = mutation;
  const {
    data: dataDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
  } = mutationDelete;
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessDelete && dataDelete?.status === "OK") {
      message.success();
      handleCancelDelete();
    }
  }, [isSuccessDelete, isErrorDelete]);
  const handleChangeRole = () => {
    const dataUser = {
      id: stateUser.id || " ",
      isAdmin: stateUser?.isAdmin,
    };

    mutation.mutateAsync(
      {
        ...dataUser,
        access_token: user?.access_token,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    const data = {
      id: stateUser?.id,
      access_token: user?.access_token,
    };

    mutationDelete.mutateAsync(data, {
      onSettled: () => {
        queryUser.refetch();
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý người dùng</h1>

      <div className="mt-4">
        <TableComponent
          columms={columns}
          dataProp={Users?.data}
          isLoading={isLoading}
          onRow={(record) => {
            return {
              onClick: () => {
                setStateUser({
                  ...record,
                });
              }, // click row
            };
          }}
        />
      </div>

      <Modal
        title="Sửa quyền"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
        footer={null}
      >
        <Loading isLoading={isPending}>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              width: "100%",
              marginTop: 20,
            }}
            onFinish={handleChangeRole}
          >
            <Form.Item label="Quyền">
              <Select
                style={{ width: "200px" }}
                onChange={handleOnchangeRole}
                defaultValue={false}
              >
                <Select.Option value={false}>User</Select.Option>
                <Select.Option value={true}>Admin</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex w-full justify-end">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "#1677FF", marginLeft: "12px" }}
              >
                Cập nhật
              </Button>
            </div>
          </Form>
        </Loading>
      </Modal>
      <Loading isLoading={isPendingDelete}>
        <ModalComponent
          title="Xóa người dùng"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteUser}
          okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
        >
          <div>
            Bạn có chắc xóa{" "}
            <span className="text-primary">{stateUser?.name}</span> không?
          </div>
        </ModalComponent>
      </Loading>
    </div>
  );
};

export default AdminUser;
