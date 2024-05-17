import CategoryComponent from "../../components/Category/CategoryComponent.jsx";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardProductComponent from "../../components/CardProduct/CardProductComponent.jsx";
import * as CategoryServices from "../../services/categoryServices.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const HomePage = () => {
  const fetchAllCategory = async () => {
    const res = await CategoryServices.getAllCategory();
    return res;
  };
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchAllCategory(),
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <CategoryComponent categories={data} />
        <SliderComponent />
      </div>
      {data?.categories.map((item, index) => {
        return <CardProductComponent data={item} key={index} />;
      })}
    </>
  );
};

export default HomePage;
