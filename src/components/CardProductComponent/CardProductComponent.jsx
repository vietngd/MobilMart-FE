import Card from "./Card.jsx";
import CardProductHeader from "./CardProductHeader.jsx";
import iphone15 from "../../assets/images/product/1.webp";
import iphone13 from "../../assets/images/product/2.webp";

const CardDatas = [
  {
    img: iphone15,
    title: "Iphone 15 Pro Max 256GB Chính hãng VN/A",
    newPrice: "29.950.000 đ",
    oldPrice: "36.990.990 đ",
    rate: "19",
  },
  {
    img: iphone13,
    title: "Iphone 13 Pro 256GB Chính hãng VN/A",
    newPrice: "22.950.000 đ",
    oldPrice: "26.990.990 đ",
    rate: "20",
  },
  {
    img: iphone15,
    title: "Iphone 15 Pro Max 256GB Chính hãng VN/A",
    newPrice: "29.950.000 đ",
    oldPrice: "36.990.990 đ",
    rate: "19",
  },
  {
    img: iphone13,
    title: "Iphone 13 Pro 256GB Chính hãng VN/A",
    newPrice: "22.950.000 đ",
    oldPrice: "26.990.990 đ",
    rate: "20",
  },
  {
    img: iphone15,
    title: "Iphone 15 Pro Max 256GB Chính hãng VN/A",
    newPrice: "29.950.000 đ",
    oldPrice: "36.990.990 đ",
    rate: "19",
  },
];

const CardProductComponent = (props) => {
  const { title, options } = props.data;
  return (
    <>
      <div className="mb-5 mt-5">
        <CardProductHeader title={title} options={options} />
      </div>
      <div className="grid grid-cols-5 gap-x-3">
        {CardDatas.map((item, index) => {
          return <Card key={index} card={item} />;
        })}
      </div>
    </>
  );
};

export default CardProductComponent;
