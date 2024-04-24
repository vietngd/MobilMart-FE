import FooterComponent from "../components/FooterComponent/FooterComponent.jsx";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent.jsx";

const defaultLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  );
};

export default defaultLayout;
