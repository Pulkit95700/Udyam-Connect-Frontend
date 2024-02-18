import axiosInstance  from "../axiosInstance"

export const privateDeleteMethod = async (url, data, responseFunction) => {
  try {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    axiosInstance
      .delete(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens?.access}`,
        },
      })
      .then((response) => {
        responseFunction(response);
      })
      .catch((error) => {
        responseFunction(error.response);
      });
  } catch (error) {
    responseFunction(error.response);
  }
};
