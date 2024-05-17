import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading/LoadingComponent";
import * as SliderServices from "../../../../services/SliderServices";
import { getBase64 } from "../../../../ultils";
import * as message from "../.././../../components/Message/MessageComponent";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import { useSelector } from "react-redux";

const AdminSlider = () => {
  const user = useSelector((state) => state.user);
  const [isOpenCreateSlider, setIsOpenCreateSlider] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idSliderDelete, setIdSliderDelete] = useState("");
  const [resultDelete, setResultDelete] = useState(false);
  const [resultCreate, setResultCreate] = useState(false);
  const onchangeUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const createSlider = async (sliders) => {
    setLoading(true);
    try {
      const res = await SliderServices.CreateSlider(sliders);
      if (res && res.status === "OK") {
        setFileList([]);
        setIsOpenCreateSlider(false);
        message.success("Tạo slider thành công!");
        setResultCreate(true);
      } else if (res && res.status !== "OK") {
        message.error("Tạo slider thất bại!");
        setResultCreate(false);
      }
    } catch (error) {
      console.log("Tạo slider lỗi : ", error);
    } finally {
      setLoading(false);
    }
  };

  const hanldeCreateSlider = async () => {
    const sliders = [];
    await Promise.all(
      fileList.map(async (item) => {
        sliders.push(await getBase64(item.originFileObj || item));
      }),
    );
    createSlider(sliders);
  };

  const [sliders, setSliders] = useState([]);
  const fetchSliders = async () => {
    const res = await SliderServices.GetAllSlider();
    if (res && res.status === "OK") {
      setSliders(res.data);
    }
  };
  useEffect(() => {
    fetchSliders();
  }, [resultDelete, resultCreate]);

  const deleteSlider = async (id, access_token) => {
    const res = await SliderServices.DeleteSlider(id, access_token);

    if (res && res.status === "OK") {
      setIdSliderDelete("");
      message.success("Xóa slider thành công");
      setIsModalOpenDelete(false);
      setResultDelete(true);
    } else if (res && res.status !== "OK") {
      setIdSliderDelete("");
      message.error("Xóa slider thất bại");
      setResultDelete(false);
    }
  };

  const handleDeleteSlider = () => {
    setLoadingDelete(true);
    try {
      if (idSliderDelete && user)
        deleteSlider(idSliderDelete, user?.access_token);
    } catch (error) {
      console.log("Xóa slider có lỗi xảy ra");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
    setIdSliderDelete("");
  };

  return (
    <div className=" mt-10">
      <button
        className="mb-2 rounded-md bg-blue px-5 py-2 text-white"
        onClick={() => setIsOpenCreateSlider(!isOpenCreateSlider)}
      >
        Tạo mới slider
      </button>
      {isOpenCreateSlider && (
        <Loading isLoading={loading}>
          <div>
            <Upload
              listType="picture-card"
              multiple={true}
              onChange={onchangeUpload}
              fileList={fileList}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Chọn ảnh</div>
              </button>
            </Upload>
            <button
              className="mb-3 mt-3 rounded bg-red-500 px-3 py-1 text-white"
              onClick={hanldeCreateSlider}
            >
              Tạo
            </button>
          </div>
        </Loading>
      )}
      <div className="overflow-x-auto">
        <Loading isLoading={loading}>
          <table className="min-w-full border-collapse rounded-lg border bg-white shadow-md">
            <thead>
              <tr>
                <th className="border   px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Ảnh</th>
                <th className="border px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {sliders && sliders.length > 0 ? (
                sliders?.map((slider, index) => {
                  return (
                    <tr className=" hover:bg-gray-100" key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        <img src={slider.link} alt="img" width="20%" />
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="rounded border bg-red-500 px-2 py-1 text-white"
                          onClick={() => {
                            setIdSliderDelete(slider.id);
                            setIsModalOpenDelete(!isModalOpenDelete);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-3 text-center">
                    Không có slider nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Loading>
        <Loading isLoading={loadingDelete}>
          <ModalComponent
            title="Xóa sản phẩm"
            open={isModalOpenDelete}
            onCancel={handleCancelDelete}
            onOk={handleDeleteSlider}
            okButtonProps={{ style: { backgroundColor: "#1677FF" } }}
          >
            <div>Bạn có chắc xóa Slider này không?</div>
          </ModalComponent>
        </Loading>
      </div>
    </div>
  );
};

export default AdminSlider;
