import axios from "axios";

const getAllCategory = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/category/getAll`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { getAllCategory };
