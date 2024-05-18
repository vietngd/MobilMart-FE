import { useEffect, useState } from "react";
import * as CategoryServices from "../../../../services/categoryServices";
import Loading from "../../../../components/Loading/LoadingComponent";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import { useSelector } from "react-redux";
import * as message from "../../../../components/Message/MessageComponent";

const AdminCategory = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [idCategoryDelete, setIdCategoryDelete] = useState("");
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
    setLoadingCreate(true);
    try {
      const res = await CategoryServices.createCategory(
        newCategory,
        access_token,
      );
      if (res && res.status && res.status === "OK") {
        message.success("Thêm dạnh mục mới thành công");
        setIsModalOpenCreate(false);
        fetchCategory();
        setNewCategory("");
      } else if (res && res.status && res.status === "exists") {
        message.error(res.message);
        setNewCategory("");
      } else {
        message.error("Có lỗi xảy ra, thử lại sau.");
        setNewCategory("");
      }
    } catch (error) {
      console.error("Error create category:", error);
    } finally {
      setLoadingCreate(false);
    }
  };
  const deleteCategory = async (id, access_token) => {
    setLoadingDelete(true);
    try {
      const res = await CategoryServices.deleteCategory(id, access_token);
      if (res && res.status && res.status === "OK") {
        message.success("Xóa dạnh mục thành công");
        setIsModalOpenDelete(false);
        fetchCategory();
        setIdCategoryDelete("");
      } else {
        message.error("Còn sản phẩm trong danh mục không thể xóa.");
        setIsModalOpenDelete(false);
        setIdCategoryDelete("");
      }
    } catch (error) {
      console.error("Error create category:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCreateCategory = () => {
    if (user && user.access_token && newCategory) {
      createCategory(newCategory, user.access_token);
    }
  };

  const handleDeleteCategory = () => {
    if (user && user.access_token && idCategoryDelete) {
      deleteCategory(idCategoryDelete, user.access_token);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Quản lý danh mục</h1>
      <button
        className="btn mt-4 bg-[#1677FF] px-5"
        onClick={() => {
          setIsModalOpenCreate(true);
        }}
      >
        Thêm danh mục
      </button>
      <Loading isLoading={loading}>
        <table className="mt-3 min-w-full border-collapse rounded-lg border bg-white ">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-center">Tên dạnh mục</th>
              <th className="border px-4 py-2 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {categories &&
              categories.length > 0 &&
              categories?.map((category, index) => {
                return (
                  <tr className=" hover:bg-gray-100" key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">
                      {category?.name}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="rounded border bg-red-500 px-2 py-1 text-white"
                        onClick={() => {
                          setIdCategoryDelete(category.id);
                          setIsModalOpenDelete(true);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Loading>

      <ModalComponent
        title="Xóa danh mục"
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleDeleteCategory}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      >
        <Loading isLoading={loadingDelete}>
          <div>Bạn có chắc xóa danh mục này không?</div>
        </Loading>
      </ModalComponent>

      <ModalComponent
        title="Thêm danh mục mới"
        open={isModalOpenCreate}
        onCancel={() => setIsModalOpenCreate(false)}
        onOk={handleCreateCategory}
        okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
      >
        <Loading isLoading={loadingCreate}>
          <div>
            <input
              type="text"
              className="w-full rounded border p-2 outline-none"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminCategory;
