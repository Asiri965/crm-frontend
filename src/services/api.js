import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const token = parsedUserInfo?.data?.token || parsedUserInfo?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
