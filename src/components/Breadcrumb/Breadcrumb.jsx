import { FaAngleRight } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ paths, categoryName = "" }) => {
  const navigate = useNavigate();

  const handleNaviagte = (path) => {
    navigate(`${path}`, { state: categoryName });
  };
  return (
    <nav
      aria-label="breadcrumb"
      className="pb-2"
      style={{ boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -12px" }}
    >
      <ol className="breadcrumb flex">
        {paths.map((path, index) => (
          <li key={index} className="breadcrumb-item mr-4 text-sm">
            {index === paths.length - 1 ? (
              <span>{path.name}</span>
            ) : (
              <span
                className="flex cursor-pointer items-center  hover:text-primary"
                onClick={() => handleNaviagte(path.url)}
              >
                {index === 0 && <IoMdHome style={{ marginRight: "8px" }} />}
                {path.name}{" "}
                <span className="ml-2">
                  <FaAngleRight />
                </span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
