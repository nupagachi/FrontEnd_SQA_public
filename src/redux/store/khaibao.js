import Service from 'src/service/ApiService';
import { API_URL } from 'src/constants';

const service = new Service();

export const getTaxById = id => {
  try {
    const res = service.get(API_URL.PostTax + `/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
export const postPay = data => {
  try {
    const res = service.post(API_URL.Pay, data);
    return res;
  } catch (err) {
    throw err;
  }
};
export const tinhThue = data => {
  try {
    const res = service.post(API_URL.TinhThue, data);
    return res;
  } catch (err) {
    throw err;
  }
};
