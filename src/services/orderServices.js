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

const getOrderByUser = async (access_token, user_id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const params = { user_id };

  try {
    const response = await axiosJWT.get(
      `${baseUrl}/order/getOrderByUser`,
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

const getAllOrder = async (access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.get(`${baseUrl}/order/getAllOrder`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDetailOrder = async (access_token, order_id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

  try {
    const response = await axiosJWT.get(
      `${baseUrl}/order/getDetailOrder/${order_id}`,
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
const updateTransport = async (access_token, order_id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.put(
      `${baseUrl}/order/update-transport/${order_id}`,
      {},
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

const deleteOrder = async (access_token, order_id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.delete(
      `${baseUrl}/order/delete/${order_id}`,
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

export {
  createOrder,
  getOrderByUser,
  getAllOrder,
  getDetailOrder,
  updateTransport,
  deleteOrder,
};
