import { Profile } from '@/profile/types';
import { RestApis } from '@/rest/apis';

const getMyProfile = () => RestApis.get<Profile>(`/me`);

export const ProfileApis = {
  getMyProfile,
};
