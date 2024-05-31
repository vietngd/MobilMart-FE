import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/index.js";
import defaultLayout from "./layout/DefaultLayout.jsx";
import NoFooterLayout from "./layout/NoFooterLayout.jsx";
import { Fragment, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import * as UserServices from "./services/userServices.js";
import * as CategoryServices from "./services/categoryServices.js";
import { updateAccessToken, updateUser } from "./redux/slides/userSlice.js";
import { updateCategory } from "./redux/slides/categorySlice.js";
import Loading from "./components/Loading/LoadingComponent.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { decoded, accessToken } = handleDecoded();
    if (decoded && decoded?.id) {
      handleGetDetailUser(decoded.id, accessToken);
    }
    handleGetCategories();
    setIsLoading(false);
  }, []);
  const handleDecoded = () => {
    let accessToken = localStorage.getItem("access_token");
    let decoded = {};
    if (accessToken) {
      decoded = jwtDecode(accessToken);
      accessToken = JSON.parse(accessToken);
    }
    return { decoded, accessToken };
  };

  //Chạy trước khi axios gửi request đến máy chủ
  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();

      if (
        decoded &&
        decoded.exp &&
        decoded.exp < currentTime.getTime() / 1000
      ) {
        const data = await UserServices.refreshToken();
        if (data.access_token) {
          config.headers["token"] = `Bearer ${data.access_token}`;
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.access_token),
          );
          dispatch(updateAccessToken(data.access_token));
        }
      }

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleGetCategories = async () => {
    const res = await CategoryServices.getAllCategory();
    dispatch(updateCategory(res?.categories));
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const path = route.path;
              const Page = route.page;
              const Layout =
                route.isShowHeader && route.isShowFooter
                  ? defaultLayout
                  : route.isShowFooter
                    ? Fragment
                    : route.isShowHeader
                      ? NoFooterLayout
                      : Fragment;
              return (
                <Route
                  path={isCheckAuth ? path : undefined}
                  key={index}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </>
  );
}

export default App;
