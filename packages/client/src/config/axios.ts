import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { ENTRYPOINT, HOME_PAGE } from '../constants/uris';

const instance = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const { headers, ...conf } = config;
  const axiosConfig: AxiosRequestConfig = {
    baseURL: ENTRYPOINT,
    ...conf,
  };

  const axiosInstance = Axios.create(axiosConfig);

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error && error.response && error.response.status === 401) {
        localStorage.clear();
        toast.error('Connexion Echouée', {
          position: toast.POSITION.TOP_LEFT,
          className: 'fade alert alert-danger show',
        });
        window.location.href = HOME_PAGE;
      }
      return error;
    },
  );

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const { origin } = new URL(`${config.baseURL}/${config.url}`);
      const allowedOrigins = [ENTRYPOINT];
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${accessToken}`;
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
