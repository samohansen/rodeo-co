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
        <Grid item xs={12}>
          <TextField
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
          {formik.errors.username && formik.touched.username ? (
            <Typography variant="caption" color="error">
              {formik.errors.username as string}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <HiFingerPrint />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password && formik.touched.password ? (
            <Typography variant="caption" color="error">
              {formik.errors.password as string}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <TextField
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
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <Typography variant="caption" color="error">
              {formik.errors.cpassword as string}
            </Typography>
          ) : null}
        </Grid>
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