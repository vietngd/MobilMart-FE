import { CiDeliveryTruck } from "react-icons/ci";
import PromotionComponent from "../PromotionComponent/PromotionComponent";
import ProductActionComponent from "../ProductActionComponent/ProductActionComponent";
import { calculateAverageRating, convertToMonney } from "../../ultils";
import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useMemo } from "react";

const InfoProductComponent = ({ product, total_comments, rating_counts }) => {
  const averageRating = useMemo(() => {
    return calculateAverageRating(rating_counts);
  }, [rating_counts]);
  return (
    <div>
      <div className="mb-5">
        <span className="text-2xl ">{product?.name}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-2xl font-bold text-red-700 ">
            {convertToMonney(product?.sale)}
          </span>
          <span className="mr-2 text-base line-through">
            {convertToMonney(product?.price)}
          </span>
        </div>
        <div>
          <input
            type="checkbox"
            checked={product?.quantity > 0}
            onChange={() => {}}
          />{" "}
          {product?.quantity > 0 ? "Còn hàng" : "Hết hàng"}
        </div>
      </div>
      <div className=" flex items-center justify-start rounded py-1 text-white">
        <span className="text-xl">
          <CiDeliveryTruck color="#143820" />
        </span>
        <span className="ml-3 text-xs text-[#143820]">
          MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="pl-2 ">
          <div className="flex items-center">
            <span className="mr-2 flex items-center text-primary">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const isHalfStar = averageRating - index >= 0.5;
                return (
                  <span key={index}>
                    {ratingValue <= averageRating ? (
                      <IoIosStar size={"1rem"} style={{ color: "#978535" }} />
                    ) : isHalfStar &&
                      parseInt(averageRating) === ratingValue - 1 ? (
                      <FaRegStarHalfStroke
                        size={"1rem"}
                        style={{ color: "#978535" }}
                      />
                    ) : (
                      <IoIosStar size={"1rem"} style={{ color: "#a29e9e" }} />
                    )}
                  </span>
                );
              })}
            </span>
            <span className="mr-2 text-xs opacity-80">
              ({total_comments} Đánh giá)
            </span>
          </div>
          <span className="text-xs text-[#8f8c8e]">
            Đã bán : {product?.total_pay}
          </span>
        </div>
        <div>
          <ProductActionComponent product={product} />
        </div>
      </div>

      <div className="mt-3 grid  gap-x-1">
        <PromotionComponent />
      </div>
    </div>
  );
};

export default InfoProductComponent;
