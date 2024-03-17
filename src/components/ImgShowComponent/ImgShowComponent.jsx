import imgsrc from "../../assets/images/product/1.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
import { Navigation } from "swiper/modules";

const ImgShowComponent = () => {
  return (
    <div>
      <div className="imgshow mb-4 px-14">
        <img src={imgsrc} alt="" className="w-full object-cover" />
      </div>
      <div className="w-full">
        <Swiper
          navigation={true}
          slidesPerView={5}
          spaceBetween={5}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
        >
          <SwiperSlide className=" border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="h-full border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="border p-1">
            <img src={imgsrc} alt="" className="h-full w-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ImgShowComponent;
