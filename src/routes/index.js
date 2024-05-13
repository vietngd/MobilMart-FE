import SignInPage from "../pages/SignInPage/SignInPage";
import AdminPage from "../pages/adminPage/AdminPage";
import CartPage from "../pages/cartPage/cartPage";
import HomePage from "../pages/homePage/homePage";
import MyOrderPage from "../pages/myOrderPage/MyOrderPage";
import NotFoundPage from "../pages/notFoundPage/notFoundPage";
import Payment from "../pages/payment/Payment";
import PaymentStatus from "../pages/paymentStatus/PaymentStatus";
import PaymentInfo from "../pages/payment_info/PaymentInfo";
import ProductDetailPage from "../pages/productDetailPage/productDetailPage";
import productPage from "../pages/productPage/ProductPage";
import ProfilePage from "../pages/profile/ProfilePage";

const Routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product/:id",
    page: ProductDetailPage,
    isShowFooter: true,
    isShowHeader: true,
  },
  {
    path: "/product/category/:id",
    page: productPage,
    isShowFooter: true,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/cart/payment-info",
    page: PaymentInfo,
    isShowHeader: true,
  },
  {
    path: "/cart/payment",
    page: Payment,
    isShowHeader: true,
  },
  {
    path: "/payment-status",
    page: PaymentStatus,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
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
