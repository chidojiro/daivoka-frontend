import { AuthApis } from '@/auth/apis';
import { useAccessTokenCookieState } from '@/auth/useAccessTokenCookieState';
import { Button } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { SignOutIcon } from '@/common/icons';
import { useProfile } from '@/profile/useProfile';

export const ProfileSection = () => {
  const { profile, mutateProfile } = useProfile();
  const [, setAccessToken] = useAccessTokenCookieState();

  const { handle: handleLogout, isLoading } = useHandler(async () => {
    await AuthApis.logout();
    setAccessToken('');
    mutateProfile();
  });

  if (!profile) return null;

  const { email } = profile;

  return (
    <div className='flex items-center gap-6' data-testid='profile-section'>
      <p>{email}</p>
      <Button variant='outline' onClick={handleLogout} iconRight={<SignOutIcon />} loading={isLoading}>
        Logout
      </Button>
    </div>
  );
};
