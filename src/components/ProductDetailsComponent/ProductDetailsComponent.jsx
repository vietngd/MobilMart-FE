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
        <div className="grid grid-cols-6 gap-x-4">
          <div className="col-span-2">
            <ImgShowComponent imgs={product?.data[0]?.images.split(",")} />
          </div>
          <div className="col-span-3">
            <InfoProductComponent
              sale={product?.data[0]?.sale}
              price={product?.data[0]?.price}
            />
          </div>
          <div className="col-span-1">
            <WarrantyComponent />
          </div>
        </div>
      </Loading>
    </>
  );
};

export default ProductDetailsComponent;
