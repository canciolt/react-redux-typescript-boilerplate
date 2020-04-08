import { RouteProps } from 'react-router-dom';

export interface UserLogin {
  username: string;
  password: string;
}

export interface ProtectedRouteProps extends RouteProps {
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

export interface User {
  id: string;
  first_name: string;
  username: string;
  email: string;
}

export interface ExtendUser extends User {
  last_login: string;
  is_superuser: boolean;
  is_active: boolean;
  user_permissions: number[];
  groups: number[];
}
