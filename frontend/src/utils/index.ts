import { getCookie } from './cookie';

export const checkLogin = () => {
  return getCookie('token') ? true : false;
};
