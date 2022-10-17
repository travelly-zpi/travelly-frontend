import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      config.headers!["Authorization"] = "Bearer " + user.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
