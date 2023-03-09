import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import logo from '@../../public/Marketing.png';


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
    <Container >
      <Typography variant="h5" sx={{ textAlign: 'left', mb: 5 }}>Host and Manage Your Rodeo Events Easily with Rodeo Co.</Typography>
      <img src={logo.src} alt="logo" width='600' height='350' />
    </Container>
  )
}

// Authenticated User view
function User({session, handleSignOut}){
  return(
    <Container>


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

      <Typography variant="h5" sx={{ textAlign: 'left', mb: 5 }}>Host and Manage Your Rodeo Events Easily with Rodeo Co.</Typography>
      <img src={logo.src} alt="logo" width='600' height='350' />
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