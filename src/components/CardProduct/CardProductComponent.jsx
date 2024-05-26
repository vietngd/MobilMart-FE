import Card from "./Card.jsx";
import CardProductHeader from "./CardProductHeader.jsx";
import { useQuery } from "@tanstack/react-query";
import * as Productservices from "../../services/productServices.js";
import { useState } from "react";
import Loading from "../Loading/LoadingComponent.jsx";

//Component cha
const CardProductComponent = (props) => {
  const [pageSize, setPageSize] = useState(5);
  const { name, id } = props.data;
  const fetchProductByCategory = async (context) => {
    const pageSize = context?.queryKey[2]; //context là thứ mà useQuery trả về trong đó có queryKey
    const params = { categoryId: id, pageSize };
    const res = await Productservices.getProductByCategory(params);
    return res;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["productsByCategory", id, pageSize], //Nếu không có id đằng sau thì React Query chỉ xem xét một cache key duy nhất và chỉ gọi hàm fetchProductByCategory một lần.
    queryFn: fetchProductByCategory,
    retry: 3,
    retryDelay: 1000,
  });

  const handleLoadMore = () => {
    setPageSize((prevLimit) => prevLimit + 5);
  };

  return (
    <Loading isLoading={isLoading}>
      {data?.Products?.length > 0 && (
        <div className="relative">
          <div className="mb-5 mt-10">
            <CardProductHeader title={name} />
          </div>
          <div className="sm: grid grid-cols-2 gap-x-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data?.Products?.map((item, index) => {
              return <Card key={index} card={item} />;
            })}
          </div>
          <button
            className={
              data?.Products.length === data?.pagination.totalCount
                ? "absolute left-1/2 top-full -translate-x-1/2  rounded border border-primary px-4 py-1 font-bold text-primary transition-all duration-300"
                : "absolute left-1/2 top-full -translate-x-1/2  rounded border border-primary px-4 py-1 font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            }
            onClick={handleLoadMore}
            disabled={data?.Products.length === data?.pagination.totalCount}
          >
            Xem thêm
          </button>
        </div>
      )}
    </Loading>
  );
};

export default CardProductComponent;
