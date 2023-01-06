import GetLocalStorage from "../../components/atoms/GetLocalStorage";
import { client, v2 } from "./BaseApi";

const config = {
  headers: { Authorization: "Bearer " + GetLocalStorage("token") },
};

const CheckoutAPI = "/web/v1/sales",
  GenerateQRISAPI = "/v1/payment/qris",
  GenerateVaAPI = "/v1/payment/va",
  CallbackQRISAPI = "/v1/payment/validate/qris",
  CallbackVAAPI = "/v1/payment/validate/va";

export async function CheckoutRequest(data) {
  return await client.post(CheckoutAPI, data, config);
}

export async function GenerateQris(data) {
  return await v2.post(GenerateQRISAPI, data, config);
}

export async function GenerateVa(data) {
  return await v2.post(GenerateVaAPI, data, config);
}

export async function CallbackQris(data) {
  return await v2.post(CallbackQRISAPI, data, config);
}

export async function CallbackVa(data) {
  return await v2.post(CallbackVAAPI, data, config);
}
