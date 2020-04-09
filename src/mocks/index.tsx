import { USER_LOGIN, USER_LOGOUT } from 'store/types/types';

export const userLoginResponse = {
  loggedIn: true,
};

export const userLoginReducerData = {
  username: 'admin',
  password: 'admin',
};

export const expectedLoginActions = {
  type: USER_LOGIN,
  payload: { loggedIn: true },
};

export const expectedLogoutActions = {
  type: USER_LOGOUT,
  payload: { loggedIn: false },
};
