import Image from 'next/image'
import { Grid, TextField, Button, Typography } from '@mui/material/';
import {HiFingerPrint, HiAtSymbol} from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import {useSession, signIn, signOut} from 'next-auth/react';
import {useFormik} from 'formik';
import { loginValidate } from './validate';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate : loginValidate,
    onSubmit: onSubmit
  });

  async function onSubmit(values){
    console.log(values);
  }
  
  // Google Handler Function
  async function handleGoogleSignin() {
    signIn('google',{callbackUrl: 'https://www.rodeoco.live'});
  }
  // GitHub Handler Function
  async function handleGithubSignin() {
    signIn('github',{callbackUrl: 'https://www.rodeoco.live'});
  }

  return (
    <form onSubmit={formik.handleSubmit}>
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
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email && formik.touched.email ? (
            <Typography variant="caption" color="error">
              {formik.errors.email as string}
            </Typography>
          ) : null}
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
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password && formik.touched.password ? (
            <Typography variant="caption" color="secondary">
              {formik.errors.password as string}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="inherit" fullWidth sx={{
              ":hover": {backgroundColor: '#3C343B'},
              background: '#CF7F49',
              color: 'white',
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
          onClick={handleGithubSignin}
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
  );
}

export default LoginForm;
