import { AuthApis } from '@/auth/apis';
import { LoginPayload } from '@/auth/types';
import { useAccessTokenCookieState } from '@/auth/useAccessTokenCookieState';
import { Button, Form } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { SignInIcon } from '@/common/icons';
import { useProfile } from '@/profile/useProfile';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const { mutateProfile } = useProfile();

  const methods = useForm<LoginPayload>({ defaultValues: { email: '', password: '' } });
  const [, setAccessToken] = useAccessTokenCookieState();
  const { setValue, reset } = methods;

  const loginHandler = async (data: LoginPayload) => {
    const { accessToken, ...profile } = await AuthApis.login(data);
    setAccessToken(accessToken);
    mutateProfile(profile);
    reset();
  };

  const { handle: handleLogin, isLoading: isLoggingIn } = useHandler(loginHandler, {
    onError: (e: any) => {
      if (e.statusCode === 400) {
        toast.error('Incorrect password!');
        return false;
      }

      if (e.statusCode === 404) {
        toast.error('Email not found, please register for an account!');
        return false;
      }
    },
  });

  return (
    <Form
      methods={methods}
      onSubmit={handleLogin}
      className='relative flex items-center gap-2'
      data-testid='login-form'>
      <Form.Input type='email' name='email' placeholder='Email' size='sm' />
      <Form.Input type='password' name='password' placeholder='Password' size='sm' />
      <Button loading={isLoggingIn} iconRight={<SignInIcon />} variant='solid' type='submit'>
        Login
      </Button>
    </Form>
  );
};
