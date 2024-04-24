import { Modal } from "antd";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import { useState } from "react";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {};
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      <button
        className="btn mt-4 bg-[#1677FF] px-5"
        onClick={() => setIsModalOpen(true)}
      >
        Thêm người dùng
      </button>
      <div className="mt-4">
        <TableComponent />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default AdminUser;
