import { useEffect, useState } from "react";
import * as CategoryServices from "../../../../services/categoryServices";
import Loading from "../../../../components/Loading/LoadingComponent";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import { useSelector } from "react-redux";
import * as message from "../../../../components/Message/MessageComponent";
import CustomTable from "../../../../components/common/CustomTable.jsx";
import { Space } from "antd";
import React from "react";
import { IcDelete, IcEdit } from "../../../../components/icons/common.jsx";
import { Button, TextField, Typography } from "@mui/material";
import BasicDialog from "../../../../components/Modal/BasicDialog.jsx";
import { FormProvider } from "antd/es/form/context.js";
import BasicDialogContent from "../../../../components/Modal/BasicDialogContent.jsx";
import BasicDialogActions from "../../../../components/Modal/BasicDialogAction.jsx";
import { Controller, useForm, useFormContext } from "react-hook-form";
import BasicButton from "../../../../components/common/BasicButton.jsx";
const AdminCategory = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const { control, handleSubmit, reset, setValue } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const res = await CategoryServices.getAllCategory();
      if (res && res.categories) setCategories(res?.categories);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const createCategory = async (newCategory, access_token) => {
    setLoading(true);
    try {
      const res = await CategoryServices.createCategory(
        newCategory,
        access_token,
      );
      if (res && res.status && res.status === "OK") {
        message.success("Thêm dạnh mục mới thành công");
        fetchCategory();
      } else if (res && res.status && res.status === "exists") {
        message.error(res.message);
      } else {
        message.error("Có lỗi xảy ra, thử lại sau.");
      }
    } catch (error) {
      console.error("Error create category:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteCategory = async (id, access_token) => {
    setLoading(true);
    try {
      const res = await CategoryServices.deleteCategory(id, access_token);
      if (res && res.status && res.status === "OK") {
        message.success("Xóa dạnh mục thành công");
        setIsModalOpenDelete(false);
        fetchCategory();
        setIdCategory("");
      } else {
        message.error("Còn sản phẩm trong danh mục không thể xóa.");
        setIsModalOpenDelete(false);
        setIdCategory("");
      }
    } catch (error) {
      console.error("Error create category:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateCategory = async (id, access_token, name) => {
    setLoading(true);
    try {
      const res = await CategoryServices.updateCategory(id, access_token, name);
      if (res && res.status && res.status === "OK") {
        message.success("Cập nhật danh mục thành công");
        fetchCategory();
        setIdCategory("");
      } else {
        message.error("Cập nhật thất bại.");
        setIdCategory("");
      }
    } catch (error) {
      console.error("Error update category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = () => {
    if (user && user.access_token && idCategory) {
      deleteCategory(idCategory, user.access_token);
    }
  };

  const columns = [
    {
      title: "Mã danh mục",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (item, idx) => {
        return (
          <Space size="middle">
            <button
              onClick={() => {
                setIdCategory(item);
                setIsModalOpen(true);
              }}
            >
              <IcEdit />
            </button>
            <button
              onClick={() => {
                setIsModalOpenDelete(true);
                setIdCategory(item.id);
              }}
            >
              <IcDelete />
            </button>
          </Space>
        );
      },
    },
  ];

  const onClose = () => {
    setIsModalOpen(false);
    setIdCategory(null);
    reset();
  };

  const onSubmit = (data) => {
    if (user && user.access_token) {
      if (idCategory) {
        updateCategory(idCategory.id, user.access_token, data.name);
      } else {
        createCategory(data.name, user.access_token);
      }
    } else {
      message.error("Vui lòng đăng nhập");
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (idCategory) {
      setValue("name", idCategory.name);
    } else {
      reset();
    }
  }, [idCategory, setValue, reset]);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Quản lý danh mục</h1>
      <div className="flex items-end justify-end">
        <BasicButton
          onClick={() => {
            setIdCategory(null);
            setIsModalOpen(true);
          }}
        >
          Thêm danh mục
        </BasicButton>
      </div>
      <div className="pt-5">
        <CustomTable
          dataProp={categories || []} //
          columns={columns}
        />
      </div>

      <ModalComponent
        title="Xóa danh mục"
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleDeleteCategory}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      >
        <Loading isLoading={loading}>
          <div>Bạn có chắc xóa danh mục này không?</div>
        </Loading>
      </ModalComponent>

      {isModalOpen && (
        <BasicDialog
          maxWidth="md"
          showCloseIcon
          open={isModalOpen}
          title={idCategory?.id ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
          onClose={onClose}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <BasicDialogContent className="space-y-3">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Tên danh mục là bắt buộc" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Tên danh mục"
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </BasicDialogContent>
            <BasicDialogActions sx={{ justifyContent: "end" }}>
              <Button variant="outlined" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" variant="contained">
                Xác nhận
              </Button>
            </BasicDialogActions>
          </form>
        </BasicDialog>
      )}
    </div>
  );
};

export default AdminCategory;
