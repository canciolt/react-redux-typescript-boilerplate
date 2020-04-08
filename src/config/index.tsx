enum APIConfig {
  API_BASE_URL = 'http://127.0.0.1:8889',
  API_LOGIN_URL = '/api/token/',
  API_LOGIN_REFRESH_URL = '/api/token/refresh/',
  API_USER_URL = '/api/user/'
}

enum APPConfig {
  BASE_URL = 'http://127.0.0.1:9000',
  TOKEN_PARAM_ACCESS = 'jwtToken',
  TOKEN_PARAM_REFRESH = 'jwtTokenR'
}

export enum appErrorsMessages {
  TOKEN_ERROR = 'No token provided'
}

export const AppConfig = {
  api: APIConfig,
  app: APPConfig,
}


