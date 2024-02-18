import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/", // Replace with your API URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can customize this part to retrieve your authentication token from where it's stored (e.g., localStorage or a state variable)
    const access = JSON.parse(localStorage.getItem("tokens")).access;

    // If you have an authentication token, set it in the Authorization header
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    // Handle any request errors here

    window.location.href = "/user/login";
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true;

      let tokens = JSON.parse(localStorage.getItem("tokens"));

      if (!tokens?.refresh) {
        throw new Error("Refresh token not found");
      }

      try {
        // Make a request to your refresh token route to obtain a new access token
        const refreshTokenResponse = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/user/token/refresh/`,
          {
            refresh: tokens?.refresh, // Replace with your actual refresh token
          }
        );
          
        // Update the access token in your application
        // const newAccessToken = refreshTokenResponse.data.access;
        // Store the new access token in your preferred way (e.g., localStorage, Vuex store)
        // ...

        // tokens.access = newAccessToken;

        let newtokens = {
          access: refreshTokenResponse.data.access,
          refresh: tokens?.refresh,
        };
        localStorage.removeItem("tokens");

        localStorage.setItem("tokens", JSON.stringify(newtokens));

        error.config.headers.Authorization = `Bearer ${newtokens.access}`;
      } catch (refreshError) {
        // Handle errors related to refreshing the token
        // console.error("Error refreshing access token:", refreshError);
        // Redirect to the login page or take appropriate action
        // ...

        localStorage.removeItem("tokens");
        window.location.href = "/user/login";
        return Promise.resolve();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
