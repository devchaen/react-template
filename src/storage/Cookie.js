import { Cookies } from 'react-cookie';
import { redirect } from 'react-router-dom';
const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set('refresh_token', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  const token = cookies.get('refresh_token');
  if (!token) {
    return null;
  }
  return token;
};

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};

export const cookieLoader = () => {
  const token = getCookieToken();
  return token;
};
