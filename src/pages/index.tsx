import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import {useSession, signOut} from 'next-auth/react';
import marketing1 from 'public/marketing1.png';
import marketing2 from 'public/marketing2.png';
import marketing3 from 'public/marketing3.png';
import cubra from 'public/cubra.png';
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
        <title>Home</title>
      </Head>

      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
        <Typography variant="h3" >Rodeo Co.</Typography>
        <Typography variant="h5" >Plan, manage, and wrangle your rodeos with ease - all in one place!</Typography>
        <img src={marketing3.src} alt="marketing1" width='600' height='350' /> 
      </Container>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', mb: 5 }}>
          <img src={marketing1.src} alt="marketing1" width='600' height='350' /> 
          <img src={marketing2.src} alt="marketing2" width='150' height='250' />
      </Box>

      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
        <Typography variant="h3" >Rodeo Co is a simple solution to your Rodeo planning needs, from entries to ranking calculations.</Typography>
      </Container>

      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', mb: 5 }}>
        <Typography variant="h6" sx={{ textAlign: 'cneter', mb: 5 }}>Rodeo Co. works with local youth rodeo clubs to ensure we have the best product possible.</Typography>
        <img src={cubra.src} alt="cubra" width='200' height='150' />
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
