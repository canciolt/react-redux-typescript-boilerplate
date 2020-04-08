import axios, { AxiosInstance } from 'axios';
import { AppConfig, appErrorsMessages } from 'config';
import { ExtendUser, User, UserLogin } from 'interfaces/interfaces';
import { appUtils } from 'utils/utils';
import { TokenError } from 'errors/index';
import { AuthPayload } from 'store/types/types';


class HttpService {

  _http: AxiosInstance;
  private static instance: HttpService;

  private constructor() {
    this._http = axios.create({
      baseURL: AppConfig.api.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private async refreshToken(): Promise<string> {
    try {
      const refreshToken = appUtils.getLocalStorageParam(AppConfig.app.TOKEN_PARAM_REFRESH);
      if (refreshToken) {
        const response = await this._http.post(AppConfig.api.API_LOGIN_REFRESH_URL, { refresh: refreshToken });
        const token = response.data;
        localStorage.setItem(AppConfig.app.TOKEN_PARAM_ACCESS, token.access);
        return token.access;
      } else {
        throw new TokenError(appErrorsMessages.TOKEN_ERROR);
      }
    } catch (error) {
      throw error;
    }
  }

  private setAutToken(token?: String): void {
    if (this._http) {
      if (token) {
        this._http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete this._http.defaults.headers.common['Authorization'];
      }
    }
  }

  public async loginJWT(user: UserLogin): Promise<AuthPayload> {
    if (this._http) {
      try {
        const response = await this._http.post(AppConfig.api.API_LOGIN_URL, user);
        const token = response.data;
        localStorage.setItem(AppConfig.app.TOKEN_PARAM_ACCESS, token.access);
        localStorage.setItem(AppConfig.app.TOKEN_PARAM_REFRESH, token.refresh);
        return {
          loggedIn: true,
        };
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Instance error !');
    }
  }

  public async usersList(params: string[] = []): Promise<User[]> {
    if (this._http) {
      try {
        const token = await this.refreshToken();
        this.setAutToken(token);
        const response = await this._http.get(AppConfig.api.API_USER_URL, appUtils.getGqlParams(params));
        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Instance error !');
    }
  }

  public async usersDetail(id: string, params: string[] = []): Promise<ExtendUser> {
    if (this._http) {
      try {
        const token = await this.refreshToken();
        this.setAutToken(token);
        const response = await this._http.get(AppConfig.api.API_USER_URL + id, appUtils.getGqlParams(params));
        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Instance error !');
    }
  }

  public async userDel(id: string): Promise<void> {
    if (this._http) {
      try {
        const token = await this.refreshToken();
        this.setAutToken(token);
        await this._http.delete(AppConfig.api.API_USER_URL + id);
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('Instance error !');
    }
  }
}

export default HttpService.getInstance();
