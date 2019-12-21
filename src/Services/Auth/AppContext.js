import React, {useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {APP_STATE} from '../../Constants';
import {resetLoginCredentials} from '../Keychain';
import NavigationService, {Routes} from '../../Navigation';
import {useStoreActions, useStoreState} from 'easy-peasy';
import useCheckVersion from '../CheckVersion';

const AppStateContext = React.createContext();

export const AppContextProvider = props => {
  const {loginUser, setState, checkLogin} = useStoreActions(actions => ({
    loginUser: actions.login.loginUser,
    setState: actions.login.changeAppState,
    checkLogin: actions.login.checkLogin,
  }));
  useCheckVersion();
  const state = useStoreState(store => store.login.appstate);

  const _logoutUser = useCallback(async () => {
    const reset = resetLoginCredentials();
    if (reset) {
      logout();
      setState(APP_STATE.PUBLIC);
    }
  }, [setState]);

  const logout = useCallback(() => {
    Alert.alert(
      'Çıkış Onay',
      'Çıkış Yapmak İstiyor Musunuz?',
      [
        {
          text: 'Evet, Çıkış Yap',
          onPress: _logoutUser,
        },
        {
          type: 'cancel',
          text: 'Hayır',
        },
      ],
    );
  }, [_logoutUser]);

  const login = useCallback(
    reqData => {
      loginUser(reqData);
    },
    [loginUser],
  );

  //on mount esnasında login kontrolü
  useEffect(() => {
    state == APP_STATE.UNKNOWN && checkLogin();
  }, [checkLogin, state]);

  // app state reactor
  useEffect(() => {
    if (state == APP_STATE.PRIVATE) {
      NavigationService.navigate(Routes.MAIN_APP);
    } else if (state == APP_STATE.PUBLIC) {
      NavigationService.navigate(Routes.LOGIN_STACK);
    } else {
      //
    }
  }, [state]);

  return (
    <AppStateContext.Provider
      value={{
        state,
        logout,
        login,
      }}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export default AppStateContext;
