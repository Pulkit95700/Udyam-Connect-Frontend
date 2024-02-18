import axiosInstance from "../../axios";

export const publicPostMethod = async (url, data, responseFunction) => {
  try {
    axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => responseFunction(response));
  } catch (error) {
    responseFunction(error.response);
  }
};
