import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import {useSession, signOut} from 'next-auth/react';
import logo from 'public/marketing.png';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import LeftNavLayout from '@common/layouts/LeftNavLayout'

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
      <Head>
        <title>Home Page</title>
      </Head>
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
        <Typography variant="h5" sx={{ textAlign: 'left', mb: 5 }}>Host rodeos easily with RodeoCo</Typography>
        <img src={logo.src} alt="logo" width='600' height='350' />
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
