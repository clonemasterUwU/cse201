import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Grid } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grid style={{ minHeight: '100vh', background: 'linear-gradient(#e66465, #9198e5)' }}>
      <Component {...pageProps} />
    </Grid>
  );
}
export default MyApp;
