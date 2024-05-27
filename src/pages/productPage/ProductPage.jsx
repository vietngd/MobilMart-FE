import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import * as ProductServices from "../../services/productServices.js";
import { useEffect, useState } from "react";
import Card from "../../components/CardProduct/Card";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Popover } from "antd";

const productPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("ASC");

  const fetchProducts = async () => {
    const params = { categoryId: id, sortOrder: sortOrder };
    const res = await ProductServices.getProductByCategory(params);
    setProducts(res.Products);
    return res;
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

  const paths = [{ name: "Home", url: "/" }, { name: location.state }];

  const content = (
    <>
      <div className="cursor-pointer">
        <p className="hover:text-primary" onClick={() => setSortOrder("DESC")}>
          Giá cao đến thấp
        </p>
        <p className="hover:text-primary" onClick={() => setSortOrder("ASC")}>
          Giá thấp đến cao
        </p>
      </div>
    </>
  );

  return (
    <div>
      <Breadcrumb paths={paths} />

      <div className="mt-5">
        <div className="flex justify-end py-2">
          <Popover content={content} trigger="hover" placement="bottom">
            <div className="flex cursor-pointer items-center">
              <span className="mr-1">Sắp xếp theo</span>
              <IoMdArrowDropdownCircle color="gray" />
            </div>
          </Popover>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product, index) => {
            return <Card key={index} card={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default productPage;
