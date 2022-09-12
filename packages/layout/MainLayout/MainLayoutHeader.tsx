import { Button } from '@/common/components';
import { HomeIcon, PlusIcon } from '@/common/icons';
import { StringUtils } from '@/common/utils';
import { useProfile } from '@/profile/useProfile';
import clsx from 'clsx';
import { useDisclosure } from 'hsk-headless';
import { CreateAccountModal } from './CreateAccountModal';
import { LoginForm } from './LoginForm';
import { ProfileSection } from './ProfileSection';
import Link from 'next/link';

export const MainLayoutHeader = () => {
  const { profile } = useProfile();

  const createAccountModalDisclosure = useDisclosure();

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('main-layout-header'),
        'py-4 px-4 h-20',
        'border-b-2 border-primary text-primary',
        'flex items-center justify-between gap-4'
      )}>
      <Link href='/'>
        <div className='flex items-center gap-4'>
          <HomeIcon size={50} />
          <p className='font-bold text-h1'>Daivoka</p>
        </div>
      </Link>
      {profile ? (
        <ProfileSection />
      ) : (
        <div className='flex items-center gap-2'>
          <CreateAccountModal open={createAccountModalDisclosure.isOpen} onClose={createAccountModalDisclosure.close} />
          <LoginForm />
          <Button iconRight={<PlusIcon />} variant='outline' onClick={createAccountModalDisclosure.open}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
};
