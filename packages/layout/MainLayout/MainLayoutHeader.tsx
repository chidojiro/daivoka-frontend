import { Button } from '@/common/components';
import { HomeIcon, PlusIcon } from '@/common/icons';
import { StringUtils } from '@/common/utils';
import { useProfile } from '@/profile/useProfile';
import { CreateWordModal } from '@/word/CreateWordModal';
import clsx from 'clsx';
import { useDisclosure } from 'hsk-headless';
import Link from 'next/link';
import { CreateAccountModal } from './CreateAccountModal';
import { LoginForm } from './LoginForm';
import { ProfileSection } from './ProfileSection';

export const MainLayoutHeader = () => {
  const { profile } = useProfile();

  const createWordModalDisclosure = useDisclosure();
  const createAccountModalDisclosure = useDisclosure();

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('main-layout-header'),
        'py-4 px-4 h-20',
        'border-b-2 border-primary text-primary',
        'flex items-center justify-between gap-4'
      )}>
      <CreateWordModal open={createWordModalDisclosure.isOpen} onClose={createWordModalDisclosure.close} />
      <Link href='/' passHref>
        <a className='flex items-center gap-4'>
          <HomeIcon size={50} />
          <p className='font-bold text-h1'>Daivoka</p>
        </a>
      </Link>
      {profile ? (
        <div className='flex gap-4'>
          <Button variant='solid' onClick={createWordModalDisclosure.open}>
            Add a word
          </Button>
          <ProfileSection />
        </div>
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
