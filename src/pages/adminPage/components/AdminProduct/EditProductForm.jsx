import { Button, Checkbox, Form, Input, Select, Upload } from "antd";
import DrawerComponent from "../Drawer/DrawerComponent";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Productservices from "../../../../services/productServices.js";
import { URLtoFile, getBase64 } from "../../../../ultils";
import { useMutationHook } from "../../../../hooks/userMutationHook.js";
import * as ProductServices from "../../../../services/productServices.js";
import * as message from "../../../../components/Message/MessageComponent.jsx";
import Loading from "../../../../components/Loading/LoadingComponent.jsx";

const EditProductForm = ({
  isOpenDrawer,
  idProduct,
  onClose,
  queryProduct,
}) => {
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [isOnchangeUpload, setIsOnchangeUpload] = useState(false);

  const fetchDetailProduct = async () => {
    setLoading(true);
    try {
      const res = await Productservices.getDetailProduct(idProduct);
      setProduct(res?.data[0]);
      setConfiguration(res?.data?.config[0]);
      const images = res?.data[0].images.split(",");
      const files = await Promise.all(images.map((img) => URLtoFile(img)));
      setFileList(files);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    idProduct && fetchDetailProduct();
  }, [idProduct]);

  const [fileList, setFileList] = useState([]);

  // Láy thông tin của product
  const handleOnchange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value || e.target.checked,
    });
  };
  // Láy thông tin cấu hình của product
  const handleOnchangeConfig = (e) => {
    setConfiguration({
      ...configuration,
      [e.target.name]: e.target.value,
    });
  };

  // Lấy id category
  const handleOnchangeSelect = (category_id) => {
    setProduct({
      ...product,
      category_id: category_id,
    });
  };

  //Onchange img
  const onchangeUpload = async ({ fileList }) => {
    setIsOnchangeUpload(true);
    setFileList(fileList); // Set số lượng ảnh đã chọn vào state để hiển thị lên form
    const images = [];
    await Promise.all(
      fileList.map(async (item) => {
        images.push(await getBase64(item.originFileObj || item));
      }),
    );
    setProduct({
      ...product,
      images: images,
    });
  };

  const mutationUpdate = useMutationHook(
    async ({ id, access_token, ...rest }) => {
      const res = await ProductServices.updateProduct(id, access_token, rest);
      return res;
    },
  );
  const {
    data: dataUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
    isPending: isPendingUpdated,
  } = mutationUpdate;

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công");
      close();
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  const handleUpdateProduct = async () => {
    if (isOnchangeUpload) {
      const data = {
        id: idProduct,
        product: product,
        configuration: configuration,
        access_token: user?.access_token,
      };
      await mutationUpdate.mutateAsync(data);
    } else {
      // Nếu không có onchange upload thì vẫn chuyển filelist thành base64 vì cloud chỉ nhận dữ liệu là base64
      const images = [];
      await Promise.all(
        fileList.map(async (item) => {
          images.push(await getBase64(item.originFileObj || item));
        }),
      );
      const data = {
        id: idProduct,
        product: { ...product, images: images },
        configuration: configuration,
        access_token: user?.access_token,
      };
      mutationUpdate.mutateAsync(data, {
        onSettled: () => {
          queryProduct?.refetch();
        },
      });
    }
  };

  const close = () => {
    onClose();
    setProduct("");
    setConfiguration("");
    setIsOnchangeUpload(false);
    setFileList([]);
  };

  return (
    <>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        placement={"right"}
        onClose={onClose}
        width="70%"
      >
        <Loading isLoading={loading || isPendingUpdated}>
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
            onFinish={handleUpdateProduct}
          >
            <div className="grid grid-cols-2">
              <div>
                <h1 className="mb-3 text-center text-xl font-semibold">
                  Sản phẩm
                </h1>
                <Form.Item label="Tên">
                  <Input
                    onChange={handleOnchange}
                    name="name"
                    value={product?.name}
                    required
                  />
                </Form.Item>
                <Form.Item label="Hot" name="disabled">
                  <Checkbox
                    onChange={handleOnchange}
                    checked={product?.hot}
                    name="hot"
                  ></Checkbox>
                </Form.Item>
                <Form.Item label="Ảnh" valuePropName="fileList">
                  <Upload
                    listType="picture-card"
                    multiple={true}
                    onChange={onchangeUpload}
                    fileList={fileList}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
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
                    value={product?.price}
                  />
                </Form.Item>
                <Form.Item label="Giá sale">
                  <Input
                    style={{ width: "150px" }}
                    onChange={handleOnchange}
                    name="sale"
                    required
                    value={product?.sale}
                  />
                </Form.Item>
                <Form.Item label="Số lượng">
                  <Input
                    style={{ width: "50px" }}
                    onChange={handleOnchange}
                    name="quantity"
                    required
                    value={product?.quantity}
                  />
                </Form.Item>
                <Form.Item label="Danh mục">
                  <Select
                    style={{ width: "200px" }}
                    onChange={handleOnchangeSelect}
                    name="category_id"
                    value={product?.category_id}
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
              </div>
              <div>
                <h1 className="mb-3 text-center text-xl font-semibold">
                  Cấu hình
                </h1>
                <Form.Item label="Kích thước màn hình">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="screen_size"
                    value={configuration?.screen_size}
                    required
                  />
                </Form.Item>
                <Form.Item label="Công nghệ màn hình">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="screen_technology"
                    value={configuration?.screen_technology}
                    required
                  />
                </Form.Item>
                <Form.Item label="Camera trước">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="before_camera"
                    value={configuration?.before_camera}
                    required
                  />
                </Form.Item>
                <Form.Item label="Camera sau">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="after_camera"
                    value={configuration?.after_camera}
                    required
                  />
                </Form.Item>
                <Form.Item label="Chip">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="chipset"
                    value={configuration?.chipset}
                    required
                  />
                </Form.Item>
                <Form.Item label="Ram">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="ram"
                    value={configuration?.ram}
                    required
                  />
                </Form.Item>
                <Form.Item label="Bộ nhớ">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="storage"
                    value={configuration?.storage}
                    required
                  />
                </Form.Item>
                <Form.Item label="Pin">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="battery"
                    value={configuration?.battery}
                    required
                  />
                </Form.Item>
                <Form.Item label="Hệ điều hành">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="operating_system"
                    value={configuration?.operating_system}
                    required
                  />
                </Form.Item>
                <Form.Item label="Độ phân giải">
                  <Input
                    onChange={handleOnchangeConfig}
                    name="screen_resolution"
                    value={configuration?.screen_resolution}
                    required
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Button onClick={onClose}>Cancel</Button>

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
      </DrawerComponent>
      {/* </Loading> */}
    </>
  );
};

export default EditProductForm;
