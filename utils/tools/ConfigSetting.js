import GetLocalStorage from "../../components/atoms/GetLocalStorage";

const auth = { Authorization: "Bearer " + GetLocalStorage("token") };

export function configSetting(params = {}) {
  return { params: params, headers: auth };
}
