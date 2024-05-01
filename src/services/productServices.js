import axios from "axios";
import { axiosJWT } from "./userServices";

const getAllProduct = async (productName) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  let params = { page: 1, pageSize: 20 };
  if (productName) {
    params.productName = productName;
  }

  try {
    const response = await axios.get(`${baseUrl}/product/getAll`, {
      params: params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getProductByCategory = async (categoryId, pageSize) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  let params = { page: 1, pageSize };
  try {
    const response = await axios.get(
      `${baseUrl}/product/getAll/${categoryId}`,
      {
        params: params,
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(`${baseUrl}/product/create`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (id, data, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.put(
      `${baseUrl}/product/update/${id}`,
      data,
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

const getDetailProduct = async (id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/product/getById/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (id) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.delete(`${baseUrl}/product/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllProduct,
  getProductByCategory,
  createProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
};
