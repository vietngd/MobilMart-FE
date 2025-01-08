import FooterComponent from "../components/FooterComponent/FooterComponent.jsx";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent.jsx";

const defaultLayout = ({ children }) => {
  return (
    <div className="layout-container relative overflow-hidden">
      <HeaderComponent />
      <div className="m-auto min-h-screen max-w-[95%] pt-[70px] xl:max-w-screen-xl">
        {children}
      </div>
      <FooterComponent />
      <div className="snow absolute left-0 top-0 h-full w-full"></div>
      <div className="flower-petals absolute left-0 top-0 h-full w-full"></div>
    </div>
  );
};

export default defaultLayout;
