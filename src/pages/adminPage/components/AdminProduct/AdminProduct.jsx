import {
  Modal,
  Checkbox,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "@tanstack/react-query";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import { useMutationHook } from "../../../../hooks/userMutationHook.js";
import * as ProductServices from "../../../../services/productServices.js";
import * as CategoryServices from "../../../../services/categoryServices.js";
import { getBase64 } from "../../../../ultils.js";
import * as Productservices from "../../../../services/productServices.js";
import DrawerComponent from "../Drawer/DrawerComponent.jsx";
import Loading from "../../../../components/Loading/LoadingComponent.jsx";
import { useSelector } from "react-redux";
import * as message from "../../../../components/Message/MessageComponent.jsx";
import ModalComponent from "../../../../components/Modal/ModalComponent.jsx";

const AdminProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfig, setIsModalCopnfig] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: " ",
    description: " ",
    hot: false,
    price: " ",
    sale: " ",
    quantity: " ",
    category_id: "g7Ph8CmTazu6vndHbVAuBGMUa",
  });
  //Lưu thông tin cấu hình của sản phẩm
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

  //Get category thêm vào form
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

  const { data, isSuccess, isError, isPending } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      onCancel();
    }
  }, [isSuccess, isError]);

  // Tạo mới sản phẩm khi click vào nút OK
  const handleCreateProduct = async () => {
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
    mutation.mutateAsync(data, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const mutationUpdate = useMutationHook(async ({ id, data, access_token }) => {
    const res = await ProductServices.updateProduct(id, data, access_token);
    return res;
  });
  const {
    data: dataUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
    isPending: isPendingUpdated,
  } = mutationUpdate;

  useEffect(() => {
    if (isSuccessUpdated & (dataUpdated?.status === "OK")) {
      onCancel();
      setIsOpenDrawer(false);
      message.success();
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  const user = useSelector((state) => state.user);
  const handleUpdateProduct = async () => {
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
    mutationUpdate.mutateAsync(
      {
        id: stateProduct?.id,
        data,
        access_token: user?.access_token,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
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

  // Xóa tất cả các tệp ảnh đã chọn bằng cách cập nhật fileList về mảng rỗng
  const handleRemove = () => {
    setFileList([]);
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

  //Get All Product từ CSDL
  const fetchProduct = async () => {
    const res = await Productservices.getAllProduct();
    return res;
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProduct(),
    retry: 3,
    retryDelay: 1000,
  });

  const { data: products, isLoading } = queryProduct;

  // Tinh năng search của ant design
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              background: "#1677FF",
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  //Emd tính năng search của ant design

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hot",
      dataIndex: "hot",
      key: "Hot",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Sale",
      key: "Sale",
      dataIndex: "sale",
      sorter: (a, b) => a.sale - b.sale,
    },
    {
      title: "Quantity",
      key: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button
            className="rounded border border-blue-500 px-2 py-1"
            onClick={handleDetailProduct}
          >
            Edit
          </button>
          <button
            className="rounded border border-primary px-2 py-1"
            onClick={() => setIsModalOpenDelete(true)}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  //Khi kick vào một row trên table
  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
  };

  // Xóa sản phẩm
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const mutationDelete = useMutationHook(async ({ id }) => {
    const res = await ProductServices.deleteProduct(id);
    return res;
  });
  const {
    data: dataDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
  } = mutationDelete;

  useEffect(() => {
    if (isSuccessDelete & (dataDelete?.status === "OK")) {
      handleCancelDelete();
      message.success();
    }
  }, [isSuccessDelete, isErrorDelete]);
  const handleDeleteProduct = () => {
    mutationDelete.mutateAsync(
      { id: stateProduct?.id },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
      <button
        className="btn mt-4 bg-[#1677FF] px-5"
        onClick={() => {
          onCancel();
          setIsModalOpen(true);
        }}
      >
        Thêm sản phẩm
      </button>
      <div className="mt-4">
        <TableComponent
          dataProp={products?.data}
          columms={columns}
          isLoading={isLoading}
          onRow={(record) => {
            return {
              onClick: () => {
                setStateProduct({
                  ...record,
                  category_id: "g7Ph8CmTazu6vndHbVAuBGMUa",
                });

                setConfigProduct(JSON.parse(record?.configuration));
              }, // click row
            };
          }}
        />
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
              value={stateProduct.category_id}
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
        <Loading isLoading={isPending || isPendingUpdated}>
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
            onFinish={isOpenDrawer ? handleUpdateProduct : handleCreateProduct}
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
                {isOpenDrawer ? "Cập nhật" : "Thêm"}
              </Button>
            </div>
          </Form>
        </Loading>
      </Modal>

      {/* Chi tiết sản phẩm */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        placement={"right"}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
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
              value={stateProduct?.name}
              required
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <TextArea
              rows={4}
              onChange={handleOnchange}
              name="description"
              value={stateProduct?.description}
            />
          </Form.Item>
          <Form.Item label="Hot" name="disabled">
            <Checkbox
              onChange={handleOnchange}
              checked={stateProduct?.hot}
              name="hot"
            ></Checkbox>
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
              value={stateProduct?.price}
            />
          </Form.Item>
          <Form.Item label="Giá sale">
            <Input
              style={{ width: "150px" }}
              onChange={handleOnchange}
              name="sale"
              required
              value={stateProduct?.sale}
            />
          </Form.Item>
          <Form.Item label="Số lượng">
            <Input
              style={{ width: "50px" }}
              onChange={handleOnchange}
              name="quantity"
              required
              value={stateProduct?.quantity}
            />
          </Form.Item>
          <Form.Item label="Danh mục">
            <Select
              style={{ width: "200px" }}
              onChange={handleOnchangeSelect}
              name="category_id"
              value={stateProduct?.category_id}
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
            <Button onClick={() => setIsOpenDrawer(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#1677FF", marginLeft: "12px" }}
            >
              Sửa cấu hình
            </Button>
          </div>
        </Form>
      </DrawerComponent>

      {/* Xóa sản phẩm */}

      <Loading isLoading={isPendingDelete}>
        <ModalComponent
          title="Xóa sản phẩm"
          open={isModalOpenDelete}
          onCancel={handleCancelDelete}
          onOk={handleDeleteProduct}
          okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
        >
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </ModalComponent>
      </Loading>
    </div>
  );
};

export default AdminProduct;
