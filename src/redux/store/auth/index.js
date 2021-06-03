import Service from 'src/service/ApiService';
import { API_URL } from 'src/constants';

const service = new Service();

export const Login = data => {
  try {
    const res = service.post(API_URL.Login, data);
    return res;
  } catch (err) {
    throw err;
  }
};
export const Register = async data => {
  try {
    const res = await service.post(API_URL.Register, data);
    return res;
  } catch (err) {
    throw err;
  }
};
