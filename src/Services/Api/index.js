import {create} from 'apisauce';
import {BASE_URL} from '../../Config';
import apiTrace from './Trace';
import setTrace from './Interceptor';

export const URIS = {
  VERSION: 'app/version',
  LOGIN: 'login',
  REFRESH: 'refresh',
  LOGOUT: 'logout',
};

const createApiClient = (baseURL = BASE_URL) => {
  let api = create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  });

  api.addMonitor(apiTrace);
  // oAuth authentication kullanılıyorsa "Trace.js" kullanılır
   setTrace(api);

  const setAuthorizationHeader = access_token =>
    api.setHeader('Authorization', 'Bearer ' + access_token);

  const loginUser = payload => api.post(URIS.LOGIN, payload);

  //api ile çalışacak fonksiyonlar
  return {
    setAuthorizationHeader,
    loginUser,
  };
};

export default {createApiClient};
