import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import '../globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false, shouldRetryOnError: false }}>
      <ToastContainer position='top-center' hideProgressBar autoClose={3000} />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
