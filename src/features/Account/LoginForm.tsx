import * as React from 'react';
import Image from 'next/image'
import { Grid, TextField, Button, Typography, Divider, IconButton } from '@mui/material/';
import {HiFingerPrint, HiAtSymbol} from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import { signIn } from 'next-auth/react';
import {useFormik} from 'formik';
import { loginValidate } from './validate';
import { useRouter } from 'next/router';
import { oauthButtonStyle, oauthButtonProps } from './loginTheme';
import { VisibilityOff, Visibility } from '@mui/icons-material';


const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate : loginValidate,
    onSubmit: onSubmitCredentials,
  });

  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl as string) || '/';
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function onSubmitCredentials(values){
    const status = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl,
    });
  }

  const onSubmitOauth = async (providerId: 'github' | 'google') => {
    signIn(providerId, {callbackUrl: callbackUrl})
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={2} sx={{fontFamily:'Poppins, sans-serif'}} >
        <Grid item xs={12}>
          <TextField variant="outlined" sx={{fontFamily:'Poppins, sans-serif'}} fullWidth
            error= {formik.errors.email && formik.touched.email ? true : false}
            label="Email"
            name="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HiAtSymbol />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('email')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField variant="outlined" sx={{fontFamily:'Poppins, sans-serif'}} fullWidth
            error= {formik.errors.password && formik.touched.password ? true : false}
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('password')}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="inherit" fullWidth sx={{ ":hover": {backgroundColor: '#9b5729'}, background: '#CF7F49', color: 'white' }}>
            Log in
          </Button>
        </Grid>
        {/* todo: add divider here */}
        <Grid item xs={12}>
          <Button onClick={() => onSubmitOauth('google')} sx={oauthButtonStyle} {...oauthButtonProps} >
            <Image src={'/google.svg'} alt="Google" width={20} height={20}/>
            <span style={{paddingLeft: '10px'}}>
              Sign in with Google
            </span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => onSubmitOauth('github')} sx={oauthButtonStyle} {...oauthButtonProps} >
            <Image src={'/github.svg'} alt="Git" width={25} height={25} />
            <span style={{paddingLeft: '10px'}}>
              Sign in with Github
            </span>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
