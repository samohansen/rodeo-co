import Head from 'next/head';
import Layout from '../layout/signup-layout';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi';
import { InputAdornment } from '@mui/material';
import Link from 'next/link';

const Register = () => {
    return (
        <Layout>
            <Head>
                <title className="test-class">Register</title> {/* test class should make test red */}
            </Head>
            <Grid container direction="column" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom sx={{
                            color: 'text.primary',
                            fontSize: 'xl',
                            fontWeight: 'bold',
                            paddingTop: '4',
                            }}>
                        Register
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom sx={{
                        width: '75%',
                        margin: 'auto',
                        color: 'text.secondary',
                        }}>
                        Welcome to Rodeo Co. Please register here.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                <form> 
                <Grid container direction="column" spacing={2} >
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Username"
                            name="username"
                            fullWidth
                            InputProps={{
                                endAdornment:(
                                <InputAdornment position="start">
                                    <HiUser />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        fullWidth
                        InputProps={{
                            endAdornment:(
                            <InputAdornment position="start">
                                <HiFingerPrint/>
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
                            endAdornment:(
                            <InputAdornment position="start">
                                <HiFingerPrint />
                            </InputAdornment>
                            ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        label="Confirm password"
                        name="cpassword"
                        type="cpassword"
                        fullWidth
                        InputProps={{
                            endAdornment: (
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
                            // textTransform: 'none' // Set text transform to none so that the text is not capitalized
                            }}>
                        Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    </Grid>
                </form>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" align="center" gutterBottom sx={{color: 'text.secondary'}}>
                    Already have an account?{' '}
                    <Link legacyBehavior href={'/login'}>
                    <a className='text-blue-700'>Login</a>
                    </Link>
                </Typography>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Register;