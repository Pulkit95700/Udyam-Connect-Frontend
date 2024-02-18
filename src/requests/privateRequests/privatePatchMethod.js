import axiosInstance  from "../axiosInstance"

export const privatePatchMethod = async (url, data, responseFunction, heads = {}) => {
  try {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    axiosInstance.patch(url, data, {
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