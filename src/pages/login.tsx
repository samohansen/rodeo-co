import Head from 'next/head'
import Layout from '../layout/signup-layout'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, TextField, Button, Typography } from '@mui/material/';
import {HiFingerPrint, HiAtSymbol} from 'react-icons/hi';
import { InputAdornment } from '@mui/material';


// NOTE: Make the form fields wider so they fill the white space a bit more

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Explore
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form>
            <Grid container direction="column" spacing={2} >
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="email"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HiAtSymbol />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HiFingerPrint />
                      </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth>
                  Sign In with Google 
                  <Image src={'/google.svg'} alt="Google" width="20" height={20} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth>
                  Sign In with Github 
                  <Image src={'/github.svg'} alt="Git" width={25} height={25} />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom>
            Don't have an account yet?{' '}
            <Link legacyBehavior href={'/register'}>
              <a className='text-blue-700'>Sign Up</a>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}