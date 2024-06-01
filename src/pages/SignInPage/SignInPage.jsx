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
import * as messageComponent from "../../components/Message/MessageComponent.jsx";

const SignInPage = () => {
  const location = useLocation();
  const [IsLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [codeForm, setCodeForm] = useState(false);
  const [resetPasswordForm, setResetPasswordForm] = useState(false);
  const [loginform, setLoginform] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutationHook((data) =>
    IsLogin ? UserServices.loginUser(data) : UserServices.createUser(data),
  );
  const mutationForgotPassword = useMutationHook(({ email }) =>
    UserServices.forgotPassword(email),
  );
  const mutationVerifyCode = useMutationHook(({ code, token }) =>
    UserServices.verifyCode(code, token),
  );

  const mutationUpdatePassword = useMutationHook(({ email, newPassword }) =>
    UserServices.updatePassWord(email, newPassword),
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

    setMessage(data?.message);
  };
  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    if (codeForm) {
      const token = JSON.parse(localStorage.getItem("code"));
      if (token && code) {
        const data = await mutationVerifyCode.mutateAsync({
          code,
          token,
        });
        if (data.status === "OK") {
          setForgotPassword(false);
          setResetPasswordForm(true);
          setCode("");
        }
      }
    } else {
      const data = await mutationForgotPassword.mutateAsync({
        email,
      });
      if (data.status === "Err") {
        messageComponent.error(data.message);
      }
      if (data.status === "OK") {
        localStorage.setItem("code", JSON.stringify(data.code));
        setCodeForm(true);
      }
    }
  };

  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword) {
      const data = await mutationUpdatePassword.mutateAsync({
        email,
        newPassword,
      });
      if (data.status === "Err") {
        messageComponent.error(data.message);
      }
      if (data.status === "OK") {
        localStorage.removeItem("code");
        messageComponent.success("Cập nhật mật khẩu thành công!");
        setEmail("");
        setResetPasswordForm(false);
        setLoginform(true);
        setForgotPassword(false);
        setCodeForm(false);
      }
    }
  };

  useEffect(() => {
    if (IsLogin & isSuccess && data?.status === "OK") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }

      if (data.access_token) {
        localStorage.setItem("access_token", JSON.stringify(data.access_token));
      }

      if (data.access_token) {
        const decoded = jwtDecode(data.access_token);
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
    setCode("");
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
          <div className="grid w-4/5 grid-cols-2 overflow-hidden rounded-3xl border shadow-md md:w-3/5">
            <div className="col-span-2 px-9 py-5 lg:col-span-1">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto" src={logo} />
                  <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {forgotPassword
                      ? "Quên mật khẩu"
                      : resetPasswordForm
                        ? "Cập nhật mật khẩu"
                        : IsLogin
                          ? "Đăng nhập"
                          : "Đăng ký"}
                  </h2>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                  {/* Form đăng nhập /Đăng ký */}
                  {loginform && (
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
                            <div className="w-full text-start text-primary">
                              {message}
                            </div>
                          )}
                          {IsLogin && (
                            <a
                              href="#"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                              onClick={() => {
                                setForgotPassword(true);
                                setLoginform(false);
                              }}
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
                  )}
                  {/* Form nhập mã xác minh */}
                  {forgotPassword && !resetPasswordForm && (
                    <form
                      className="space-y-4"
                      onSubmit={handleSubmitForgotPassword}
                    >
                      <div>
                        <div className="mt-1">
                          {!codeForm ? (
                            <InputFormComponent
                              name="email"
                              type="email"
                              valueInput={email}
                              handleOnchange={handleChangeEmail}
                              placeholder="Email"
                            />
                          ) : (
                            <InputFormComponent
                              name="code"
                              type="text"
                              valueInput={code}
                              handleOnchange={(e) => setCode(e.target.value)}
                              placeholder="Mã xác minh"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Xác nhận
                        </button>
                      </div>
                    </form>
                  )}
                  {/* Form cập nhật mật khẩu */}
                  {resetPasswordForm && (
                    <form
                      className="space-y-4"
                      onSubmit={handleSubmitUpdatePassword}
                    >
                      <div>
                        <div className="mt-1">
                          <InputFormComponent
                            type="text"
                            valueInput={newPassword}
                            handleOnchange={(e) =>
                              setNewPassword(e.target.value)
                            }
                            placeholder="New password"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-lg  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cập nhật
                        </button>
                      </div>
                    </form>
                  )}

                  <p className="mt-6 text-center text-sm text-gray-500">
                    {IsLogin ? "Chưa có tài khoản? " : "Bạn đã có tài khoản? "}
                    <a
                      href="#"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        setIsLogin(!IsLogin);
                        handleClearInput();
                        setForgotPassword(false);
                        setCodeForm(false);
                        setLoginform(true);
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
            <div className="hidden flex-col items-center justify-center rounded-l-[100px] bg-primary p-5 text-white lg:flex">
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
