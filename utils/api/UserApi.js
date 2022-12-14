import GetLocalStorage from "../../components/atoms/GetLocalStorage";
import { client } from "./BaseApi";

const config = {
  headers: { Authorization: "Bearer " + GetLocalStorage("token") },
};

//list API
const getUserDetailAPI = "/web/v1/users/";

export async function getDetailUserRequest(id) {
  return await client.get(getUserDetailAPI + id, config);
}

export async function editUserRequest(id, data) {
  return await client.put(getUserDetailAPI + id, data, config);
}
