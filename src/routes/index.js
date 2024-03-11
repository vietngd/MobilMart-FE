import CartPage from "../pages/cartPage/cartPage";
import HomePage from "../pages/homePage/homePage";
import NotFoundPage from "../pages/notFoundPage/notFoundPage";
import ProductPage from "../pages/productPage/productPage";

const Routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];

export default Routes;
