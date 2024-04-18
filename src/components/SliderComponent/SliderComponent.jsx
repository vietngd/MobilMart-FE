import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const SliderComponent = ({ sliders }) => {
  return (
    <div className="col-span-4 mt-[70px] overflow-hidden rounded-xl shadow-md">
      <Swiper
        loop={true}
        navigation={false}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{ delay: 2000 }}
        modules={[Pagination, Autoplay]}
      >
        {sliders.map((slider, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={slider}
                alt="slider"
                className="w-full rounded-xl"
              ></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
