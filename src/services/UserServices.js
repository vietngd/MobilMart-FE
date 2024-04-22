import axios from "axios";

const loginUser = async (data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(`${baseUrl}/user/sign-in`, data);
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
    const response = await axios.get(`${baseUrl}/user/getDetailUser/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { loginUser, createUser, getDetailUser };
