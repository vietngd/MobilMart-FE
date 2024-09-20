import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useEffect, useState } from "react";
import Loading from "../../../../components/Loading/LoadingComponent";
import * as SliderServices from "../../../../services/SliderServices";
import { getBase64 } from "../../../../ultils";
import * as message from "../.././../../components/Message/MessageComponent";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import { useSelector } from "react-redux";
import { IcDelete } from "../../../../components/icons/common";
import CustomTable from "../../../../components/common/CustomTable";
import { Button } from "@mui/material";
import BasicDialog from "../../../../components/Modal/BasicDialog";
import BasicDialogContent from "../../../../components/Modal/BasicDialogContent";
import BasicDialogActions from "../../../../components/Modal/BasicDialogAction";
import BasicButton from "../../../../components/common/BasicButton";
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

  const createSlider = async (sliders, access_token) => {
    setLoading(true);
    try {
      const res = await SliderServices.CreateSlider(sliders, access_token);
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
    const res = await Promise.all(
      fileList.map(async (item) => {
        sliders.push(await getBase64(item.originFileObj || item));
      }),
    );
    if (res && user?.access_token && fileList.length > 0) {
      createSlider(sliders, user?.access_token);
    }
    if (fileList.length === 0) {
      message.error("Vui lòng chọn ảnh!");
    }
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

  const columns = [
    {
      title: "Mã Đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh slide",
      dataIndex: "link",
      key: "link",
      render: (item) => (
        <div>
          <img src={item.link} alt="img" width="20%" />
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (item) => (
        <>
          <button
            className="mr-1 px-2 py-1 text-white"
            onClick={() => {
              setIdSliderDelete(item.id);
              setIsModalOpenDelete(!isModalOpenDelete);
            }}
          >
            <IcDelete />
          </button>
        </>
      ),
    },
  ];
  return (
    <div>
      <div className="text-[24px] font-bold">Quản lý Slider</div>
      <div className="flex items-end justify-end pb-5">
        <BasicButton onClick={() => setIsOpenCreateSlider(!isOpenCreateSlider)}>
          Thêm mới slider
        </BasicButton>
      </div>
      {isOpenCreateSlider && (
        <Loading isLoading={loading}>
          <BasicDialog
            maxWidth="md"
            showCloseIcon
            open={isOpenCreateSlider}
            title={"Thêm mới slider"}
            onClose={() => setIsOpenCreateSlider(false)}
          >
            <BasicDialogContent className="space-y-3">
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
            </BasicDialogContent>
            <BasicDialogActions sx={{ justifyContent: "end" }}>
              <Button
                variant="outlined"
                onClick={() => setIsOpenCreateSlider(false)}
              >
                Hủy
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={hanldeCreateSlider}
              >
                Xác nhận
              </Button>
            </BasicDialogActions>
          </BasicDialog>
        </Loading>
      )}
      <div className="overflow-x-auto">
        <Loading isLoading={loading}>
          <CustomTable
            dataProp={sliders || []} //
            columns={columns}
          />
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
