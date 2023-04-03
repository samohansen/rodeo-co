import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { registerValidate } from './validate';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit: onSubmit
  });

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <form onSubmit={formik.handleSubmit}> 
      <Grid container direction="column" spacing={2} >

        {/* Username field */}
        <Grid item xs={12}>
          <TextField
            error = {formik.errors.username && formik.touched.username ? true : false}
            variant="outlined"
            label="Username"
            name="username"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <HiUser />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('username')}
          />
        </Grid>

        {/* Email field */}
        <Grid item xs={12}>
          <TextField
            error = {formik.errors.email && formik.touched.email ? true : false}
            variant="outlined"
            label="Email"
            name="email"
            fullWidth
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
          <TextField
            error = {formik.errors.password && formik.touched.password ? true : false}
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
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
          <TextField
            error = {formik.errors.cpassword && formik.touched.cpassword ? true : false}
            variant="outlined"
            label="Confirm password"
            name="cpassword"
            type="password"
            fullWidth
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
        
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth 
            sx={{
              ":hover": {backgroundColor: '#3C343B'},
              background: '#CF7F49',
              color: 'white',
            }}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default Register;