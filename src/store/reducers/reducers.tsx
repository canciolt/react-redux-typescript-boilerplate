import {
  AdminActionTypes, AdminUserState,
  APP_ERROR,
  AuthAction,
  AuthPayload,
  ErrorAction,
  ErrorPayload,
  USER_DEL,
  USER_DETAIL,
  USER_LIST,
  USER_LOGIN,
  USER_LOGOUT,
} from 'store/types/types';
import { appUtils } from 'utils/utils';

const authInitialState: AuthPayload = appUtils.getInitialState();
const errorInitialState: ErrorPayload = { detail: undefined, type: undefined };
const adminInitialState: AdminUserState = { list: [], detail: undefined };

export function ErrorReducer(state = errorInitialState, action: ErrorAction) {
  if (action.type === APP_ERROR) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
}

export function AuthReducer(state = authInitialState, action: AuthAction) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.payload };
    case USER_LOGOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AdminReducer(state = adminInitialState, action: AdminActionTypes) {
  switch (action.type) {
    case USER_LIST: {
      return { ...state, ...action.payload };
    }
    case USER_DETAIL: {
      return { ...state, ...action.payload };
    }
    case USER_DEL:
      return { list: state.list.filter(user => user.id != action.meta.id) };
    default:
      return state;
  }
}

