import { ExtendUser, User } from 'interfaces/interfaces';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LIST = 'USER_LIST';
export const USER_DETAIL = 'USER_DETAIL';
export const USER_DEL = 'USER_DEL';
export const APP_ERROR = 'APP_ERROR';


/**
 * Auth Reducer Types
 */
export interface AuthPayload {
  loggedIn: boolean,
}

export interface AuthAction {
  type: typeof USER_LOGIN | typeof USER_LOGOUT
  payload: AuthPayload
}

/**
 * Error Reducer Types
 */
export interface ErrorPayload {
  detail?: string,
  type?: string
}

export interface ErrorAction {
  type: typeof APP_ERROR
  payload: ErrorPayload
}

/**
 * Admin Reducer Types
 */

export interface AdminUserListAction {
  type: typeof USER_LIST
  payload: { list: User[] }
}

export interface AdminUserDetailAction {
  type: typeof USER_DETAIL
  payload: { detail: User }
}

export interface AdminUserDelAction {
  type: typeof USER_DEL
  meta: { id: string }
}

/**
 * App State Type
 */
export interface AdminUserState {
  list: User[],
  detail?: ExtendUser
}

export interface AppState {
  auth: AuthPayload
  error: ErrorPayload
  user: AdminUserState
}


export type AuthActionTypes = AuthAction | ErrorAction
export type AdminActionTypes = AdminUserDelAction | AdminUserDetailAction | AdminUserListAction | ErrorAction

