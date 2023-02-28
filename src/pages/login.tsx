import Head from 'next/head'
import Layout from '../layout/signup-layout'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, TextField, Button, Typography } from '@mui/material/';
import {HiFingerPrint, HiAtSymbol} from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import {useSession, signIn, signOut} from 'next-auth/react';


// Google Handler Function
async function handleGoogleSignin() {
  signIn('google',{callbackUrl: 'http://localhost:3000'});
}

// NOTE: Make the form fields wider so they fill the white space a bit more

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container direction="column" alignItems="center" spacing={3} sx={{fontFamily:'Poppins, sans-serif'}}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{
                color: 'text.primary',
                fontSize: 'xl',
                fontWeight: 'bold',
                paddingTop: '4',
                fontFamily: 'Poppins, sans-serif',
                }}>
            Login
          </Typography>
          <Typography variant="body1" align="center" gutterBottom sx={{
            width: '75%',
            margin: 'auto',
            color: 'text.secondary',
            fontFamily: 'Poppins, sans-serif',
            }}>
            Welcome to Rodeo Co. Please login to your account.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{fontFamily:'Poppins, sans-serif'}}>
          <form>
            <Grid container direction="column" spacing={2} sx={{fontFamily:'Poppins, sans-serif'}} >
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="email"
                  fullWidth
                  sx={{fontFamily:'Poppins, sans-serif'}}
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
                  sx={{fontFamily:'Poppins, sans-serif'}}
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
                <Button variant="contained" color="primary" fullWidth sx={{
                    background: 'linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)',
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    // textTransform: 'none' // Set text transform to none so that the text is not capitalized
                    }}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
              <Button 
                onClick={handleGoogleSignin}
                variant="outlined" 
                fullWidth
                sx={{
                    width: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    paddingY: '3',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2',
                    color: 'text.primary',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none', // Set text transform to none so that the text is not capitalized
                    '&:hover': {
                    backgroundColor: 'background.paper'
                    }
                }}
                >
                  Sign In with Google &nbsp;
                  <Image src={'/google.svg'} alt="Google" width={20} height={20} />
                </Button>
                

              </Grid>
              <Grid item xs={12}>
              <Button 
                variant="outlined" 
                fullWidth
                sx={{
                    width: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    paddingY: '3',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2',
                    color: 'text.primary',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none', // Set text transform to none so that the text is not capitalized
                    '&:hover': {
                    backgroundColor: 'background.paper'
                    }
                }}
                >
                  Sign In with Github &nbsp;
                  <Image src={'/github.svg'} alt="Git" width={25} height={25} />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom sx={{color: 'text.secondary'}}>
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