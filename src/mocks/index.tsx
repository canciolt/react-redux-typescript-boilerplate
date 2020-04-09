import { USER_LOGIN } from 'store/types/types';

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
