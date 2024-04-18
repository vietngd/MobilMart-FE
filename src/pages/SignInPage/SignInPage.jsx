import { useState } from "react";
import logo from "../../assets/images/logo-2.png";
import { Link } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const [IsLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/dangky", { email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Link to="/">
        <button className="btn fixed ml-2 mt-4 hover:shadow">
          VỀ TRANG CHỦ
        </button>
      </Link>
      <div className="m-auto max-w-screen-xl">
        <div className="flex h-screen items-center justify-center">
          <div className="grid h-3/5 w-3/5 grid-cols-2 overflow-hidden rounded-3xl border shadow-md">
            <div className="px-9 ">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto" src={logo} />
                  <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {IsLogin ? "Đăng nhập" : "Đăng ký"}
                  </h2>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block cursor-pointer text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          required
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-0 border-transparent px-1.5 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:border-transparent  focus:ring-0  focus:ring-inset sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block cursor-pointer text-sm font-medium leading-6 text-gray-900"
                        >
                          Mật khẩu
                        </label>
                        <div className="text-sm">
                          {IsLogin && (
                            <a
                              href="#"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                              Quên mật khẩu?
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full rounded-md border-0 border-transparent px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-transparent focus:ring-0 focus:ring-inset sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {IsLogin ? "Đăng nhập" : "Đăng ký"}
                      </button>
                    </div>
                  </form>

                  <p className="mt-6 text-center text-sm text-gray-500">
                    {IsLogin ? "Chưa có tài khoản? " : "Bạn đã có tài khoản? "}

                    <a
                      href="#"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        setIsLogin(!IsLogin);
                      }}
                    >
                      {IsLogin ? "Đăng ký" : "Đăng nhập"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-l-[100px] bg-primary p-5 text-white">
              <p className="mb-4 text-2xl font-bold">Xin chào!</p>
              <p className="mb-4 text-center">
                Cùng MobileMart mua sắm thỏa sức đam mê ^.^
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
