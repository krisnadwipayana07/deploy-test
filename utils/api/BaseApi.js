import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 406) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
