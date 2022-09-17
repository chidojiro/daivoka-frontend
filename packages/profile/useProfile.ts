import { useAccessTokenCookieState } from '@/auth/useAccessTokenCookieState';
import { useFetcher } from '@/common/hooks';
import { LocalStorageUtils } from '@/common/utils';
import React from 'react';
import { ProfileApis } from './apis';

export const useProfile = () => {
  const [accessToken] = useAccessTokenCookieState();

  const {
    data: profile,
    isInitializing,
    isValidating,
    isLagging,
    mutate,
  } = useFetcher(accessToken && ['useProfile', accessToken], () => ProfileApis.getMyProfile(), {
    onSuccess: data => LocalStorageUtils.set('profile', data),
  });

  return React.useMemo(
    () => ({
      profile,
      isInitializingProfile: isInitializing,
      isValidatingProfile: isValidating,
      isLaggingProfile: isLagging,
      mutateProfile: mutate,
    }),
    [isInitializing, isLagging, isValidating, mutate, profile]
  );
};
