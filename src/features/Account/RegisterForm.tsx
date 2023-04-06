import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { registerValidate } from './validate';
import { oauthButtonStyle, oauthButtonProps } from './loginTheme';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: '',
      userType: '',
    },
    validate: registerValidate,
    onSubmit: onSubmit
  });

  const router = useRouter();
  const callbackUrl = (router.query?.callbackUrl as string) || '/'

  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }

    const res = await axios.post(`/api/auth/signup`, values)
    const {data} = res;
    if (data.error) {
      console.log(data.error);
    } else if (data.user) {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl,
      });
    }
  }

  const onSubmitOauth = async (providerId: 'github' | 'google') => {
    signIn(providerId, {callbackUrl: callbackUrl})
  }

  return (
    <form onSubmit={formik.handleSubmit}> 
      <Grid container direction="column" spacing={2} >
        
        {/* Email field */}
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth
            error = {formik.errors.email && formik.touched.email ? true : false}
            label="Email"
            name="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <HiAtSymbol/>
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('email')}
          />
        </Grid>

        {/* Password field */}
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth
            error = {formik.errors.password && formik.touched.password ? true : false}
            label="Password"
            name="password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <HiFingerPrint />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('password')}
          />
        </Grid>

        {/* Confirm Password field */}
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth
            error = {formik.errors.cpassword && formik.touched.cpassword ? true : false}
            label="Confirm password"
            name="cpassword"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <HiFingerPrint />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('cpassword')}
          />
        </Grid>

        {/* Select user type (Participant or Organizer) */}
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth
            error = {formik.errors.userType && formik.touched.userType ? true : false}
            label="How will you use Rodeo Co?"
            name="userType"
            select
            SelectProps={{
              native: true,
            }}
            {...formik.getFieldProps('userType')}
          >
            <option value=""></option>
            <option value="participant">I want to enter rodeo events</option>
            <option value="admin">I am a rodeo producer</option>
          </TextField>
        </Grid>

        {/* Register Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth 
            sx={{ ":hover": {backgroundColor: '#9b5729'}, background: '#CF7F49', color: 'white', }}
          >
            Register
          </Button>
        </Grid>

        {/* Google Register */}
        <Grid item xs={12}>
          <Button onClick={() => onSubmitOauth('google')} sx={oauthButtonStyle} {...oauthButtonProps} >
            <Image src={'/google.svg'} alt="Google" width={20} height={20}/>
            <span style={{paddingLeft: '10px'}}>
              Register with Google
            </span>
          </Button>
        </Grid>

        {/* GitHub Register */}
        <Grid item xs={12}>
          <Button onClick={() => onSubmitOauth('github')} sx={oauthButtonStyle} {...oauthButtonProps} >
            <Image src={'/github.svg'} alt="Git" width={25} height={25} />
            <span style={{paddingLeft: '10px'}}>
              Register with Github
            </span>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Register;
