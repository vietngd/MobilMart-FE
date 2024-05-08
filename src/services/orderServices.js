import { axiosJWT } from "./userServices";

const createOrder = async (access_token, data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

  try {
    const response = await axiosJWT.post(`${baseUrl}/order/create`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllOrder = async (access_token, user_id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const params = { user_id };

  try {
    const response = await axiosJWT.get(
      `${baseUrl}/order/getAll`,
      {
        params: params,
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

export { createOrder, getAllOrder };
