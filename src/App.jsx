import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import routes from "./routes/index.js"
import defaultLayout from "./layout/DefaultLayout.jsx";
import { Fragment } from "react";



function App() {
  return (
    <>

    <Router>
      <Routes>
        {routes.map((route,index)=>{
          const path = route.path;
          const Page = route.page;
          const Layout = route.isShowHeader ? defaultLayout : Fragment;
          return (
            <Route path = {path} key={index} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
          )
        })}
        
        
      </Routes>
    </Router>
    </>
  )
}

export default App
