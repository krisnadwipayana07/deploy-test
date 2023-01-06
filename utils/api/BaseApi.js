import { useToast } from "@chakra-ui/react";
import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

export const v2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_V2,
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
      useToast({
        title: "Login Token Expired",
        description:
          "Waktu Login anda habis, mohon ulang login agar dapat kembali menikmati kemudahan akses",
      });
    }
    return Promise.reject(error);
  }
);
