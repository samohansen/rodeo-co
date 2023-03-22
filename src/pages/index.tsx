import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import {useSession, signOut} from 'next-auth/react';
import header from 'public/header.png';
import body from 'public/body.png';
import tradition from 'public/tradition.png';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import LeftNavLayout from '@common/layouts/LeftNavLayout';

//stylesheets for index
//import '../styles/css/custom.css';
//import '../styles/css/bootstrap.min.css';
//import '../stles/font-awesome-4.7.0/css/font-awesome.min.css';
//import '../styles/css/aos.css';   

// temporarily disabled: automatic redirect to login page if no session exists
// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       }
//     }
//   }
// }

const Home: NextPageWithLayout = () => {
  const {data: session} = useSession();



  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Container sx={{
          margin: 'auto',
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 'md',
          width: '90%',
          height: '90%',
          gap: '4',
          p: '3',
        }}>
          <a href='/rodeos'><img src={header.src} alt="header" width='100%' height='100%' /></a>
          <img src={body.src} alt="body" width='100%' height='100%' />
          <a href='/login'><img src={tradition.src} alt="tradition" width='100%' height='100%' /></a>
          
      </Container>

      <Container>
        {session ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
              <Typography variant="h5">{session.user.name}</Typography>
              <Typography variant="h5">{session.user.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                onClick={() => signOut()}
                sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white', mr: 2 }}
                >
                Sign Out
              </Button>

              <Link href={'/profile'} passHref>
                <Button sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white' }}>Profile Page</Button>
              </Link>
            </Box>
          </>
        ) : null}
      </Container>
    </Box>
  )
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout>
      {page}
    </LeftNavLayout>
  )
};

export default Home;
