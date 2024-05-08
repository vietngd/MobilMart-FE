import HeaderComponent from "../components/HeaderComponent/HeaderComponent.jsx";

const NoFooterLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div className="pt-[65px]">{children}</div>
    </div>
  );
};

export default NoFooterLayout;
