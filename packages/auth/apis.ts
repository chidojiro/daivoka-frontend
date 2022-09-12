import { Profile } from '@/profile/types';
import { RestApis } from '@/rest/apis';
import { CookiesUtils } from './../common/utils/cookies';
import { COOKIE_ACCESS_TOKEN_KEY } from './constants';
import { LoginPayload, RegisterPayload } from './types';

const login = (payload: LoginPayload) => RestApis.post<Profile & { accessToken: string }>('/login', payload);

const register = (payload: RegisterPayload) => RestApis.post<Profile & { accessToken: string }>('/register', payload);

const logout = () => CookiesUtils.remove(COOKIE_ACCESS_TOKEN_KEY);

export const AuthApis = {
  login,
  register,
  logout,
};
