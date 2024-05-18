import { Input, Button, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import TableComponent from "../../../../components/TableComponent/TableComponent";
import { useMutationHook } from "../../../../hooks/userMutationHook.js";
import * as Productservices from "../../../../services/productServices.js";
import Loading from "../../../../components/Loading/LoadingComponent.jsx";
import * as message from "../../../../components/Message/MessageComponent.jsx";
import ModalComponent from "../../../../components/Modal/ModalComponent.jsx";
import CreateProductForm from "./CreateProductForm.jsx";
import ConfigProductForm from "./ConfigProductForm.jsx";
import EditProductForm from "./EditProductForm.jsx";
import { useSelector } from "react-redux";

const AdminProduct = () => {
  const user = useSelector((state) => state.user);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalCreateProduct, setIsModalCreateProduct] = useState(false);
  const [stateProduct, setStateProduct] = useState({});
  const [isModalConfig, setIsModalCopnfig] = useState(false);
  const [resultCreateProduct, setResultCreateProduct] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState("");

  const handleNextModal = (stateProductformChild) => {
    setIsModalCopnfig(true);
    setIsModalCreateProduct(false);
    setStateProduct(stateProductformChild);
  };

  const getResultCreateProduct = (result) => {
    if (result) {
      message.success("Thêm sản phẩm thành công!");
      setIsModalCopnfig(false);
      setResultCreateProduct(true);
    } else {
      message.success("Thêm sản phẩm thất bại!");
    }
  };

  const mutation = useMutationHook(async (data) => {
    const res = await Productservices.createProduct(data);
    return res;
  });

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      onCancel();
    }
  }, [isSuccess, isError]);

  const onCancel = () => {
    setIsModalCreateProduct(false);
  };

  const onCancelConfig = () => {
    setIsModalCopnfig(false);
    setIsModalCreateProduct(true);
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
  });
  //Emd tính năng search của ant design

  const columns = [
    {
      title: "Tên sản phẩm",
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
      title: "Giá cũ",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Giá sale",
      key: "Sale",
      dataIndex: "sale",
      sorter: (a, b) => a.sale - b.sale,
    },
    {
      title: "Số lượng còn",
      key: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Số lượng bán",
      key: "Total_pay",
      dataIndex: "total_pay",
      sorter: (a, b) => a.total_pay - b.total_pay,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button
            className="rounded border border-blue px-2 py-1"
            onClick={handleDetailProduct}
          >
            Edit
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

  //Khi kick vào một row trên table
  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
  };

  // Xóa sản phẩm
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const mutationDelete = useMutationHook(async ({ id, access_token }) => {
    const res = await Productservices.deleteProduct(id, access_token);
    return res;
  });
  const {
    data: dataDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
  } = mutationDelete;

  useEffect(() => {
    if (isSuccessDelete && dataDelete?.status === "OK") {
      handleCancelDelete();
      message.success("Xóa thành công");
    }
  }, [isSuccessDelete, isErrorDelete]);
  const handleDeleteProduct = () => {
    mutationDelete.mutateAsync(
      { id: idProductDelete, access_token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const onClose = () => {
    setIsOpenDrawer(false);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
      <button
        className="btn mt-4 bg-[#1677FF] px-5"
        onClick={() => {
          setIsModalCreateProduct(true);
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
                setIdProductDelete(record?.id);
              },
            };
          }}
        />
      </div>
      {/* Thêm sản phẩm */}
      <CreateProductForm
        isModalCreateProduct={isModalCreateProduct}
        onCancel={onCancel}
        handleNextModal={handleNextModal}
        resultCreateProduct={resultCreateProduct}
        isModalConfig={isModalConfig}
      />
      <ConfigProductForm
        isModalConfig={isModalConfig}
        stateProduct={stateProduct}
        getResultCreateProduct={getResultCreateProduct}
        onCancel={onCancelConfig}
        queryProduct={queryProduct}
      />

      {/* Chi tiết sản phẩm */}
      <EditProductForm
        isOpenDrawer={isOpenDrawer}
        idProduct={idProductDelete}
        onClose={onClose}
        queryProduct={queryProduct}
      />

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
