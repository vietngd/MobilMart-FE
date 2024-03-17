import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Card = ({ card }) => {
  return (
    <Link className="card" to={"/product"}>
      <div className="relative flex justify-center">
        <img
          src={card.img}
          alt="product"
          className="h-[150px] max-w-full"
        ></img>
        <span className="absolute bottom-0 left-0 rounded-r bg-black pr-1 text-xs text-white">
          Miễn phí ship
        </span>
        <span className="absolute bottom-5 left-0 rounded-r bg-primary pr-1 text-xs text-white">
          Trả góp 0%
        </span>
      </div>
      <div className="cart_body grid gap-y-3 px-3 py-3">
        <div className="title font-bold hover:text-primary">{card.title}</div>
        <div className="price">
          <span className="new_price mr-6 text-sm font-semibold text-primary">
            {card.newPrice}
          </span>
          <span className="old_price text-xs font-thin text-[#D3CED2] line-through">
            {card.oldPrice}
          </span>
        </div>
        <div className="flex">
          <span className="mr-4 flex items-center text-[#D3CED2]">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar /> <FaRegStarHalfStroke />
          </span>
          <span className="text-sm opacity-80">({card.rate} Đánh giá)</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
