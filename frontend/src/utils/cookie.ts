import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const setCookie = (key: string, value: string) => {
  return cookie.set(key, value);
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};
