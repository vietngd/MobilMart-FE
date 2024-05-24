import axios from "axios";

const axiosJWT = axios.create();

const loginUser = async (data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(`${baseUrl}/user/sign-in`, data, {
      withCredentials: true, // should be there
      credentials: "include", // should be there
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//Tao tai khoan
const createUser = async (data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(`${baseUrl}/user/sign-up`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDetailUser = async (id, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.get(`${baseUrl}/user/getDetailUser/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const refreshToken = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(
      `${baseUrl}/user/refresh-token`,
      {},
      {
        //withCredentials : khi có cookie thì trình truyệt sẽ tự truyền cookie đó xuống cho backend
        withCredentials: true,
        credentials: "include",
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(
      `${baseUrl}/user/logout`,
      {},
      {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (data, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { id } = data;
  try {
    const response = await axiosJWT.put(
      `${baseUrl}/user/update/${id}`,
      {
        ...data,
      },
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async (access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.get(`${baseUrl}/user/getAllUser`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (id, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.delete(`${baseUrl}/user/delete/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const forgotPassword = async (email) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(`${baseUrl}/user/forgot-password`, {
      email,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const verifyCode = async (code, token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(
      `${baseUrl}/user/verify-forgot-password`,
      {
        code,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const updatePassWord = async (email, newPassword) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.put(`${baseUrl}/user/update-password`, {
      email,
      newPassword,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export {
  loginUser,
  createUser,
  getDetailUser,
  refreshToken,
  axiosJWT,
  logoutUser,
  updateUser,
  getAllUser,
  deleteUser,
  forgotPassword,
  verifyCode,
  updatePassWord,
};
