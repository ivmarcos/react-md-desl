import axios from 'axios';
import config from 'config';

const defaultOptions = { withCredentials: true };

export const createApi = (url, options) => {

  const created = axios.create({
    baseURL: url,
    ...defaultOptions,
    ...options,
  });

  created.interceptors.request.use(request => request, error => Promise.reject(error));

  created.interceptors.response.use(response => response, (error) => {

    console.log('error', error.response);

    const data = error.response.data;

    let result;

    if (data) {

      result = data.msg ? { ...data } : { html: data, msg: error.response.statusText };

    } else {

      result = error.toString();

    }

    console.log('result', result);

    return Promise.reject(result);

  });
  return created;

};

export const api = createApi(config.apiUrl);

