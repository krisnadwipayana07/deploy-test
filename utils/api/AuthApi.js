import { client } from "./BaseApi";

const login = "/web/v1/users/login",
  register = "/web/v1/users/register";

export async function loginRequest(data) {
  return await client.post(login, data);
}

export async function registerRequest(data) {
  return await client.post(register, data);
}
