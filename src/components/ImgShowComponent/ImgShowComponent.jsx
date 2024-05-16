import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const ImgShowComponent = ({ imgs }) => {
  const [imgPrimary, setImgPrimary] = useState();

  const handleOnCLick = (item) => {
    setImgPrimary(item);
  };

  useEffect(() => {
    setImgPrimary(imgs?.[0]);
  }, [imgs]);

  return (
    <div>
      <div className="imgshow mb-2 rounded-md border p-2 px-14">
        <img src={imgPrimary} alt="" className="w-full object-cover" />
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
          {imgs?.map((item, index) => {
            return (
              <SwiperSlide className=" cursor-pointer border p-1" key={index}>
                <img
                  src={item}
                  alt=""
                  className="h-full w-full object-cover"
                  onClick={() => handleOnCLick(item)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ImgShowComponent;
