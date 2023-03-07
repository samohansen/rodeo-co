import styles from '../styles/Layout.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#5da5fb'}}>
      <Box
        sx={{
          margin: 'auto',
          backgroundColor: '#F9FAFB',
          borderRadius: 'md',
          width: '60%',
          height: '75%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4',
          p: '3',
        }}
      >
        <Box className={styles.imgStyle}>
            <div className={styles.cartoonImg}></div>
            <div className={styles.cloud_one}></div>
            <div className={styles.cloud_two}></div>
        </Box>
        <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/*justifyContent: 'space-between' */}
          <Box sx={{ textAlign: 'center', py: '10'}}>
            <Typography fontFamily={'Poppins, sans-serif'} variant="h6">{children}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Layout;