//API çağırırken Authorization ile 401 Status kodu döndüğünde "Middleware" görevi görür

import {getLoginCredentials, setLoginCredentials} from '../Keychain';
import {URIS} from './index';

export default api => {
  api.axiosInstance.interceptors.response.use(
    response => {
      return response;
    },

    async error => {
      let originalRequest = error.config;
      console.log('LOG_got_error', originalRequest);
      if (
        error.response &&
        error.response.status == 401 &&
        !originalRequest._retry &&
        !originalRequest.headers._retry
      ) {
        console.log('LOG_status_401_error', '-> refreshing now ');
        originalRequest._retry = true;
        // refresh token getir
        const credentials = await getLoginCredentials(); // refresh_token: 'some_token_lwncenSdfaefvarfSWeretg4234Asfd@4Afa', JWT token dönmesi gerekir
        if (credentials) {
          // refresh token kullanılarak api çağrılır
          const {refresh_token} = credentials;
          return new Promise(async (resolve, reject) => {
            const response = await api.post(
              URIS.REFRESH,
              {refresh_token},
              {headers: {_retry: true}},
            );
            // access_token header'a set edilir
            if (response.ok && response.status == 200) {
              api.setHeader(
                'Authorization',
                'Bearer ' + response.data.access_token,
              );
              originalRequest.headers['Authorization'] =
                'Bearer ' + response.data.access_token;
              //Keychain kullanılarak password kaydı tutulur
              await setLoginCredentials(
              	JSON.stringify(response.data)
              );
              resolve(api.axiosInstance(originalRequest));
            } else {
              return Promise.resolve(error);
            }
          });
        } else {
          return Promise.resolve(error);
        }
      } else {
        return Promise.resolve(error);
      }
    },
  );
};
