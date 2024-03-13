import Slider from "react-slick";
import "./style.css";

function NextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        scale: "2",
        position: "absolute",
        right: "20px",
      }}
      onClick={onClick}
    />
  );
}
function PrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        scale: "2",
        position: "absolute",
        left: "20px",
        zIndex: "100",
      }}
      onClick={onClick}
    />
  );
}

// eslint-disable-next-line react/prop-types
const SliderComponent = ({ sliders }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    accessibility: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="col-span-4">
      <Slider {...settings} className="overflow-hidden rounded-xl shadow-md ">
        {/* eslint-disable-next-line react/prop-types */}
        {sliders.map((slider, index) => {
          return (
            <div key={index}>
              <img
                src={slider}
                alt="slider"
                className="w-full rounded-xl"
              ></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderComponent;
