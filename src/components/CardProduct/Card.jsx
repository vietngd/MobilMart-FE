import { IoIosStar } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import clsx from "clsx"; // Make sure to import clsx
import { convertToMonney } from "../../ultils"; // Ensure this function is correctly implemented

const Card = ({ card }) => {
  const imgs = card.images.split(",");

  const discountPercentage = ((card.price - card.sale) / card.price) * 100;
  const ICTriaggle = ({ color }) => {
    return (
      <svg width='8' height='4' viewBox='0 0 4 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M3.93548 2L0 0H3.93548V2Z' fill={color} />
      </svg>
    );
  };
  const renderTag = (discount) => {
    return (
      <div className="relative">
        <div
          className={clsx(
            "text-white text-[12px] md:text-lg w-[100px] h-[30px] shadow-sm hover:opacity-80 flex justify-center items-center font-bold relative bg-[#e94f4f]"
          )}
        >
          <p className="text-[12px]">Giảm tới {discount.toFixed(0)}%</p> 
          <div className='absolute bottom-[-4px] left-0'>
            <ICTriaggle color={"#971818"} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Link to={`/product/${card.id}`}>
      <div className="ml-3 border-[1px] min-w-[200px] cursor-pointer p-2 bg-[#FFFFFF] border-gray-300 rounded-lg hover:transform hover:translate-x-[-1.5rem] hover:shadow-[0_10px_10px_gray] duration-300">
        <div className="relative flex justify-center">
          <img
            src={imgs[0]}
            alt="product"
            className="h-[150px] max-w-full"
            loading="lazy"
          />
          <div className="absolute top-0 left-[-16px]">
            {renderTag(discountPercentage)}
          </div>
        </div>
        <div className="grid gap-y-3 p-1 md:p-3">
          <div className="min-h-[72px] font-bold hover:text-primary">
            {card.name}
          </div>
          <div className="price">
            <span className="new_price mr-3 text-sm font-semibold text-red-700">
              {convertToMonney(card.sale)}
            </span>
            <span className="old_price text-xs font-thin text-[#D3CED2] line-through">
              {convertToMonney(card.price)}
            </span>
          </div>
          <div className="flex">
            <span className="mr-1 flex items-center">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const isHalfStar = card.rating - index >= 0.5;
                return (
                  <span key={index}>
                    {ratingValue <= card.rating ? (
                      <IoIosStar size={"1rem"} className="text-yellow-400" />
                    ) : isHalfStar &&
                      parseInt(card.rating) === ratingValue - 1 ? (
                      <FaStarHalfAlt
                        size={"1rem"}
                        className="text-yellow-400"
                      />
                    ) : (
                      <IoIosStar size={"1rem"} style={{ color: "#a29e9e" }} />
                    )}
                  </span>
                );
              })}
            </span>
            <span className="text-sm opacity-80">
              ({card.total_comments} Đánh giá)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
