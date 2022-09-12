import { AppProps } from 'next/app';
import '../globals.css';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false, shouldRetryOnError: false }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
