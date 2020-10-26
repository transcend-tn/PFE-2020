import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ENTRYPOINT } from '../constants/uris';

const instance = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const { headers, ...conf } = config;
  const axiosConfig: AxiosRequestConfig = {
    baseURL: ENTRYPOINT,
    ...conf,
  };

  const axiosInstance = Axios.create(axiosConfig);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => error,
  );

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const { origin } = new URL(`${config.baseURL}/${config.url}`);
      const allowedOrigins = [ENTRYPOINT];
      const tokenStr = localStorage.getItem('accessToken');
      if (tokenStr && allowedOrigins.includes(origin)) {
        const token = JSON.parse(tokenStr);
        config.headers.authorization = `Bearer ${token.accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const axiosInstance = instance();

export default axiosInstance;
