import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { convertToMonney } from "../../ultils";

const Card = ({ card }) => {
  const imgs = card.images.split(",");

  const discountPercentage = ((card.price - card.sale) / card.price) * 100;

  return (
    <Link to={`/product/${card.id}`}>
      <div className="card-product mb-4">
        <div className="relative flex justify-center">
          <img
            src={imgs[0]}
            alt="product"
            className="h-[150px] max-w-full"
            loading="lazy"
          ></img>

          <span className="absolute right-0 top-5 rounded-l bg-red-700 px-1 pr-1 text-xs text-white">
            Giảm {Math.round(discountPercentage)} %
          </span>
        </div>
        <div className="cart_body grid gap-y-3 px-3 py-3">
          <div className="title h-16 font-bold hover:text-primary">
            {card.name}
          </div>
          <div className="price">
            <span className="new_price mr-6 text-sm font-semibold text-red-700">
              {convertToMonney(card.sale)}
            </span>
            <span className="old_price text-xs font-thin text-[#D3CED2] line-through">
              {convertToMonney(card.price)}
            </span>
          </div>
          <div className="flex">
            <span className="mr-4 flex items-center">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const isHalfStar = card.rating - index >= 0.5;
                return (
                  <span key={index}>
                    {ratingValue <= card.rating ? (
                      <IoIosStar size={"1rem"} className="text-yellow-400" />
                    ) : isHalfStar &&
                      parseInt(card.rating) === ratingValue - 1 ? (
                      <FaRegStarHalfStroke
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
