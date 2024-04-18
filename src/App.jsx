import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/index.js";
import defaultLayout from "./layout/DefaultLayout.jsx";
import { Fragment, useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const res = await axios.get(`${baseUrl}/product/getAll`);
    console.log(res);
  };
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const path = route.path;
            const Page = route.page;
            const Layout = route.isShowHeader ? defaultLayout : Fragment;
            return (
              <Route
                path={path}
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
    </>
  );
}

export default App;
