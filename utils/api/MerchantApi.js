import GetLocalStorage from "../../components/atoms/GetLocalStorage";
import { configSetting } from "../tools/ConfigSetting";
import { client } from "./BaseApi";

const merchant = "/web/v1/merchants",
  topMerchant = "/web/v1/merchants/top";

export async function getMerchantTop() {
  return await client.get(topMerchant, configSetting());
}
export async function getAllMerchants(params) {
  return await client.get(merchant, configSetting(params));
}
export async function getMerchantsDetail(id) {
  return await client.get(merchant + "/" + id, configSetting());
}
