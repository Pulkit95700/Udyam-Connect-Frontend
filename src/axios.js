import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Replace with your API base URL
  // You can also set other configuration options here, such as headers, timeout, etc.
});

export default axiosInstance;