import Card from "./Card.jsx";
import CardProductHeader from "./CardProductHeader.jsx";
import { useQuery } from "@tanstack/react-query";
import * as Productservices from "../../services/productServices.js";

//Component cha
const CardProductComponent = (props) => {
  const { name, id } = props.data;
  const fetchProductByCategory = async (categoryId) => {
    const res = await Productservices.getProductByCategory(categoryId);
    return res;
  };
  const { data } = useQuery({
    queryKey: ["productsByCategory", id], //Nếu không có id đằng sau thì React Query chỉ xem xét một cache key duy nhất và chỉ gọi hàm fetchProductByCategory một lần.
    queryFn: () => fetchProductByCategory(id),
    retry: 3,
    retryDelay: 1000,
  });
  return (
    <>
      <div className="mb-5 mt-5">
        <CardProductHeader title={name} />
      </div>
      <div className="grid grid-cols-5 gap-x-3">
        {data?.Products.map((item, index) => {
          return <Card key={index} card={item} />;
        })}
      </div>
    </>
  );
};

export default CardProductComponent;
