import axios from 'axios';

import { API_URL_ROOT, LOCAL_STORAGE_KEY } from 'src/constants';
import { GetDataFromStorage } from 'src/utils';

const unhandledException = {
  errorType: 'UnhandledException',
  errorMessage: 'Unhandled Exception'
};

const requestHandler = request => {
  request.headers.common['Content-Type'] = 'application/json; charset=utf-8';
  request.headers.common['Accept'] = 'application/json, text/javascript, */*; q=0.01';
  request.headers.common['Access-Control-Allow-Origin'] = '*';

  const _token = GetDataFromStorage(LOCAL_STORAGE_KEY.ID);
  if (_token) request.headers.common['Authorization'] = `Bearer ${_token}`;

  return request;
};

const successHandler = response => {
  return response;
};

const errorHandler = error => {
  return Promise.reject({ ...(error?.response?.data || unhandledException) });
};

export default class Service {
  constructor(namespace) {
    this.namespace = namespace;
    this.axios = axios.create({
      baseURL: API_URL_ROOT,
      responseType: 'json'
    });

    this.axios.interceptors.request.use(
      request => requestHandler(request),
      error => errorHandler(error)
    );

    this.axios.interceptors.response.use(
      response => successHandler(response),
      error => errorHandler(error)
    );
  }

  get(action, params) {
    const _params = params ? action + '?' + params : action;
    return new Promise((resolve, reject) => {
      this.axios
        .request(_params, { method: 'GET' })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }

  postParams(action, params, body) {
    const _params = params ? action + '?' + params : action;
    return new Promise((resolve, reject) => {
      this.axios
        .request(_params, {
          method: 'POST',
          data: body
        })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }

  getBinary(action, params) {
    const _params = params ? action + '?' + params : action;
    return new Promise((resolve, reject) => {
      axios
        .create({
          baseURL: API_URL_ROOT,
          responseType: 'blob'
        })
        .request(_params, {
          method: 'GET'
        })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }

  postBinary(action, params, body, callback = () => {}) {
    const _params = params ? action + '?' + params : action;
    const _token = GetDataFromStorage(LOCAL_STORAGE_KEY.ID);
    let headers = {};
    if (_token) {
      headers = {
        Authorization: `Bearer ${_token}`
      };
    }
    callback(0);
    return new Promise((resolve, reject) => {
      axios
        .create({
          baseURL: API_URL_ROOT,
          responseType: 'blob',
          headers: headers,
          onDownloadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            let percentCompleted = Math.floor((loaded * 100) / total);
            callback(percentCompleted);
          }
        })
        .request(_params, {
          method: 'POST',
          data: body
        })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }

  post(action, body) {
    return new Promise((resolve, reject) => {
      this.axios
        .request(action, {
          method: 'POST',
          data: body
        })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }

  put(action, params, body) {
    const _params = params ? action + '?' + params : action;
    return new Promise((resolve, reject) => {
      this.axios
        .request(_params, {
          method: 'PUT',
          data: body
        })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }

  delete(action, params) {
    const _params = params ? action + '?' + params : action;
    return new Promise((resolve, reject) => {
      this.axios
        .request(_params, {
          method: 'DELETE'
        })
        .then(response => {
          if (response?.data) resolve(response.data);
          else reject(response);
        })
        .catch(error => {
          if (error?.response?.data?.error) reject(error.response.data.error);
          else reject(error);
        });
    });
  }
}
