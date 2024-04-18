import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/Slider/slider1.webp";
import slider2 from "../../assets/images/Slider/slider2.webp";
import slider3 from "../../assets/images/Slider/slider3.webp";
import slider4 from "../../assets/images/Slider/slider4.webp";
import slider5 from "../../assets/images/Slider/slider5.webp";
import CarDProductComponent from "../../components/CardProductComponent/CardProductComponent";

const ProductData = [
  {
    title: "ĐIỆN THOẠI NỔI BẬT NHẤT",
    options: ["Iphone", "Samsung", "Xiaomi", "Nokia", "Realme"],
  },
  {
    title: "HÀNG CŨ",
    options: ["Iphone cũ", "Samsung cũ", "Ipad cũ"],
  },
  {
    title: "IPHONE",
    options: [
      "iPhone 15 Series",
      "iPhone 14 Series",
      "iPhone 13 Series",
      "iPhone 12 Series",
      "Iphone 11",
    ],
  },
];

const HomePage = () => {
  const sliders = [slider1, slider2, slider3, slider4, slider5];
  return (
    <div className="m-auto max-w-screen-xl">
      <div className="grid grid-cols-5 gap-4">
        <CategoryComponent />
        <SliderComponent sliders={sliders} />
      </div>
      {ProductData.map((item, index) => {
        return <CarDProductComponent data={item} key={index} />;
      })}
    </div>
  );
};

export default HomePage;
