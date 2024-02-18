import axiosInstance from "../../axios";

export const publicGetMethod = async (url, data, responseFunction) => {
  try {
    const response = await axiosInstance.get(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    responseFunction(response);
  } catch (error) {
    responseFunction(error.response);
  }
};
