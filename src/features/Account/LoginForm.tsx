import Image from 'next/image'
import { Grid, TextField, Button, Typography } from '@mui/material/';
import {HiFingerPrint, HiAtSymbol} from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import { signIn } from 'next-auth/react';
import {useFormik} from 'formik';
import { loginValidate } from './validate';
import { buttonStyle } from './loginTheme';
import { getSession } from 'next-auth/react';


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
    console.log(`onSubmit function called. values: \n ${values.email} \n ${values.password}`);

    const status = await signIn('credentials', {
      // redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: 'http://localhost:3000/',
    });

    console.log(`NextAuth signIn function finished. Status:`);
    console.log(status);
  }
  // "email": "samuelhansen16@gmail.com",
  // "password": "admin123"
  
  // Google Handler Function
  async function handleGoogleSignin() {
    signIn('google',{callbackUrl: 'https://www.rodeoco.live/'});
  }
  // GitHub Handler Function
  async function handleGithubSignin() {
    signIn('github',{callbackUrl: 'https://www.rodeoco.live/'});
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={2} sx={{fontFamily:'Poppins, sans-serif'}} >
        
        {/* Email field */}
        <Grid item xs={12}>
          <TextField
            error= {formik.errors.email && formik.touched.email ? true : false}
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
        </Grid>

        {/* Password field */}
        <Grid item xs={12}>
          <TextField
            error= {formik.errors.password && formik.touched.password ? true : false}
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
        </Grid>

        {/* Login Button */}
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="inherit" fullWidth 
            sx={{
              ":hover": {backgroundColor: '#9b5729'},
              background: '#CF7F49',
              color: 'white',
              }}>
            Login
          </Button>
        </Grid>
        
        {/* Google Sign In Button */}
        <Grid item xs={12}>
          <Button 
            onClick={handleGoogleSignin}
            size = "large"
            variant="outlined" 
            fullWidth
            sx= { buttonStyle }
            >
              <Image src={'/google.svg'} alt="Google" width={20} height={20} />
              &nbsp;
              Sign In with Google 
              &nbsp;
          </Button>
        </Grid>

        {/* GitHub Sign In Button */}
        <Grid item xs={12}>
        <Button 
          onClick={handleGithubSignin}
          size = "large"
          variant="outlined" 
          fullWidth
          sx={ buttonStyle }
          >
            <Image src={'/github.svg'} alt="Git" width={25} height={25} />
            &nbsp;
            Sign In with Github 
            &nbsp;
          </Button>
        </Grid>

      </Grid>
    </form>
  );
}

export default LoginForm;
