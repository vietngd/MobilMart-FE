import { Button, Form, Input, Modal } from "antd";
// import Loading from "../../../../components/Loading/LoadingComponent";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/userMutationHook";
import * as ProductServices from "../../../../services/productServices.js";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/LoadingComponent.jsx";
import * as message from "../../../../components/Message/MessageComponent.jsx";

const ConfigProductForm = ({
  isModalConfig,
  stateProduct,
  getResultCreateProduct,
  onCancel,
  queryProduct,
}) => {
  const user = useSelector((state) => state.user);
  //   Lưu thông tin cấu hình của sản phẩm
  const [stateConfigProduct, setStateConfigProduct] = useState({
    screen_size: "",
    screen_technology: "",
    before_camera: "",
    after_camera: "",
    chipset: "",
    ram: "",
    storage: "",
    battery: "",
    operating_system: "",
    screen_resolution: "",
  });

  //   Láy thông tin cấu hình của product lưu vào State
  const handleOnchangeConfig = (e) => {
    setStateConfigProduct({
      ...stateConfigProduct,
      [e.target.name]: e.target.value,
    });
  };

  const mutationCreateProduct = useMutationHook(async (data) => {
    const { access_token, ...rest } = data;
    const res = await ProductServices.createProduct(access_token, rest);
    return res;
  });

  const { data, isSuccess, isError, isPending } = mutationCreateProduct;

  const handleCreateProduct = () => {
    const data = {
      access_token: user?.access_token,
      product: stateProduct,
      configuration: stateConfigProduct,
    };
    mutationCreateProduct.mutateAsync(data, {
      onSettled: () => {
        queryProduct?.refetch();
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      getResultCreateProduct(true);
      setStateConfigProduct({
        screen_size: "",
        screen_technology: "",
        before_camera: "",
        after_camera: "",
        chipset: "",
        ram: "",
        storage: "",
        battery: "",
        operating_system: "",
        screen_resolution: "",
      });
    } else if (isSuccess && data?.status !== "OK") {
      message.error("Cõ lỗi thử lại sau!");
    }
  }, [isSuccess, isError]);
  const Cancel = () => {
    onCancel();
    setStateConfigProduct({
      screen_size: "",
      screen_technology: "",
      before_camera: "",
      after_camera: "",
      chipset: "",
      ram: "",
      storage: "",
      battery: "",
      operating_system: "",
      screen_resolution: "",
    });
  };

  return (
    <Modal
      title="Cấu hình sản phẩm"
      open={isModalConfig}
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      footer={null}
      width={500}
    >
      <Loading isLoading={isPending}>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            width: "100%",
            marginTop: 20,
          }}
          onFinish={handleCreateProduct}
        >
          <Form.Item label="Kích thước màn hình">
            <Input
              onChange={handleOnchangeConfig}
              name="screen_size"
              value={stateConfigProduct.screen_size}
              required
            />
          </Form.Item>
          <Form.Item label="Công nghệ màn hình">
            <Input
              onChange={handleOnchangeConfig}
              name="screen_technology"
              value={stateConfigProduct.screen_technology}
              required
            />
          </Form.Item>
          <Form.Item label="Camera trước">
            <Input
              onChange={handleOnchangeConfig}
              name="before_camera"
              value={stateConfigProduct.before_camera}
              required
            />
          </Form.Item>
          <Form.Item label="Camera sau">
            <Input
              onChange={handleOnchangeConfig}
              name="after_camera"
              value={stateConfigProduct.after_camera}
              required
            />
          </Form.Item>
          <Form.Item label="Chip">
            <Input
              onChange={handleOnchangeConfig}
              name="chipset"
              value={stateConfigProduct.chipset}
              required
            />
          </Form.Item>
          <Form.Item label="Ram">
            <Input
              onChange={handleOnchangeConfig}
              name="ram"
              value={stateConfigProduct.ram}
              required
            />
          </Form.Item>
          <Form.Item label="Bộ nhớ">
            <Input
              onChange={handleOnchangeConfig}
              name="storage"
              value={stateConfigProduct.storage}
              required
            />
          </Form.Item>
          <Form.Item label="Pin">
            <Input
              onChange={handleOnchangeConfig}
              name="battery"
              value={stateConfigProduct.battery}
              required
            />
          </Form.Item>
          <Form.Item label="Hệ điều hành">
            <Input
              onChange={handleOnchangeConfig}
              name="operating_system"
              value={stateConfigProduct.operating_system}
              required
            />
          </Form.Item>
          <Form.Item label="Độ phân giải màn hình">
            <Input
              onChange={handleOnchangeConfig}
              name="screen_resolution"
              value={stateConfigProduct.screen_resolution}
              required
            />
          </Form.Item>

          <div className="flex w-full justify-end">
            <Button onClick={Cancel}>Cancel</Button>

            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#1677FF", marginLeft: "12px" }}
            >
              Tạo
            </Button>
          </div>
        </Form>
      </Loading>
    </Modal>
  );
};

export default ConfigProductForm;
