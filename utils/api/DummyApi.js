import axios from "axios";

const dummy = axios.create({});

export async function getDetailDataDummy(id) {
  return dummy.get("/api/merchants/" + id);
}
