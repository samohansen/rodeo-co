import styles from './LoginLayout.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const LoginLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '90vh', backgroundColor: '#CCCCC1'}}>
      <Box className={styles.innerBox}>
        <Box className={styles.imgStyle}>
          <div className={styles.img}></div>
        </Box>
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', py: '10'}}>
            <Typography fontFamily={'Poppins, sans-serif'} variant="h6">{children}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginLayout;
