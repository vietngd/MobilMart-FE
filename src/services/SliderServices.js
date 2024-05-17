import axios from "axios";
import { axiosJWT } from "./userServices";

const CreateSlider = async (sliders) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.post(`${baseUrl}/slider/create`, {
      sliders: sliders,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const GetAllSlider = async () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.get(`${baseUrl}/slider/getAll`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const DeleteSlider = async (id, access_token) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axiosJWT.delete(`${baseUrl}/slider/delete/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { CreateSlider, GetAllSlider, DeleteSlider };
