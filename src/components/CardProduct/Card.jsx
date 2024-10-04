import { IoIosStar } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import clsx from "clsx"; // Make sure to import clsx
import { convertToMonney } from "../../ultils"; // Ensure this function is correctly implemented
import WhatshotIcon from "@mui/icons-material/Whatshot";
const Card = ({ card }) => {
  const imgs = card.images.split(",");

  const discountPercentage = ((card.price - card.sale) / card.price) * 100;
  const ICTriaggle = ({ color }) => {
    return (
      <svg
        width="8"
        height="4"
        viewBox="0 0 4 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.93548 2L0 0H3.93548V2Z" fill={color} />
      </svg>
    );
  };
  const renderTag = (discount) => {
    return (
      <div className="relative">
        <div
          className={clsx(
            "relative flex h-[30px] w-[100px] items-center justify-center bg-[#e94f4f] text-[12px] font-bold text-white shadow-sm hover:opacity-80 md:text-lg",
          )}
        >
          <p className="text-[12px]">Giảm tới {discount.toFixed(0)}%</p>
          <div className="absolute bottom-[-4px] left-0">
            <ICTriaggle color={"#971818"} />
          </div>
        </div>
      </div>
    );
  };
  const renderTagHot = () => {
    return (
      <div className="relative">
        <div>
          {card?.hot === 1 && (
            <div className="absolute right-0 top-0">
              <WhatshotIcon
                sx={{
                  color: "red",
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <Link to={`/product/${card.id}`}>
      <div className="ml-3 min-w-[220px] cursor-pointer rounded-lg border-[1px] border-gray-300 bg-[#FFFFFF] p-2 duration-300 hover:translate-x-[-1.5rem] hover:transform hover:shadow-[0_10px_10px_gray]">
        {renderTagHot()}
        <div className="relative flex justify-center">
          <img
            src={imgs[0]}
            alt="product"
            className="h-[150px] max-w-full"
            loading="lazy"
          />
          <div className="absolute left-[-16px] top-0">
            {renderTag(discountPercentage)}
          </div>{" "}
        </div>
        <div className="grid gap-x-2 p-1 md:p-1">
          <div className="min-h-[72px] font-bold hover:text-primary">
            {card.name}
          </div>
          <div className="price">
            <span className="new_price mr-1 text-sm font-semibold text-red-700">
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
