import {
  USER_LOGIN,
  USER_LOGOUT,
  APP_ERROR,
  USER_LIST, AdminActionTypes, USER_DEL, USER_DETAIL,
} from 'store/types/types';
import { UserLogin } from 'interfaces/interfaces';
import HttpService from 'services/HttpService';
import { AppConfig } from 'config/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';

const http = HttpService;

export const userLoginAction = (user: UserLogin) => async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  try {
    const data = await http.loginJWT({
      username: user.username,
      password: user.password,
    });
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: { detail: error.response.data.detail, type: 'danger' },
    });
  }
};

export const userLogoutAction = () => {
  return async (dispatch: any) => {
    localStorage.removeItem(AppConfig.app.TOKEN_PARAM_ACCESS);
    localStorage.removeItem(AppConfig.app.TOKEN_PARAM_REFRESH);
    dispatch({
      type: USER_LOGOUT,
      payload: { loggedIn: false },
    });
  };
};

export const appErrorDelAction = () => {
  return {
    type: APP_ERROR,
    payload: { detail: undefined, type: undefined },
  };
};

export const userListAction = (): ThunkAction<void, AdminActionTypes, unknown, Action<string>> => async (dispatch: any) => {
  try {
    const data = await http.usersList(['id', 'username', 'first_name', 'email']);
    dispatch({
      type: USER_LIST,
      payload: { list: data },
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: { detail: error.response.data.detail, type: 'danger' },
    });
  }
};

export const userDetailAction = (id: string): ThunkAction<void, AdminActionTypes, unknown, Action<string>> => async (dispatch: any) => {
  try {
    const data = await http.usersDetail(id,
      [
        'username',
        'first_name',
        'email',
        'last_login',
        'is_superuser',
        'is_active']);
    dispatch({
      type: USER_DETAIL,
      payload: { detail: data },
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: { detail: error.response.data.detail, type: 'danger' },
    });
  }
};

export const userDetailDelAction = () => {
  return {
    type: USER_DETAIL,
    payload: { detail: undefined },
  };
};

export const userDelAction = (id: string): ThunkAction<void, AdminActionTypes, unknown, Action<string>> => async (dispatch: any) => {
  try {
    await http.userDel(id);
    dispatch({
      type: USER_DEL,
      meta: { id: id },
    });
  } catch (error) {
    dispatch({
      type: APP_ERROR,
      payload: { detail: error.response.data.detail, type: 'danger' },
    });
  }
};


