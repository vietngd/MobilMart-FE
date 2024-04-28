import ImgShowComponent from "../ImgShowComponent/ImgShowComponent";
import InfoProductComponent from "../InfoProductComponent/InfoProductComponent";
import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import WarrantyComponent from "../WarrantyComponent/WarrantyComponent";
import * as Productservices from "../../services/productServices.js";

import Loading from "../Loading/LoadingComponent.jsx";
import { useQuery } from "@tanstack/react-query";

const ProductDetailsComponent = ({ idProduct }) => {
  const fetchProduct = async () => {
    const res = await Productservices.getDetailProduct(idProduct);
    return res;
  };

  const queryProduct = useQuery({
    queryKey: ["productDetail"],
    queryFn: () => fetchProduct(idProduct),
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.log("Error fetching product:", error);
      // Handle error here if needed
    },
  });

  const { data: product, isLoading } = queryProduct;

  const productConfig = product && JSON.parse(product?.data[0]?.configuration);

  return (
    <>
      <Loading isLoading={isLoading}>
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-bold ">{product?.data[0].name}</span>
          <div className="flex items-center">
            <span className="mr-2 flex items-center text-primary">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar /> <FaRegStarHalfStroke />
            </span>
            <span className="text-sm opacity-80">(200 Đánh giá)</span>
          </div>
        </div>
        <div className="grid grid-cols-9 gap-x-4">
          <div className="col-span-3">
            <ImgShowComponent imgs={product?.data[0]?.images.split(",")} />
          </div>
          <div className="col-span-4">
            <InfoProductComponent
              sale={product?.data[0]?.sale}
              price={product?.data[0]?.price}
            />
          </div>
          <div className="col-span-2">
            <WarrantyComponent />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-x-4">
          <div className="col-span-3">Các bài post</div>
          <div className="col-span-1 rounded-md border p-2">
            <h3 className="font-semibold">Thông số kĩ thuật</h3>
            <ul className="boder mt-2 overflow-hidden rounded-md">
              <li className=" flex bg-[#F2F2F2] px-2 py-3">
                <span className="flex-1">Kích thước màn hình </span>
                <span className="flex-1">{productConfig?.ScreenSize}</span>
              </li>
              <li className="flex  px-2 py-3">
                <span className="flex-1">Công nghệ màn hình </span>
                <span className="flex-1">
                  {productConfig?.ScreenTechnology}
                </span>
              </li>
              <li className="flex bg-[#F2F2F2] px-2 py-3">
                <span className="flex-1">Camera sau </span>
                <span className="flex-1">{productConfig?.AfterCamera}</span>
              </li>
              <li className="flex  px-2 py-3">
                <span className="flex-1">Camera trước </span>
                <span className="flex-1">{productConfig?.BeforeCamera} </span>
              </li>
              <li className="flex bg-[#F2F2F2] px-2 py-3">
                <span className="flex-1">Chipset </span>
                <span className="flex-1">{productConfig?.Chipset} </span>
              </li>
              <li className="flex  px-2 py-3">
                <span className="flex-1">Dung lượng Ram </span>
                <span className="flex-1">{productConfig?.Ram} </span>
              </li>
              <li className="flex bg-[#F2F2F2] px-2 py-3">
                <span className="flex-1">Bộ nhớ trong </span>
                <span className="flex-1">{productConfig?.Storage} </span>
              </li>
              <li className=" flex px-2 py-3">
                <span className="flex-1">Pin </span>
                <span className="flex-1">{productConfig?.Battery} </span>
              </li>
              <li className="flex bg-[#F2F2F2] px-2 py-3">
                <span className="flex-1">Hệ điều hành </span>
                <span className="flex-1">{productConfig?.OperatingSystem}</span>
              </li>
              <li className="flex  px-2 py-3">
                <span className="flex-1">Độ phân giải màn hình </span>
                <span className="flex-1">
                  {productConfig?.ScreenResolution}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Loading>
    </>
  );
};

export default ProductDetailsComponent;
