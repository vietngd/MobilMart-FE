import axios from "axios";

const createComment = async (data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  try {
    const response = await axios.post(`${baseUrl}/comment/create`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllComment = async (product_id, page, pageSize) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const params = {
    product_id,
    page,
    pageSize,
  };
  try {
    const response = await axios.get(`${baseUrl}/comment/getAllComment`, {
      params: params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const ReplyComment = async (data) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { user_id, comment_id, content } = data;
  try {
    const response = await axios.post(`${baseUrl}/comment/reply-comment`, {
      user_id,
      comment_id,
      content,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { createComment, getAllComment, ReplyComment };
