import axios from "axios";
import { axiosJWT } from "./userServices";

const getAllProduct = async (productName, page, pageSize) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  let params = { page, pageSize };
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
const getProductByCategory = async ({
  categoryId,
  pageSize,
  sortField = "sale",
  sortOrder,
}) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  let params = { page: 1, pageSize, sortField, sortOrder };
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

const createProduct = async (access_token, data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.post(`${baseUrl}/product/create`, data, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (id, access_token, data) => {
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

const deleteProduct = async (id, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.delete(`${baseUrl}/product/delete/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
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
