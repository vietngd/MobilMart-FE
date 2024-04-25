import { Modal, Checkbox, Form, Input, Select, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useMutationHook } from "../../../../hooks/userMutationHook.js";
import * as ProductServices from "../../../../services/productServices.js";
import * as CategoryServices from "../../../../services/categoryServices.js";
import { useQuery } from "@tanstack/react-query";
import { getBase64 } from "../../../../ultils.js";

const AdminProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfig, setIsModalCopnfig] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    description: "",
    hot: false,
    price: "",
    sale: "",
    quantity: "",
    category_id: "g7Ph8CmTazu6vndHbVAuBGMUa",
  });
  const [configProduct, setConfigProduct] = useState({
    ScreenSize: "",
    ScreenTechnology: "",
    BeforeCamera: "",
    AfterCamera: "",
    Chipset: "",
    Ram: "",
    Storage: "",
    Battery: "",
    OperatingSystem: "",
    ScreenResolution: "",
  });

  const fetchAllCategory = async () => {
    const res = await CategoryServices.getAllCategory();
    return res;
  };
  const { data: resCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchAllCategory(),
    retry: 3,
    retryDelay: 1000,
  });

  const mutation = useMutationHook(async (data) => {
    const res = await ProductServices.createProduct(data);
    return res;
  });

  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess & (data?.status === "OK")) {
      onCancel();
    }
  }, [isSuccess, isError]);

  // Tạo mới sản phẩm khi click vào nút OK
  const handleOk = async () => {
    const data = {
      name: stateProduct.name !== null ? stateProduct.name : " ",
      description:
        stateProduct.description !== null ? stateProduct.description : " ",
      hot: stateProduct.hot !== null ? stateProduct.hot : false,
      price: stateProduct.price !== null ? stateProduct.price : " ",
      sale: stateProduct.sale !== null ? stateProduct.sale : " ",
      quantity: stateProduct.quantity !== null ? stateProduct.quantity : " ",
      category_id:
        stateProduct.category_id !== null ? stateProduct.category_id : " ",
      configuration: JSON.stringify(configProduct),
      images: images || " ",
    };
    mutation.mutateAsync(data);
  };

  // Láy thông tin của product lưu vào State
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value || e.target.checked,
    });
  };
  // Láy thông tin cấu hình của product lưu vào State
  const handleOnchangeConfig = (e) => {
    setConfigProduct({
      ...configProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      category_id: value,
    });
  };

  const handleRemove = () => {
    setFileList([]); // Xóa tất cả các tệp đã chọn bằng cách cập nhật fileList về mảng rỗng
  };

  const onCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      description: "",
      hot: false,
      price: "",
      sale: "",
      quantity: "",
      category_id: "g7Ph8CmTazu6vndHbVAuBGMUa",
      configuration: "",
    });

    setIsModalCopnfig(false);

    setConfigProduct({
      ScreenSize: "",
      ScreenTechnology: "",
      BeforeCamera: "",
      AfterCamera: "",
      Chipset: "",
      Ram: "",
      Storage: "",
      Battery: "",
      OperatingSystem: "",
      ScreenResolution: "",
    });
    handleRemove();
  };

  // Xử lý up ảnh lên cloudinary

  const handleUpload = async ({ fileList }) => {
    setFileList(fileList); // Set số lượng ảnh đã chọn vào state để hiển thị lên form
    const images = [];
    await Promise.all(
      fileList.map(async (item) => {
        images.push(await getBase64(item.originFileObj));
      }),
    );
    setImages(images);
  };
  //Chuyển sang modal nhập cấu hình
  const handleNextModal = () => {
    setIsModalOpen(false);
    setIsModalCopnfig(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
      <button
        className="btn mt-4 bg-[#1677FF] px-5"
        onClick={() => setIsModalOpen(true)}
      >
        Thêm sản phẩm
      </button>
      <div className="mt-4">
        <TableComponent />
      </div>
      <Modal
        title="Thêm sản phẩm"
        open={isModalOpen}
        onCancel={onCancel}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
        footer={null}
        width={900}
      >
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
          onFinish={handleNextModal}
        >
          <Form.Item label="Tên">
            <Input
              onChange={handleOnchange}
              name="name"
              value={stateProduct.name}
              required
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <TextArea
              rows={4}
              onChange={handleOnchange}
              name="description"
              value={stateProduct.description}
            />
          </Form.Item>
          <Form.Item label="Hot" name="disabled" valuePropName="checked">
            <Checkbox onChange={handleOnchange} name="hot"></Checkbox>
          </Form.Item>
          <Form.Item label="Ảnh" valuePropName="fileList">
            <Upload
              listType="picture-card"
              multiple={true}
              onChange={handleUpload}
              fileList={fileList}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Giá gốc">
            <Input
              style={{ width: "150px" }}
              onChange={handleOnchange}
              name="price"
              required
              value={stateProduct.price}
            />
          </Form.Item>
          <Form.Item label="Giá sale">
            <Input
              style={{ width: "150px" }}
              onChange={handleOnchange}
              name="sale"
              required
              value={stateProduct.sale}
            />
          </Form.Item>
          <Form.Item label="Số lượng">
            <Input
              style={{ width: "50px" }}
              onChange={handleOnchange}
              name="quantity"
              required
              value={stateProduct.quantity}
            />
          </Form.Item>
          <Form.Item label="Danh mục">
            <Select
              style={{ width: "200px" }}
              onChange={handleOnchangeSelect}
              name="category_id"
              defaultValue="Iphone"
            >
              {resCategory?.categories.map((item) => {
                return (
                  <Select.Option value={item.id} key={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <div className="flex w-full justify-end">
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#1677FF", marginLeft: "12px" }}
            >
              Nhập cấu hình
            </Button>
          </div>
        </Form>
      </Modal>
      {/* Form nhập cấu hình điện thoại */}
      <Modal
        title="Cấu hình sản phẩm"
        open={isModalConfig}
        onCancel={onCancel}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
        footer={null}
        width={500}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            width: "100%",
            marginTop: 20,
          }}
          onFinish={handleOk}
        >
          {Object.keys(configProduct).map((key) => (
            <Form.Item key={key} label={key}>
              <Input
                onChange={handleOnchangeConfig}
                name={key}
                value={configProduct[key]}
                required
              />
            </Form.Item>
          ))}

          <div className="flex w-full justify-end">
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#1677FF", marginLeft: "12px" }}
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
