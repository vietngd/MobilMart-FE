import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return <ProductDetailsComponent idProduct={id} />;
};

export default ProductPage;
