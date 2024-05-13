import { useEffect, useState } from "react";
import logo from "../../assets/images/logo-2.png";
import google_logo from "../../assets/images/Google-icon.png";
import facebook_logo from "../../assets/images/facebook-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import * as UserServices from "../../services/userServices.js";
import { useMutationHook } from "../../hooks/userMutationHook.js";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice.js";

const SignInPage = () => {
  const location = useLocation();
  const [IsLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutationHook((data) =>
    IsLogin ? UserServices.loginUser(data) : UserServices.createUser(data),
  );
  const { data, isSuccess, isError } = mutation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Khi ấn nút đăng kí thì mới xóa input
    !IsLogin && handleClearInput();

    const data = await mutation.mutateAsync({
      email,
      password,
    });

    setMessage(data.message);
  };

  useEffect(() => {
    if (IsLogin & isSuccess && data?.status === "OK") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }

      localStorage.setItem("access_token", JSON.stringify(data?.access_token));

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded.id, data.access_token);
        }
      }
    }
  }, [isSuccess, isError]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserServices.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClearInput = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };
  return (
    <>
      <Link to="/">
        <button className="btn fixed ml-2 mt-4 hover:shadow">
          VỀ TRANG CHỦ
        </button>
      </Link>
      <div className="m-auto max-w-screen-xl">
        <div className="flex h-screen items-center justify-center">
          <div className="grid w-3/5 grid-cols-2 overflow-hidden rounded-3xl border  shadow-md">
            <div className="px-9 py-5">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto" src={logo} />
                  <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {IsLogin ? "Đăng nhập" : "Đăng ký"}
                  </h2>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block cursor-pointer text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <InputFormComponent
                          id="email"
                          name="email"
                          type="email"
                          valueInput={email}
                          handleOnchange={handleChangeEmail}
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
                      </div>
                      <div className="mt-1">
                        <InputFormComponent
                          id="password"
                          name="password"
                          type="password"
                          valueInput={password}
                          handleOnchange={handleChangePassword}
                        />
                      </div>

                      <div className="float-right mb-2 mt-2 w-full text-sm">
                        {message && (
                          <div className="w-full text-start text-red-600">
                            {message}
                          </div>
                        )}
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

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {mutation.isPending
                          ? "Login..."
                          : IsLogin
                            ? "Đăng nhập"
                            : "Đăng ký"}
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
                        handleClearInput();
                      }}
                    >
                      {IsLogin ? "Đăng ký" : "Đăng nhập"}
                    </a>
                  </p>

                  <div className="mt-3 flex items-center justify-center">
                    <button className="min-w-30 mr-2 flex  items-center rounded-md border border-red-300 px-3 py-2 hover:border-red-600">
                      <span className="mr-2">
                        <img src={google_logo} alt="icon" className="w-5" />
                      </span>
                      <span>Google</span>
                    </button>
                    <button className=" min-w-30 border-blue-300 hover:border-blue-600 flex items-center rounded-md border px-3 py-2">
                      <span className="mr-2">
                        <img src={facebook_logo} alt="icon" className="w-5" />
                      </span>
                      <span>Facebook</span>
                    </button>
                  </div>
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
