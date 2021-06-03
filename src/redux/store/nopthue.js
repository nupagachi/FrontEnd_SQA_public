import Service from 'src/service/ApiService';
import { API_URL } from 'src/constants';

const service = new Service();

export const getDanhSachThue = id => {
  try {
    const res = service.get(API_URL.DanhSachNopThue + `/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
export const dongThue = (id, data) => {
  try {
    const res = service.post(API_URL.PostNopTHue + `/${id}`, data);
    return res;
  } catch (err) {
    throw err;
  }
};
