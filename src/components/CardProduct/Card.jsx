import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Card = ({ card }) => {
  const imgs = card.images.split(",");
  return (
    <a href={`/product/${card.id}`}>
      <div className="card mb-4">
        <div className="relative flex justify-center">
          <img
            src={imgs[0]}
            alt="product"
            className="h-[150px] max-w-full"
          ></img>
          <span className="absolute bottom-0 left-0 rounded-r bg-black pr-1 text-xs text-white">
            Miễn phí ship
          </span>
          <span className="absolute bottom-5 left-0 rounded-r bg-red-700 pr-1 text-xs text-white">
            Trả góp 0%
          </span>
        </div>
        <div className="cart_body grid gap-y-3 px-3 py-3">
          <div className="title h-16 font-bold hover:text-primary">
            {card.name}
          </div>
          <div className="price">
            <span className="new_price mr-6 text-sm font-semibold text-red-700">
              {card.sale.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <span className="old_price text-xs font-thin text-[#D3CED2] line-through">
              {card.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="flex">
            <span className="mr-4 flex items-center text-yellow-400">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar /> <FaRegStarHalfStroke />
            </span>
            <span className="text-sm opacity-80">(20 Đánh giá)</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
