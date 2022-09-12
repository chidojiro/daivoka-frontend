import { useCookieState } from 'hsk-headless';
import { COOKIE_ACCESS_TOKEN_KEY } from './constants';

export const useAccessTokenCookieState = () => useCookieState(COOKIE_ACCESS_TOKEN_KEY, '');
