import SignInPage from "../pages/SignInPage/SignInPage";
import AdminPage from "../pages/adminPage/AdminPage";
import CartPage from "../pages/cartPage/cartPage";
import HomePage from "../pages/homePage/homePage";
import NotFoundPage from "../pages/notFoundPage/notFoundPage";
import ProductPage from "../pages/productPage/productPage";
import ProfilePage from "../pages/profile/ProfilePage";

const Routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/product/:id",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];

export default Routes;
