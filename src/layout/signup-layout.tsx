import styles from '../styles/Layout.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#5da5fb' }}>
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
          <Box sx={{ textAlign: 'center', py: '10' }}>
            <Typography variant="h6">{children}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Layout;


// Tailwind CSS version:
// const Layout = ({ children }) => {
//     return (
//         <div className="flex h-screen bg-blue-400">
//             <div className='m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2'>
//                 <div>
//                     Images
//                 </div>
//                 <div className="right flex flex-col justify-evenly bg-gray-500">
//                     <div className="text-center py-10">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Layout;