import FooterComponent from "../components/FooterComponent/FooterComponent";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

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
