import Image from 'next/image'
import { Grid, Button } from '@mui/material/';
import {useSession, signIn, signOut} from 'next-auth/react';
import {useFormik} from 'formik';
import { loginValidate } from './validate';
import { buttonStyle } from './loginTheme';

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
  
  // Handler Functions (Google, GitHub, etc.)
  async function handleGoogleSignin() { signIn('google', {callbackUrl: 'https://www.rodeoco.live'}); }
  async function handleGithubSignin() { signIn('github', {callbackUrl: 'https://www.rodeoco.live'}); }
  async function handleAppleSignin() { signIn('apple', {callbackUrl: 'https://www.rodeoco.live'}); }
  async function handleFacebookSignin() { signIn('facebook', {callbackUrl: 'https://www.rodeoco.live'}); }
  async function handleAuth0Signin() { signIn('auth0', {callbackUrl: 'https://www.rodeoco.live'}); }


  return (
      <Grid container direction="column" spacing={2} sx={{fontFamily:'Poppins, sans-serif'}} >
       
       {/* Google Sign In Button */}
        <Grid item xs={12}>
          <Button 
            size = "large"
            onClick={handleGoogleSignin}
            variant="outlined" 
            fullWidth
            sx={ buttonStyle }
              >
              <Image src={'/google.svg'} alt="Google" width={20} height={20} />
              &nbsp;
              Sign In with Google 
          </Button>
        </Grid>

        {/* Apple Sign In Button */}
        <Grid item xs={12}>
          <Button 
            size = "large"
            onClick={handleAppleSignin}
            variant="outlined" 
            fullWidth
            sx={ buttonStyle }
              >
              <Image src={'/apple.svg'} alt="Apple" width={22} height={22} />
              &nbsp;
              Sign In with Apple   
              &nbsp;
          </Button>
        </Grid>

        {/* Facebook Sign In Button */}
        <Grid item xs={12}>
          <Button 
            size = "large"
            onClick={handleFacebookSignin}
            variant="outlined" 
            fullWidth
            sx={ buttonStyle }
              >
              <Image src={'/facebook.svg'} alt="Facebook" width={20} height={20} />
              &nbsp;
              Sign In with Facebook   
              &nbsp;
          </Button>
        </Grid>

        {/* GitHub Sign In Button */}
        <Grid item xs={12}>
          <Button 
            size = "large"
            onClick={handleGithubSignin}
            variant="outlined" 
            fullWidth
            sx={ buttonStyle }
            >
            <Image src={'/github.svg'} alt="Git" width={25} height={25} />
            &nbsp;
            Sign In with Github 
          </Button>
        </Grid>

        {/* Auth0 Sign In Button */}
        <Grid item xs={12}>
          <Button 
            size = "large"
            onClick={handleAuth0Signin}
            variant="outlined" 
            fullWidth
            sx={ buttonStyle }
              >
              <Image src={'/auth0.svg'} alt="Auth0" width={22} height={22} />
              &nbsp;
              Sign In with Auth0   
              &nbsp;
          </Button>
        </Grid>

      </Grid>

      
  );
}

export default LoginForm;
