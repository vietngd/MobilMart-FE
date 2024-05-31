import { Button, Checkbox, Form, Input, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBase64 } from "../../../../ultils";
import * as message from "../../../../components/Message/MessageComponent";

const CreateProductForm = ({
  isModalCreateProduct,
  onCancel,
  handleNextModal,
  resultCreateProduct,
  isModalConfig,
}) => {
  const categories = useSelector((state) => state.categories);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    images: "",
    hot: false,
    price: "",
    sale: "",
    quantity: "",
    category_id: "A8eZz97VJ74KlZ5HxcSN6zlf2", //Mặc định là samsung,
  });

  const [fileList, setFileList] = useState([]);

  // Láy thông tin của product lưu vào State
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value || e.target.checked,
    });
  };

  // Lấy id category
  const handleOnchangeSelect = (category_id) => {
    setStateProduct({
      ...stateProduct,
      category_id: category_id,
    });
  };

  //Onchange img
  const onchangeUpload = async ({ fileList }) => {
    setFileList(fileList); // Set số lượng ảnh đã chọn vào state để hiển thị lên form
    const images = [];
    await Promise.all(
      fileList.map(async (item) => {
        images.push(await getBase64(item.originFileObj));
      }),
    );
    setStateProduct({
      ...stateProduct,
      images: images,
    });
  };

  // Xóa stateProduct khi tạo thành công
  useEffect(() => {
    if (resultCreateProduct) {
      setStateProduct({
        name: "",
        images: "",
        description: " ",
        hot: false,
        price: " ",
        sale: " ",
        quantity: " ",
        category_id: "A8eZz97VJ74KlZ5HxcSN6zlf2", //Mặc định là samsung,
      });
      setFileList([]);
    }
  }, [resultCreateProduct]);

  // Xóa stateProduct khi cancel ở form nhập thông tin sản phẩm
  useEffect(() => {
    if (!isModalCreateProduct && !isModalConfig) {
      setStateProduct({
        name: "",
        images: "",
        description: " ",
        hot: false,
        price: " ",
        sale: " ",
        quantity: " ",
        category_id: "A8eZz97VJ74KlZ5HxcSN6zlf2", //Mặc định là samsung,
      });
      setFileList([]);
    }
  }, [isModalCreateProduct]);

  // Truyền thông tin sản phẩm lên component cha
  const onFinish = () => {
    if (fileList.length > 0) {
      handleNextModal(stateProduct);
    } else {
      message.error("Vui lòng chọn ảnh");
    }
  };

  return (
    <Modal
      title="Thêm sản phẩm"
      open={isModalCreateProduct}
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
        onFinish={onFinish}
      >
        <Form.Item label="Tên">
          <Input
            onChange={handleOnchange}
            name="name"
            value={stateProduct.name}
            required
          />
        </Form.Item>

        <Form.Item label="Hot" name="disabled">
          <Checkbox
            onChange={handleOnchange}
            name="hot"
            checked={stateProduct.hot}
          ></Checkbox>
        </Form.Item>
        <Form.Item label="Ảnh" valuePropName="fileList">
          <Upload
            listType="picture-card"
            multiple={true}
            onChange={onchangeUpload}
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
            type="number"
            value={stateProduct.price}
          />
        </Form.Item>
        <Form.Item label="Giá sale">
          <Input
            style={{ width: "150px" }}
            onChange={handleOnchange}
            name="sale"
            required
            type="number"
            value={stateProduct.sale}
          />
        </Form.Item>
        <Form.Item label="Số lượng">
          <Input
            style={{ width: "50px" }}
            onChange={handleOnchange}
            name="quantity"
            required
            type="number"
            value={stateProduct.quantity}
          />
        </Form.Item>
        <Form.Item label="Danh mục">
          <Select
            style={{ width: "200px" }}
            onChange={handleOnchangeSelect}
            name="category_id"
            value={stateProduct.category_id || categories[0]?.id}
          >
            {categories &&
              categories.map((item) => {
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
  );
};

export default CreateProductForm;
