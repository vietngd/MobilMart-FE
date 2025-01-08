import FooterComponent from "../components/FooterComponent/FooterComponent.jsx";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent.jsx";

const defaultLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div className="m-auto min-h-screen max-w-[95%] pt-[70px] xl:max-w-screen-xl">
        {children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default defaultLayout;
