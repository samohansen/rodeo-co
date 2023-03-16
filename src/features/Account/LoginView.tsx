import type { ReactElement } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { Grid, Typography } from '@mui/material/';
import {useRouter} from 'next/router';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LoginLayout from './LoginLayout';
import PageLayout from '@common/layouts/PageLayout';

const LoginView = () => {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login"; // else, is Register page

  return (
    <>
      <Head>
        <title>
          {isLoginPage ? 'Log in' : 'RodeoCo - Register'}
        </title>
      </Head>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{
              color: 'text.primary',
              fontSize: 'xl',
              fontWeight: 'bold',
              paddingTop: '4',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Welcome to RodeoCo
          </Typography>
          <Typography variant="body1" align="center" gutterBottom sx={{
              width: '75%',
              margin: 'auto',
              color: 'text.secondary',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {isLoginPage ? 'Log in' : 'Register'} to browse or create rodeos and events.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {isLoginPage ? <LoginForm/> : <RegisterForm/>}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom sx={{color: 'text.secondary'}}>
            {isLoginPage ? <>
              Don't have an account yet?{' '}
              <Link legacyBehavior href={'/register'}>
                <a className='text-blue-700'>Sign up</a>
              </Link>
            </> : <>
              Already have an account?{' '}
              <Link legacyBehavior href={'/login'}>
                <a className='text-blue-700'>Log in</a>
              </Link>
            </>}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

LoginView.getLayout = function getLayout(page: ReactElement) {
  return (
    <PageLayout>
      <LoginLayout>
        {page}
      </LoginLayout>
    </PageLayout>
  )
};

export default LoginView;
