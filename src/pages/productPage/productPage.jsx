import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div className="m-auto max-w-screen-xl pt-[65px]">
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductPage;
