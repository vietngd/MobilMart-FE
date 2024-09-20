import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import * as SliderServices from "../../services/SliderServices";

const SliderComponent = () => {
  const [sliders, setSliders] = useState([]);
  const fetchSliders = async () => {
    const res = await SliderServices.GetAllSlider();
    if (res && res.status === "OK") {
      setSliders(res.data);
    }
  };
  useEffect(() => {
    fetchSliders();
  }, []);
  return (
    <div className="col-span-4 overflow-hidden rounded-xl shadow-md">
      <Swiper
        loop={true}
        navigation={false}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{ delay: 2000 }}
        modules={[Pagination, Autoplay]}
        // style={{ width: "600px", height: "400px" }}
      >
        {sliders.map((slider, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={slider?.link}
                alt="slider"
                className="h-auto max-h-[200px] w-full rounded-xl object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
