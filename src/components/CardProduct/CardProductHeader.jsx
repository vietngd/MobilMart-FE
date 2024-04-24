const CardProductHeader = ({ title }) => {
  return (
    <div className="flex justify-between">
      <button className="card_title">{title}</button>
      {/* <ul className="option flex gap-x-3">
        {options.map((item, index) => {
          return (
            <li
              className="cursor-pointer rounded-xl bg-[#F3F4F6] px-2 py-2 hover:text-primary"
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default CardProductHeader;
