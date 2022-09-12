import { COOKIE_ACCESS_TOKEN_KEY } from '@/auth/constants';
import { CookiesUtils } from '@/common/utils';
import axios, { AxiosRequestConfig } from 'axios';

const myAxios = axios.create({
  baseURL: '/api',
  withCredentials: false,
});

myAxios.interceptors.request.use(function (request: AxiosRequestConfig) {
  let accessTokenFromReq = null;
  if (request.headers) {
    // extract token from cookies
    const cookiesFromReq = CookiesUtils.parse(request.headers.cookie as string);
    accessTokenFromReq = cookiesFromReq[COOKIE_ACCESS_TOKEN_KEY];
  } else {
    request.headers = {};
  }
  const accessToken = accessTokenFromReq ?? CookiesUtils.get(COOKIE_ACCESS_TOKEN_KEY);
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

myAxios.interceptors.response.use(function (response: any) {
  return response.data;
});

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
