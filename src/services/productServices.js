import axios from "axios";

const getAllProduct = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/product/getAll`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getProductByCategory = async (categoryId) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/product/getAll/${categoryId}`);
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

export { getAllProduct, getProductByCategory, createProduct };