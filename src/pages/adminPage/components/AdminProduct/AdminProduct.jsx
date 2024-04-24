import { Modal, Checkbox, Form, Input, Select, Button } from "antd";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useMutationHook } from "../../../../hooks/userMutationHook.js";
import * as ProductServices from "../../../../services/productServices.js";
import * as CategoryServices from "../../../../services/categoryServices.js";
import { useQuery } from "@tanstack/react-query";
const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    description: "",
    hot: false,
    price: "",
    sale: "",
    quantity: "",
    category_id: "g7Ph8CmTazu6vndHbVAuBGMUa",
    configuration: "",
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
      configuration:
        stateProduct.configuration !== null ? stateProduct.configuration : " ",
    };

    mutation.mutateAsync(data);
    console.log(stateProduct);
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value || e.target.checked,
    });
  };

  const handleOnchangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      category_id: value,
    });
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
          onFinish={handleOk}
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

          <Form.Item label="Cấu hình">
            <Input
              onChange={handleOnchange}
              name="configuration"
              required
              value={stateProduct.configuration}
            />
          </Form.Item>

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
