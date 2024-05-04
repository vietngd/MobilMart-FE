import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder } from "../../redux/slides/orderSlice";
const ProductActionComponent = ({ product }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // category_id: "A8eZz97VJ74KlZ5HxcSN6zlf2";
      // configuration: '{"ScreenSize":"6.8 Inchs","ScreenTechnology":"Supper Oled","BeforeCamera":"12 MB","AfterCamera":"128 MB","Chipset":"Snapdragon 8 gen 2","Ram":"16GB","Storage":"256 GB","Battery":"5000 mAh","OperatingSystem":"Android 13","ScreenResolution":"2K"}';
      // created_at: "2024-04-26T15:18:30.000Z";
      // description: " S24";
      // hot: 1;
      // id: "fCW3AeeVgE2ebBkEG9HrhIIu3";
      // images: "https://res.cloudinary.com/dpzzwc24b/image/upload/v1714144709/mobimart_img/ked8oil6hpwu6kf4v5qo.png,https://res.cloudinary.com/dpzzwc24b/image/upload/v1714144708/mobimart_img/kstz7nguqyqkh2gx2iq0.jpg,https://res.cloudinary.com/dpzzwc24b/image/upload/v1714144710/mobimart_img/cdz5uz17imz5s6blb8wq.png,https://res.cloudinary.com/dpzzwc24b/image/upload/v1714144709/mobimart_img/g5bvayniidutp3trttuo.png,https://res.cloudinary.com/dpzzwc24b/image/upload/v1714144709/mobimart_img/crzf8d3k1u4eovnsk5jg.png";
      // name: " Samsung Galaxy S24 Ultra (5G) 12GB 256GB Chính Hãng";
      // price: 33590000;
      // quantity: 30;
      // sale: 28950000;
      // total_pay: null;
      // updated_at: null;

      const orderItem = {
        user_id: user?.id,
        product_id: product?.id,
        name: product?.name,
        image: product?.images.split(",")[0],
        sale: product?.sale,
        price: product?.price,
        quantity: 1,
      };
      dispatch(addOrder(orderItem));
    }
  };
  return (
    <div className="col-span-1  cursor-pointer p-2">
      <button className="flex w-full items-center justify-center rounded-md border  bg-blue py-2  text-white hover:shadow">
        <span className="mr-2 text-2xl">
          <FaCartArrowDown />
        </span>
        <span className=" text-lg text-white" onClick={handleAddOrder}>
          Thêm giỏ hàng
        </span>
      </button>
    </div>
  );
};

export default ProductActionComponent;
