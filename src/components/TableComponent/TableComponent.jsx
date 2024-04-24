import { Space, Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
  },
  {
    title: "Address",
    key: "Address",
    dataIndex: "Address",
  },
  {
    title: "Permission",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    Name: "Nghiêm Hồng",
    Email: "hung24855@gmail.com",
    Phone: "Yên Phong - Bắc Ninh",
    Address: ["nice", "developer"],
  },
  {
    key: "2",
    Name: "Nghiêm Hồng",
    Email: "hung24855@gmail.com",
    Phone: "Yên Phong - Bắc Ninh",
    Address: ["nice", "developer"],
  },
  {
    key: "3",
    Name: "Nghiêm Hồng",
    Email: "hung24855@gmail.com",
    Phone: "Yên Phong - Bắc Ninh",
    Address: ["nice", "developer"],
  },
];
const TableComponent = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableComponent;
