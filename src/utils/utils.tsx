import { AuthPayload } from 'store/types/types';

export const appUtils = {
  getInitialState: (): AuthPayload => {
    const initialState = { loggedIn: false };
    let token = appUtils.getLocalStorageParam('jwtToken');
    if (token) {
      initialState.loggedIn = true
    }
    return initialState
  },
  getLocalStorageParam: (param: string): string | undefined => {
    let token = localStorage.getItem(param);
    if (token) {
      return token
    }
  },
  getParams: (url: string): string => {
    const params = url.split('/').filter(param => param);
    if (params.length > 0) {
      return params.join()
    } else {
      return "none"
    }
  },
  getUrl: (params: string, key?: string) => {
    if (key) {
      return appUtils
        .flatUrlParams(params)
        .filter(param => param.includes(key))
        .flatMap(param => param)
    } else {
      return appUtils
        .flatUrlParams(params)
    }
  },
  flatUrlParams: (params: string) => params
    .replace('?', '')
    .split('&')
    .map(params => params.split('=')),
  getGqlParams: (params: string[]) => {
    return {
      params: (params.length > 0) ? { query: `{${params}}` } : {}
    };
  },
  setFirstUpperCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
};
