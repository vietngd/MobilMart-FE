import { FaAngleRight } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";

const Breadcrumb = ({ paths }) => {
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
              <a
                href={path.url}
                className="flex items-center hover:text-primary"
              >
                {index === 0 && <IoMdHome style={{ marginRight: "8px" }} />}
                {path.name}{" "}
                <span className="ml-2">
                  <FaAngleRight />
                </span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
