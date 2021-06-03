import Service from "src/service/ApiService";
import { API_URL } from "src/constants";

const service = new Service();

export const postTax = async (data) => {
  try {
    const res = await service.post(API_URL.PostTax,data);
    return res;
  } catch (err) {
    throw err;
  }
};