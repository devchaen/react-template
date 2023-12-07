import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) =>
  cookies.set(name, value, { ...option });

export const getCookie = (name) => {
  const cookies = cookies.get(name);

  if (!cookies) {
    return null;
  }

  return cookies;
};

export const removeCookie = (name, option) =>
  cookies.remove(name, { ...option });

export const cookieLoader = () => {
  const cookies = getCookie('jwt_token');
  return cookies;
};
