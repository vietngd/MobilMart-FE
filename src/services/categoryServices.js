import axios from "axios";
import { axiosJWT } from "./userServices";

const getAllCategory = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/category/getAll`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (categoryId) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(
      `${baseUrl}/category/getById/${categoryId}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (name, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.post(
      `${baseUrl}/category/create`,
      { name },
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

const deleteCategory = async (id, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.delete(`${baseUrl}/category/delete/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (id, access_token, name) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.put(
      `${baseUrl}/category/update/${id}`,
      {
        name,
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
export {
  getAllCategory,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
