import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import * as ProductServices from "../../services/productServices.js";
import { useEffect, useState } from "react";
import Card from "../../components/CardProduct/Card";

const productPage = () => {
  const location = useLocation();
  const params = useParams();
  const [products, setProducts] = useState([]);

  const paths = [{ name: "Home", url: "/" }, { name: params?.name }];

  const fetchProducts = async () => {
    const categoryId = location.state;
    const res = await ProductServices.getProductByCategory(categoryId);
    setProducts(res.Products);
    return res;
  };

  useEffect(() => {
    if (location) fetchProducts();
  }, [location]);

  return (
    <div>
      <Breadcrumb paths={paths} />

      <div className="mt-5">
        <h2>Sắp xếp theo</h2>
        <div className="mt-4 grid grid-cols-5 gap-x-3">
          {products?.map((product, index) => {
            return <Card key={index} card={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default productPage;
