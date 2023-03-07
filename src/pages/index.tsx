import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import {useSession, signIn, signOut, getSession} from 'next-auth/react';


export default function Home() {

  // Signout handler
  function handleSignOut(){
    signOut();
  }

  const{data:session} = useSession();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({session, handleSignOut}) : Guest()}
    </Box>
  )
}

// Non-authenticated Guest view
function Guest(){
  return (
    <Container sx={{ flex: 1, display: 'flex' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>🏠 Home</Typography>

    </Container>
  )
}

// Authenticated User view
function User({session, handleSignOut}){
  return(
    <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>🏠 Home</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
        <Typography variant="h5">{session.user.name}</Typography>
        <Typography variant="h5">{session.user.email}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          onClick={handleSignOut}
          sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white', mr: 2 }}
          >
          Sign Out
        </Button>

        <Link href={'/profile'} passHref>
          <Button sx={{ px: 10, py: 1, borderRadius: 'sm', bgcolor: '#3F51B5', color: 'white' }}>Profile Page</Button>
        </Link>
      </Box>
    </Container>
  )
}

// redirect to login page if not authenticated:
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  // this redirects the user to login if not authenticated (temporarily disabling this)
  if (!session) {
    return {
      props: { session },
      // redirect: {
      //   destination: '/login',
      //   permanent: false,
      // }
    }
  }

  if (session) {
    return {
      props: { session }
    }
  }
}