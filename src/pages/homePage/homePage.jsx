import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/Slider/slider1.webp";
import slider2 from "../../assets/images/Slider/slider2.webp";
import slider3 from "../../assets/images/Slider/slider3.webp";
import slider4 from "../../assets/images/Slider/slider4.webp";
import slider5 from "../../assets/images/Slider/slider5.webp";
import CardProductComponent from "../../components/CardProductComponent/CardProductComponent";
import * as CategoryServices from "../../services/categoryServices.js";
import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";

// const ProductData = [
//   {
//     title: "Samsung",
//     options: ["S22 Ultral", "S21 Ultral", "S20 Plus"],
//   },
//   {
//     title: "IPHONE",
//     options: [
//       "iPhone 15 Series",
//       "iPhone 14 Series",
//       "iPhone 13 Series",
//       "iPhone 12 Series",
//       "Iphone 11",
//     ],
//   },
// ];

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
  // console.log("Categories", isLoading, data?.categories);
  const sliders = [slider1, slider2, slider3, slider4, slider5];
  return (
    <>
      <div className="m-auto max-w-screen-xl">
        <div className="grid grid-cols-5 gap-4">
          <CategoryComponent />
          <SliderComponent sliders={sliders} />
        </div>
        {data?.categories.map((item, index) => {
          return <CardProductComponent data={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
