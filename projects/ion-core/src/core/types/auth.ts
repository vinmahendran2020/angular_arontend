export interface IAuthData {
  accessKeyId: string;
  secretKey: string;
  idToken: string;
  sessionToken: string;
  refreshToken: string;
  accessToken: string;
}

export interface IAuthSuccess {
  data: IAuthData;
}

export interface IPrincipal extends IAuthData {
  user: string;
}
