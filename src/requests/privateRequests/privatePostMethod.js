import axiosInstance  from "../axiosInstance"

export const privatePostMethod = async (url, data, responseFunction, heads = {}) => {
  try {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    axiosInstance.post(url, data, {
      headers: {
        'Content-Type': heads['Content-Type'] || 'application/json',
        Authorization: `Bearer ${tokens?.access}`,
      },
    }).then((response) => {
      responseFunction(response);
    }).catch((error) => {
      responseFunction(error.response);
    });
  } catch (error) {
    responseFunction(error.response);
  }
};