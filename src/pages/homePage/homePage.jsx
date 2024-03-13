import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/Slider/slider1.webp";
import slider2 from "../../assets/images/Slider/slider2.webp";
import slider3 from "../../assets/images/Slider/slider3.webp";
import slider4 from "../../assets/images/Slider/slider4.webp";
import slider5 from "../../assets/images/Slider/slider5.webp";

const HomePage = () => {
  const sliders = [slider1, slider2, slider3, slider4, slider5];
  return (
    <div className="m-auto max-w-screen-xl">
      <div className="grid grid-cols-5 gap-4">
        <CategoryComponent />
        <SliderComponent sliders={sliders} />
      </div>
    </div>
  );
};

export default HomePage;
