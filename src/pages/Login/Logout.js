import { redirect } from 'react-router-dom';
import { removeCookieToken } from '../../storage/Cookie';

export function action() {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expiration');

  // logout시에도 백엔드랑 응답해야하나?
  // 토큰 만료시간

  removeCookieToken();
  return redirect('/');
}
